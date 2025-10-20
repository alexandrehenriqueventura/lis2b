/* ========================================
   Service Worker para ODS 1 - Erradicação da Pobreza
   PWA com funcionalidades offline
   ======================================== */

const CACHE_NAME = 'ods1-v1.0.0';
const STATIC_CACHE = 'ods1-static-v1.0.0';
const DYNAMIC_CACHE = 'ods1-dynamic-v1.0.0';

// Arquivos para cache estático (sempre disponíveis offline)
const STATIC_FILES = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/script.js',
    '/manifest.json',
    // CDN essenciais
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// URLs para cache dinâmico (cachear quando acessadas)
const DYNAMIC_URLS = [
    'https://brasil.un.org/pt-br/sdgs/1',
    'https://www.ipea.gov.br/ods/ods1.html',
    'https://www.scielo.br/j/rep/a/xqBvfZ5JqBZHvYqnFMNCcWv/',
    'https://brasilescola.uol.com.br/sociologia/desigualdade-social-no-brasil.htm'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalando...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Cache estático criado');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Arquivos estáticos em cache');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Erro no cache estático:', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Ativando...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Remove caches antigos
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Removendo cache antigo:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Ativado e controlando todas as abas');
                return self.clients.claim();
            })
    );
});

// Interceptação de requisições (estratégia de cache)
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Ignorar requisições que não são GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Ignorar requisições de analytics e outras APIs externas
    if (url.hostname.includes('google-analytics.com') || 
        url.hostname.includes('googletagmanager.com') ||
        url.pathname.includes('/api/')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Se encontrou no cache, retorna
                if (cachedResponse) {
                    // Para recursos estáticos, sempre retorna do cache
                    if (isStaticResource(request.url)) {
                        return cachedResponse;
                    }
                    
                    // Para outros recursos, tenta atualizar em background
                    updateCache(request);
                    return cachedResponse;
                }
                
                // Se não encontrou no cache, busca na rede
                return fetch(request)
                    .then((networkResponse) => {
                        // Se é um recurso cachável, adiciona ao cache
                        if (isCacheable(request)) {
                            const responseClone = networkResponse.clone();
                            addToCache(request, responseClone);
                        }
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.log('Service Worker: Falha na rede para:', request.url);
                        
                        // Se é uma navegação e falhou, retorna a página offline
                        if (request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                        
                        // Para outros recursos, retorna erro
                        throw error;
                    });
            })
    );
});

// Atualização em background
function updateCache(request) {
    fetch(request)
        .then((response) => {
            if (response.ok) {
                const responseClone = response.clone();
                addToCache(request, responseClone);
            }
        })
        .catch(() => {
            // Silenciosamente falha se não conseguir atualizar
        });
}

// Adiciona ao cache dinâmico
function addToCache(request, response) {
    const cacheName = isStaticResource(request.url) ? STATIC_CACHE : DYNAMIC_CACHE;
    
    caches.open(cacheName)
        .then((cache) => {
            cache.put(request, response);
        })
        .catch((error) => {
            console.error('Service Worker: Erro ao adicionar ao cache:', error);
        });
}

// Verifica se é um recurso estático
function isStaticResource(url) {
    return STATIC_FILES.some(staticUrl => {
        const fullUrl = new URL(staticUrl, self.location.origin).href;
        return url === fullUrl || url.endsWith(staticUrl);
    }) || url.includes('/css/') || url.includes('/js/');
}

// Verifica se a requisição é cachável
function isCacheable(request) {
    const url = new URL(request.url);
    
    // Cache recursos do próprio domínio
    if (url.origin === self.location.origin) {
        return true;
    }
    
    // Cache CDNs conhecidos
    if (url.hostname.includes('cdnjs.cloudflare.com') ||
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com')) {
        return true;
    }
    
    // Cache URLs dinâmicas importantes
    return DYNAMIC_URLS.some(dynamicUrl => 
        request.url.startsWith(dynamicUrl)
    );
}

// Limpeza periódica do cache
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CLEAN_CACHE') {
        cleanOldCache();
    }
    
    if (event.data && event.data.type === 'GET_CACHE_SIZE') {
        getCacheSize().then(size => {
            event.ports[0].postMessage({ cacheSize: size });
        });
    }
});

// Limpa cache antigo (mantém apenas os mais recentes)
function cleanOldCache() {
    caches.open(DYNAMIC_CACHE)
        .then((cache) => {
            return cache.keys();
        })
        .then((keys) => {
            // Se tem mais de 50 itens, remove os mais antigos
            if (keys.length > 50) {
                const keysToDelete = keys.slice(0, keys.length - 30);
                return Promise.all(
                    keysToDelete.map(key => 
                        caches.open(DYNAMIC_CACHE).then(cache => cache.delete(key))
                    )
                );
            }
        })
        .then(() => {
            console.log('Service Worker: Cache limpo');
        });
}

// Obtém tamanho do cache
function getCacheSize() {
    return caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.open(cacheName)
                        .then((cache) => cache.keys())
                        .then((keys) => keys.length);
                })
            );
        })
        .then((sizes) => {
            return sizes.reduce((total, size) => total + size, 0);
        });
}

// Sincronização em background (para futuras funcionalidades)
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Aqui poderia sincronizar dados quando voltar online
            console.log('Service Worker: Sincronização em background')
        );
    }
});

// Notificações push (para futuras funcionalidades)
self.addEventListener('push', (event) => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Explorar',
                    icon: '/icons/checkmark.png'
                },
                {
                    action: 'close',
                    title: 'Fechar',
                    icon: '/icons/xmark.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification('ODS 1 - Erradicação da Pobreza', options)
        );
    }
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Log de informações do Service Worker
console.log('Service Worker: Carregado - ODS 1 Erradicação da Pobreza v1.0.0');