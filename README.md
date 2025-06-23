# 🚀 QualiAI - Frontend

> **Sistema de Análise de Qualidade com IA** - Interface moderna e intuitiva para análise e relatórios de qualidade de produtos.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

O **QualiAI** é uma aplicação web moderna desenvolvida em React que oferece uma interface intuitiva para análise de qualidade de produtos utilizando inteligência artificial. O sistema permite upload de imagens, análise automática de qualidade, geração de relatórios e gerenciamento de usuários.

### ✨ Principais Características

- 🔐 **Sistema de Autenticação Seguro** com JWT
- 📸 **Upload de Imagens** para análise
- 🤖 **Análise Automática** com IA
- 📊 **Relatórios Detalhados** em múltiplos formatos
- 👥 **Gerenciamento de Usuários** com diferentes níveis de acesso
- 🎨 **Interface Moderna** com PrimeReact
- 📱 **Responsivo** para diferentes dispositivos

## 🚀 Funcionalidades

### 🔐 Autenticação e Segurança
- **Login/Logout** com validação de credenciais
- **Registro de usuários** com validação de dados
- **Recuperação de senha** via email
- **Proteção de rotas** com verificação de autenticação
- **Lembrar-me** - salva credenciais de forma segura
- **Tokens JWT** para sessões seguras

### 📸 Upload e Análise
- **Upload de imagens** com drag & drop
- **Análise automática** de qualidade de produtos
- **Suporte a múltiplos formatos** de imagem
- **Processamento em tempo real**

### 📊 Relatórios e Exportação
- **Visualização em tabela** dos resultados
- **Exportação para CSV** dos dados
- **Exportação para JSON** dos relatórios
- **Filtros avançados** por produto, qualidade e período
- **Paginação** para grandes volumes de dados

### 👥 Gerenciamento de Usuários
- **Perfil do usuário** com edição de dados
- **Diferentes níveis de acesso** (Admin, Usuário)
- **Controle de permissões** por funcionalidade
- **Histórico de atividades**

