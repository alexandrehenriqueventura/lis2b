# ODS 1 - Erradicação da Pobreza 🎯

![ODS 1](https://img.shields.io/badge/ODS-1%20Erradicação%20da%20Pobreza-red?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

## 📚 Sobre o Projeto

Material didático interativo e completo sobre o **ODS 1 - Erradicação da Pobreza**, desenvolvido para estudantes do 2º ano do Ensino Médio da **Escola Estadual Joaquim Diégues** como parte das atividades do **Laboratório de Iniciativas Sociais**.

Este projeto foi desenvolvido com foco na **acessibilidade**, **responsividade** e **experiência do usuário**, oferecendo uma abordagem moderna e interativa para o aprendizado sobre os Objetivos de Desenvolvimento Sustentável.

## ✨ Funcionalidades

### 🎨 Interface e Design
- **Design Responsivo**: Adapta-se perfeitamente a smartphones, tablets e desktops
- **Tema Escuro/Claro**: Toggle between light and dark modes
- **Animações Suaves**: Transições e efeitos visuais aprimorados
- **Tipografia Otimizada**: Fontes legíveis e hierarquia visual clara

### 🔍 Busca e Navegação
- **Busca Interna**: Sistema de busca avançado com destaque de resultados
- **Navegação Rápida**: Menu sticky com links para todas as seções
- **Breadcrumbs**: Navegação contextual para melhor orientação
- **Smooth Scrolling**: Rolagem suave entre seções

### ♿ Acessibilidade
- **WCAG 2.1 AA Compliant**: Segue as melhores práticas de acessibilidade
- **Skip Links**: Links para pular para conteúdo principal
- **ARIA Labels**: Rótulos apropriados para leitores de tela
- **Navegação por Teclado**: Suporte completo para navegação via teclado
- **Alto Contraste**: Suporte para preferências de alto contraste

### 📱 Progressive Web App (PWA)
- **Funciona Offline**: Cache inteligente para acesso sem internet
- **Instalável**: Pode ser instalado como app nativo
- **Rápido**: Carregamento otimizado e cache estratégico
- **Service Worker**: Atualizações em background

### 📊 Analytics e Performance
- **Reading Progress**: Barra de progresso de leitura
- **Engagement Tracking**: Monitoramento de interações
- **Performance Optimized**: Carregamento rápido e eficiente
- **Lazy Loading**: Carregamento sob demanda de conteúdo

## 🗺️ Conteúdo

### Principais Seções

1. **🎯 O que é ODS 1?**
   - Introdução aos Objetivos de Desenvolvimento Sustentável
   - Importância da erradicação da pobreza
   - Definições e conceitos básicos

2. **📚 Conceitos Fundamentais**
   - Pobreza Multidimensional
   - Desigualdade Social
   - Exclusão Socioeconômica

3. **🎤 Metas para 2030**
   - 7 metas específicas do ODS 1
   - Indicadores e marcos
   - Cronograma de implementação

4. **🇧🇷 Pobreza no Brasil**
   - Dados atualizados sobre pobreza nacional
   - Políticas públicas de combate à pobreza
   - Desafios persistentes

5. **💡 Soluções e Caminhos**
   - Estratégias multidimensionais
   - Papel da sociedade civil
   - Ações concretas

6. **🗌 Recursos Complementares**
   - Links para conteúdo adicional
   - Vídeos educativos
   - Artigos acadêmicos

7. **📝 Glossário**
   - Definições de termos técnicos
   - Conceitos-chave explicados

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos avançados com variáveis CSS e Grid Layout
- **JavaScript ES6+**: Funcionalidades interativas modernas
- **Font Awesome 6**: Ícones vetoriais

### Performance e PWA
- **Service Worker**: Cache offline e sincronização
- **Web App Manifest**: Metadados para PWA
- **Lazy Loading**: Otimização de carregamento
- **Critical CSS**: CSS crítico inline

### SEO e Acessibilidade
- **Open Graph**: Metadados para redes sociais
- **Schema.org**: Dados estruturados
- **ARIA**: Acessibilidade para leitores de tela
- **Semantic HTML**: Estrutura semântica apropriada

## 💻 Estrutura do Projeto

```
lis2b/
│
├── index.html          # Página principal
├── manifest.json       # Manifesto PWA
├── sw.js               # Service Worker
├── README.md           # Documentação
│
├── css/
│   └── style.css       # Estilos principais
│
├── js/
│   └── script.js       # JavaScript principal
│
├── icons/              # Ícones PWA (planejado)
│
├── screenshots/        # Screenshots PWA (planejado)
│
└── assets/             # Recursos adicionais (planejado)
```

## 🚀 Como Usar

### Acesso Online
O projeto está disponível em: [https://alexandrehenriqueventura.github.io/lis2b/](https://alexandrehenriqueventura.github.io/lis2b/)

### Instalação Local

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/alexandrehenriqueventura/lis2b.git
   ```

2. **Navegue para o diretório**:
   ```bash
   cd lis2b
   ```

3. **Sirva os arquivos**:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js (serve)
   npx serve .
   
   # Com PHP
   php -S localhost:8000
   ```

4. **Acesse no navegador**:
   ```
   http://localhost:8000
   ```

### Instalação como PWA

1. Acesse o site no navegador
2. Procure pelo ícone de "Instalar" na barra de endereço
3. Clique em "Instalar" quando o prompt aparecer
4. O app será instalado e poderá ser usado offline

## 🎨 Personalização

### Temas
O projeto suporta temas claro e escuro automaticamente:
- Detecta preferência do sistema
- Permite toggle manual
- Salva preferência no localStorage

### Cores
As cores podem ser facilmente personalizadas no CSS usando variáveis:

```css
:root {
    --primary: #e5243b;     /* Vermelho ODS 1 */
    --secondary: #c5192d;
    --accent: #891523;
    --light: #fef5f6;
    --dark: #6d0f19;
}
```

### Conteúdo
O conteúdo pode ser facilmente atualizado editando o `index.html`. Cada seção é bem estruturada e documentada.

## 🔍 Busca

O sistema de busca inclui:
- Busca em tempo real
- Destaque de termos encontrados
- Navegação por teclado nos resultados
- Snippets contextuais

## 📊 Performance

### Métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Otimizações
- CSS e JavaScript minificados
- Lazy loading de conteúdo
- Service Worker para cache
- Prefetch de links importantes

## ♿ Acessibilidade

### Recursos Implementados
- Contraste de cores WCAG AA
- Navegação por teclado completa
- Rótulos ARIA apropriados
- Skip links para conteúdo principal
- Suporte a leitores de tela
- Textos alternativos para ícones

### Testes
O projeto foi testado com:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)
- axe DevTools

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptações
- Menu hamburguer no mobile
- Layout flexível
- Tipografia responsiva
- Touch-friendly naçoes móveis

## 🛠️ Desenvolvimento

### Estrutura do Código
- **CSS**: Organizado em seções lógicas com comentários
- **JavaScript**: Classes ES6 com separação de responsabilidades
- **HTML**: Semântico e bem estruturado

### Boas Práticas
- Mobile-first design
- Progressive enhancement
- Graceful degradation
- Performance budget
- Semantic versioning

## 🔄 Atualizações Futuras

### Planejadas
- 🎥 Vídeos educacionais integrados
- 🧩 Quiz interativo
- 📊 Gráficos e visualizações de dados
- 🗺️ Mapas interativos
- 📧 Export para PDF
- 🔔 Notificações push
- 🌍 Internaçonalização (i18n)

## 📄 Licença

Este projeto está licenciado sob a **GNU General Public License v3.0**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

### Sobre a GPL v3.0
- ✅ Uso comercial permitido
- ✅ Modificação permitida
- ✅ Distribuição permitida
- ✅ Uso privado permitido
- ⚠️ Deve incluir licença e copyright
- ⚠️ Deve divulgar código fonte
- ⚠️ Modificações devem ser licenciadas sob GPL

## 🤝 Contribuições

Contribuições são muito bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Tipos de Contribuição
- 🐛 Correção de bugs
- ✨ Novas funcionalidades
- 📝 Melhoria da documentação
- 🎨 Melhorias de design
- ♿ Melhorias de acessibilidade
- 🔍 Otimizações de performance
- 🌍 Traduções

## 📞 Contato

**Alexandre Henrique Ventura**
- Email: alexandrehenrique.ventura@gmail.com
- GitHub: [@alexandrehenriqueventura](https://github.com/alexandrehenriqueventura)

**Instituição**
- Escola Estadual Joaquim Diégues
- Laboratório de Iniciativas Sociais
- Viçosa, Alagoas, Brasil

## 🙏 Agradecimentos

- **ONU Brasil**: Pelos recursos e documentação sobre ODS
- **IPEA**: Pelos dados e indicadores
- **Escola Estadual Joaquim Diégues**: Pelo apoio institucional
- **Estudantes**: Pelo feedback e testes
- **Comunidade Open Source**: Pelas ferramentas e inspiração

---

<div align="center">

**Desenvolvido com ❤️ para a educação sobre desenvolvimento sustentável**

[ODS 1](https://brasil.un.org/pt-br/sdgs/1) • [Agenda 2030](https://brasil.un.org/pt-br/sdgs) • [IPEA](https://www.ipea.gov.br/ods/)

![ODS](https://img.shields.io/badge/Contribuindo%20para-Os%2017%20ODS-blue?style=for-the-badge)

</div>