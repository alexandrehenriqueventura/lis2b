/* ========================================
   ODS 1 - Erradicação da Pobreza
   JavaScript Melhorado com Todas as Funcionalidades
   ======================================== */

'use strict';

class ODSApp {
    constructor() {
        this.init();
    }

    init() {
        // Aguardar DOM carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initApp());
        } else {
            this.initApp();
        }
    }

    initApp() {
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initThemeToggle();
        this.initBackToTop();
        this.initReadingProgress();
        this.initSearch();
        this.initTooltips();
        this.initAccessibility();
        this.initLazyLoading();
        this.initAnalytics();
        this.initPerformanceOptimizations();
    }

    // Menu Mobile Melhorado
    initMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links a');

        if (!mobileMenu || !navLinks) return;

        // Toggle menu
        mobileMenu.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            
            // Atualizar aria-expanded
            mobileMenu.setAttribute('aria-expanded', !isActive);
            
            // Mudar ícone
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.className = !isActive ? 'fas fa-times' : 'fas fa-bars';
            }
            
            // Bloquear scroll do body quando menu estiver aberto
            document.body.style.overflow = !isActive ? 'hidden' : '';
        });

        // Fechar menu ao clicar em link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                
                const icon = mobileMenu.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });

        // Fechar menu com Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                mobileMenu.focus();
            }
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Rolagem Suave Melhorada
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('nav')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks?.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Focar no elemento de destino para acessibilidade
                    setTimeout(() => {
                        targetElement.focus();
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            });
        });
    }

    // Toggle de Tema Escuro/Claro
    initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Verificar preferência salva ou do sistema
        const savedTheme = localStorage.getItem('theme');
        const currentTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
        
        this.setTheme(currentTheme);
        this.updateThemeToggle(currentTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                this.setTheme(newTheme);
                this.updateThemeToggle(newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Feedback de acessibilidade
                this.announce(`Tema alterado para ${newTheme === 'dark' ? 'escuro' : 'claro'}`);
            });
        }

        // Escutar mudanças na preferência do sistema
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                this.setTheme(newTheme);
                this.updateThemeToggle(newTheme);
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    updateThemeToggle(theme) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark' 
                ? '<i class="fas fa-sun"></i> Claro' 
                : '<i class="fas fa-moon"></i> Escuro';
            themeToggle.setAttribute('aria-label', 
                theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
        }
    }

    // Botão Voltar ao Topo
    initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const coords = document.documentElement.clientHeight;
            
            if (scrolled > coords) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Focar no início da página
            setTimeout(() => {
                const skipLink = document.querySelector('.skip-link') || 
                              document.querySelector('header');
                if (skipLink) skipLink.focus();
            }, 500);
        });
    }

    // Barra de Progresso de Leitura
    initReadingProgress() {
        const progressBar = document.querySelector('.reading-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxHeight) * 100;
            
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        });
    }

    // Busca Interna
    initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (!searchInput || !searchResults) return;

        let searchTimeout;
        
        // Índice de conteúdo para busca
        this.searchIndex = this.buildSearchIndex();

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            searchTimeout = setTimeout(() => {
                if (query.length >= 2) {
                    this.performSearch(query);
                } else {
                    this.hideSearchResults();
                }
            }, 300);
        });

        // Navegação por teclado nos resultados
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const firstResult = searchResults.querySelector('.search-result-item');
                if (firstResult) firstResult.focus();
            }
        });

        // Fechar resultados ao clicar fora
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                this.hideSearchResults();
            }
        });
    }

    buildSearchIndex() {
        const sections = document.querySelectorAll('section[id]');
        const index = [];

        sections.forEach(section => {
            const title = section.querySelector('h2, h3, h4')?.textContent || '';
            const content = section.textContent.toLowerCase();
            const id = section.id;
            
            index.push({
                id,
                title: title.trim(),
                content,
                element: section
            });
        });

        return index;
    }

    performSearch(query) {
        const results = this.searchIndex.filter(item => 
            item.content.includes(query.toLowerCase()) ||
            item.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);

        this.displaySearchResults(results, query);
    }

    displaySearchResults(results, query) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">Nenhum resultado encontrado</div>';
        } else {
            const resultsHTML = results.map(result => `
                <div class="search-result-item" tabindex="0" data-target="#${result.id}">
                    <strong>${this.highlightText(result.title, query)}</strong>
                    <div class="search-snippet">${this.getSnippet(result.content, query)}</div>
                </div>
            `).join('');
            
            searchResults.innerHTML = resultsHTML;
            
            // Adicionar eventos de clique e teclado
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => this.goToSearchResult(item));
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') this.goToSearchResult(item);
                });
            });
        }

        searchResults.style.display = 'block';
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    getSnippet(content, query) {
        const index = content.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) return content.substring(0, 100) + '...';
        
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + query.length + 50);
        
        return (start > 0 ? '...' : '') + 
               this.highlightText(content.substring(start, end), query) + 
               (end < content.length ? '...' : '');
    }

    goToSearchResult(item) {
        const target = item.getAttribute('data-target');
        const element = document.querySelector(target);
        
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            this.hideSearchResults();
            
            // Destacar temporariamente o resultado
            element.style.backgroundColor = 'var(--light)';
            setTimeout(() => {
                element.style.backgroundColor = '';
            }, 2000);
        }
    }

    hideSearchResults() {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }

    // Tooltips Melhorados
    initTooltips() {
        document.querySelectorAll('.tooltip').forEach(tooltip => {
            tooltip.addEventListener('mouseenter', () => {
                this.showTooltip(tooltip);
            });
            
            tooltip.addEventListener('mouseleave', () => {
                this.hideTooltip(tooltip);
            });
            
            tooltip.addEventListener('focus', () => {
                this.showTooltip(tooltip);
            });
            
            tooltip.addEventListener('blur', () => {
                this.hideTooltip(tooltip);
            });
        });
    }

    showTooltip(element) {
        // Implementação já está no CSS com ::after
        element.setAttribute('aria-describedby', 'tooltip-' + element.dataset.tooltip);
    }

    hideTooltip(element) {
        element.removeAttribute('aria-describedby');
    }

    // Melhorias de Acessibilidade
    initAccessibility() {
        // Skip links
        this.initSkipLinks();
        
        // Armadilha de foco para modal
        this.initFocusTrapping();
        
        // Anúncios para leitores de tela
        this.createAriaLive();
        
        // Navegação por teclado melhorada
        this.initKeyboardNavigation();
        
        // Detecção de preferências de acessibilidade
        this.detectAccessibilityPreferences();
    }

    initSkipLinks() {
        const skipLinks = document.querySelectorAll('.skip-link');
        skipLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        });
    }

    initFocusTrapping() {
        // Para futuro uso com modais
        this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    }

    createAriaLive() {
        // Criar região para anúncios
        const ariaLive = document.createElement('div');
        ariaLive.setAttribute('aria-live', 'polite');
        ariaLive.setAttribute('aria-atomic', 'true');
        ariaLive.className = 'sr-only';
        ariaLive.id = 'aria-live-region';
        document.body.appendChild(ariaLive);
    }

    announce(message) {
        const ariaLive = document.getElementById('aria-live-region');
        if (ariaLive) {
            ariaLive.textContent = message;
            setTimeout(() => {
                ariaLive.textContent = '';
            }, 1000);
        }
    }

    initKeyboardNavigation() {
        // Navegação por Tab melhorada
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    detectAccessibilityPreferences() {
        // Detectar preferências de movimento reduzido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        }

        // Detectar preferência de alto contraste
        const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
        if (prefersHighContrast.matches) {
            document.body.classList.add('high-contrast');
        }
    }

    // Lazy Loading
    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });

            // Lazy loading para seções
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        sectionObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('section').forEach(section => {
                sectionObserver.observe(section);
            });
        }
    }

    // Analytics e Monitoramento
    initAnalytics() {
        // Tracking de engagement
        this.trackReadingTime();
        this.trackScrollDepth();
        this.trackInteractions();
    }

    trackReadingTime() {
        const startTime = Date.now();
        let active = true;
        
        // Detectar quando usuário sai da aba
        document.addEventListener('visibilitychange', () => {
            active = !document.hidden;
        });

        // Salvar tempo de leitura periodicamente
        setInterval(() => {
            if (active) {
                const readingTime = Math.floor((Date.now() - startTime) / 1000);
                localStorage.setItem('readingTime', readingTime);
            }
        }, 5000);
    }

    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrolled / maxHeight) * 100;
            
            if (scrollPercent > maxScroll) {
                maxScroll = Math.floor(scrollPercent);
                
                // Marcos de profundidade
                if ([25, 50, 75, 90].includes(maxScroll)) {
                    this.logEvent('scroll_depth', { depth: maxScroll });
                }
            }
        });
    }

    trackInteractions() {
        // Tracking de cliques em links externos
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('click', () => {
                this.logEvent('external_link_click', { url: link.href });
            });
        });

        // Tracking de uso da busca
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(() => {
                if (searchInput.value.length >= 2) {
                    this.logEvent('search_used', { query: searchInput.value });
                }
            }, 1000));
        }
    }

    logEvent(eventName, data = {}) {
        // Log local (pode ser integrado com Google Analytics, etc.)
        console.log('Event:', eventName, data);
        
        // Salvar no localStorage para análise local
        const events = JSON.parse(localStorage.getItem('ods-analytics') || '[]');
        events.push({
            event: eventName,
            data,
            timestamp: new Date().toISOString()
        });
        
        // Manter apenas os últimos 100 eventos
        if (events.length > 100) {
            events.splice(0, events.length - 100);
        }
        
        localStorage.setItem('ods-analytics', JSON.stringify(events));
    }

    // Otimizações de Performance
    initPerformanceOptimizations() {
        // Debounce para eventos de scroll
        let scrollTimeout;
        const originalScrollHandlers = [];
        
        window.addEventListener('scroll', this.debounce(() => {
            // Executar handlers de scroll com throttling
        }, 16)); // ~60fps

        // Prefetch de links importantes
        this.prefetchLinks();
        
        // Service Worker para cache (se disponível)
        this.registerServiceWorker();
    }

    prefetchLinks() {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                document.querySelectorAll('a[href^="http"]').forEach(link => {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = link.href;
                    document.head.appendChild(prefetchLink);
                });
            });
        }
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Utilitários
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Inicializar a aplicação
const odsApp = new ODSApp();

// Exportar para uso global se necessário
window.ODSApp = ODSApp;

// Adicionar estilos para elementos criados dinamicamente
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary) !important;
        outline-offset: 2px;
    }
    
    .search-no-results {
        padding: var(--spacing-sm);
        color: var(--text-light);
        font-style: italic;
    }
    
    .search-snippet {
        font-size: 0.9rem;
        color: var(--text-light);
        margin-top: 4px;
    }
    
    .search-snippet mark {
        background: var(--primary);
        color: var(--white);
        padding: 1px 3px;
        border-radius: 2px;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
`;
document.head.appendChild(dynamicStyles);

// PWA - Manifest link (se existir)
if (document.querySelector('link[rel="manifest"]') === null) {
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);
}

// Meta tags para PWA
if (!document.querySelector('meta[name="theme-color"]')) {
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#e5243b';
    document.head.appendChild(themeColor);
}

// Console easter egg
console.log('%cODS 1 - Erradicação da Pobreza 🎯', 'color: #e5243b; font-size: 20px; font-weight: bold;');
console.log('Desenvolvido com ❤️ para educação sobre os Objetivos de Desenvolvimento Sustentável');
console.log('GitHub: https://github.com/alexandrehenriqueventura/lis2b');