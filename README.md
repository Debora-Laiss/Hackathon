<div align="center">

# 🌿 PID - Plataforma Interativa de Descarbonização

<div align="right">

[![🎮 JOGUE AGORA!](https://img.shields.io/badge/🎮_JOGUE_AGORA!-FF6B35?style=for-the-badge&logoColor=white)](https://quiz-omega-blush.vercel.app/)

</div>

Um hub digital que conecta o planejamento industrial verde a dados de infraestrutura energética no Brasil, desenvolvido para o hackathon.

</div>

## 📋 Sobre o Projeto

A **Plataforma Interativa de Descarbonização (PID)** é uma aplicação web desenvolvida pela equipe 199 que oferece um novo olhar para o futuro da transição energética no Brasil.

A plataforma conta com mapas interativos organizados em camadas que viabilizam o alinhamento estratégico entre o desenvolvimento industrial e o planejamento de infraestrutura, identificando locais promissores para investimento em tecnologias de baixo carbono.

### ✨ Principais Funcionalidades

- 🗺️ **Mapas Interativos**: Visualização geográfica de infraestrutura energética e industrial
- 👥 **Sistema de Personas**: Experiência personalizada para diferentes perfis de usuários
- 📊 **Dashboards Analíticos**: Indicadores de transição energética por estado
- 💬 **ChatBot Integrado**: Assistente virtual para navegação e informações
- 🎮 **Jogo Educativo**: Quiz interativo sobre transição energética
- 📱 **Design Responsivo**: Interface adaptável para diferentes dispositivos

### 🎯 Personas Suportadas

A plataforma oferece experiências personalizadas para:

1. **📈 Investidor** - Fundos, bancos e empresas privadas
2. **🏛️ Governo** - Gestores públicos e reguladores
3. **🔬 Consultor Técnico** - Engenheiros, pesquisadores e analistas
4. **🌱 Cidadão** - Qualquer pessoa interessada

## 🚀 Tecnologias Utilizadas

- **React 18.2** - Biblioteca JavaScript para construção de interfaces
- **Vite 4.4** - Build tool e dev server
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Leaflet 1.9** - Biblioteca de mapas interativos
- **React Leaflet 4.2** - Integração React + Leaflet
- **Recharts 3.8** - Biblioteca de gráficos para React
- **MapLibre GL 5.24** - Renderização de mapas vetoriais

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Hackathon/pid-plataforma
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em `http://localhost:5173`

## 🛠️ Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Executar linter
npm run lint
```

## 📁 Estrutura do Projeto

```
pid-plataforma/
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/         # Imagens, ícones e recursos
│   ├── components/     # Componentes reutilizáveis
│   │   ├── BaseComponents.jsx
│   │   ├── ChatBot.jsx
│   │   └── Navbar.jsx
│   ├── controllers/    # Lógica de controle e navegação
│   ├── models/         # Modelos de dados
│   ├── views/          # Páginas da aplicação
│   │   ├── Views.jsx              # Página inicial
│   │   ├── InfrastructurePage.jsx # Infraestrutura
│   │   ├── IndustriesPage.jsx     # Indústrias
│   │   ├── PagePID.jsx            # Sobre PID
│   │   ├── PaginaDecisao.jsx      # Decisão
│   │   └── PageLearnMore.jsx      # Saiba mais
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Ponto de entrada
│   └── index.css       # Estilos globais
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Características do Design

- **Paleta de Cores**: Design moderno com cores institucionais (#1A2744, #E84C1F)
- **Tipografia**: Fonte Sora para títulos, sistema para corpo de texto
- **Animações**: Transições suaves e micro-interações
- **Acessibilidade**: Componentes pensados para inclusão
- **Responsividade**: Layout adaptável usando CSS Grid e Flexbox

## 🎮 Jogo Educativo

Como parte do ecossistema da plataforma, desenvolvemos um **quiz interativo** para educar e engajar o público sobre temas de transição energética e descarbonização.

🔗 **Acesse o jogo**: [https://quiz-omega-blush.vercel.app/](https://quiz-omega-blush.vercel.app/)

### Características do Quiz:
- Perguntas sobre transição energética
- Interface gamificada e intuitiva
- Feedback educativo em tempo real
- Ideal para a persona "Cidadão"

## 📊 Dados e Cobertura

- **3.278** pontos mapeados
- **27** estados cobertos
- Cobertura ampliada de setores e regiões
- Novas camadas de dados
- Indicadores de transição energética por estado
- Atlas do Futuro Industrial do Brasil

## 📝 Licença

Este projeto foi desenvolvido para o hackathon.

## 👥 Equipe

Desenvolvido pela equipe do Instituto E+ Transição Energética.

---

**Versão**: 3.0 · COP30  
**Status**: Em desenvolvimento para hackathon