### 🎨 Interface e UX
- **Design responsivo** para desktop e mobile
- **Componentes modernos** com PrimeReact
- **Feedback visual** com toasts e notificações
- **Navegação intuitiva** entre páginas
- **Loading states** para melhor UX

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[React 19](https://reactjs.org/)** - Biblioteca JavaScript para interfaces
- **[PrimeReact 10](https://primereact.org/)** - Componentes UI modernos
- **[React Router 7](https://reactrouter.com/)** - Roteamento da aplicação
- **[Axios](https://axios-http.com/)** - Cliente HTTP para APIs
- **[CSS Modules](https://github.com/css-modules/css-modules)** - Estilização modular

### Desenvolvimento
- **[Create React App](https://create-react-app.dev/)** - Boilerplate React
- **[Cross-env](https://www.npmjs.com/package/cross-env)** - Variáveis de ambiente
- **[Testing Library](https://testing-library.com/)** - Testes de componentes

### Outras Dependências
- **[UUID](https://www.npmjs.com/package/uuid)** - Geração de IDs únicos
- **[PrimeIcons](https://primereact.org/icons/)** - Ícones do PrimeReact
- **[Quill](https://quilljs.com/)** - Editor de texto rico

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **[Node.js](https://nodejs.org/)** (versão 16 ou superior)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)**
- **Backend QualiAI** rodando (porta 8084)
- **Serviço de IA** rodando (porta 5000)

## ⚙️ Instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd frontend-projeto-v
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   # Crie um arquivo .env na raiz do projeto
   REACT_APP_API_URL=http://localhost:8084
   REACT_APP_AI_SERVICE_URL=http://localhost:5000/api
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

5. **Acesse a aplicação**
   ```
   http://localhost:4200
   ```

## 🎮 Como Usar

### 🔐 Primeiro Acesso
1. Acesse `http://localhost:4200`
2. Clique em "Registrar" para criar uma conta
3. Faça login com suas credenciais
4. Marque "Lembrar-me" se desejar salvar suas credenciais

### 📸 Upload de Imagens
1. Navegue para "Upload" no menu
2. Arraste imagens ou clique para selecionar
3. Aguarde o processamento automático
4. Visualize os resultados da análise

### 📊 Geração de Relatórios
1. Acesse "Relatórios" no menu
2. Selecione os filtros desejados:
   - **Produto**: Maçãs, Mangas, Todas
   - **Qualidade**: Defeituosa, Não defeituosa, Todas
   - **Período**: 24h, 7 dias, 30 dias, Todas
3. Escolha o formato de exportação:
   - **Visualizar tabela** - Ver dados na interface
   - **Gerar CSV** - Download em formato CSV
   - **Gerar JSON** - Download em formato JSON

### 👤 Gerenciamento de Perfil
1. Clique em "Perfil" no menu
2. Edite suas informações pessoais
3. Salve as alterações
4. Use "Sair" para fazer logout

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Card/            # Componente de card
│   ├── DataTable/       # Tabela de dados
│   ├── Dropdown/        # Dropdown customizado
│   ├── ProtectedRoute/  # Rota protegida
│   └── UploadImage/     # Upload de imagens
├── pages/               # Páginas da aplicação
│   ├── Admin/           # Página administrativa
│   ├── Base/            # Página inicial
│   ├── Login/           # Página de login
│   ├── Profile/         # Perfil do usuário
│   ├── Register/        # Registro de usuário
│   ├── Report/          # Relatórios
│   ├── Upload/          # Upload de imagens
│   └── NotFound/        # Página 404
├── services/            # Serviços e APIs
│   ├── AIService.js     # Serviço de IA
│   ├── UserService.js   # Serviço de usuários
│   └── axios-config.js  # Configuração do Axios
├── styles/              # Estilos globais
├── App.jsx              # Componente principal
├── AppRoutes.jsx        # Configuração de rotas
└── index.jsx            # Ponto de entrada
```

## ⚙️ Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# URLs dos serviços
REACT_APP_API_URL=http://localhost:8084
REACT_APP_AI_SERVICE_URL=http://localhost:5000/api

# Configurações da aplicação
REACT_APP_APP_NAME=QualiAI
REACT_APP_VERSION=1.0.0
```

### Configuração do Axios
O sistema está configurado para:
- **Interceptar requisições** e adicionar token JWT automaticamente
- **Interceptar respostas** e tratar erros 401/403
- **Redirecionar para login** quando token expira

## 📜 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm start

# Cria build de produção
npm run build

# Executa os testes
npm test

# Ejecta do Create React App (irreversível)
npm run eject
```

## 🔧 Funcionalidades Técnicas

### 🔐 Sistema de Autenticação
- **JWT Tokens** para autenticação
- **localStorage** para persistência de sessão
- **Proteção de rotas** automática
- **Interceptadores** para renovação de tokens

### 📱 Responsividade
- **Mobile-first** design
- **Breakpoints** otimizados
- **Componentes adaptativos**

### 🎨 UI/UX
- **PrimeReact** para componentes modernos
- **CSS Modules** para estilização
- **Ícones** consistentes
- **Feedback visual** em todas as ações

### 🔒 Segurança
- **Validação** de formulários
- **Sanitização** de dados
- **Proteção** contra XSS
- **Criptografia** de dados sensíveis

## 🤝 Contribuição

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Código
- Use **ES6+** features
- Siga o **ESLint** configurado
- Mantenha **componentes funcionais**
- Use **hooks** do React
- Documente **funções complexas**

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **Email**: [seu-email@exemplo.com]
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/qualiai-frontend/issues)
- **Documentação**: [Wiki do Projeto](https://github.com/seu-usuario/qualiai-frontend/wiki)

---

**Desenvolvido com ❤️ pela equipe QualiAI**

*Última atualização: Junho de 2025*
