# Sistema de Gerenciamento de Pets e Tutores

Sistema web desenvolvido em React + TypeScript para gerenciamento de pets e seus tutores, integrando com API REST pública do Estado de Mato Grosso.

## Dados do Processo Seletivo

| Campo | Informação |
|-------|------------|
| **N° Inscrição** | 16353 |
| **Nome** | DANIELE DOS SANTOS TAVARES LOBO |
| **Processo Seletivo** | PROCESSO SELETIVO CONJUNTO Nº 001/2026/SEPLAG e demais Órgãos |
| **Vaga** | Engenheiro da Computação - Sênior |
| **Cidade** | Cuiabá |
| **Local** | SECRETARIA DE ESTADO DE PLANEJAMENTO E GESTÃO |
| **Cargo** | ANALISTA DE TECNOLOGIA DA INFORMAÇÃO |
| **Perfil** | ENGENHEIRO DA COMPUTAÇÃO - SÊNIOR |

## Funcionalidades

### Autenticação
- Login com JWT
- Refresh token automático
- Proteção de rotas privadas
- Persistência de sessão

### Módulo de Pets
- Listagem com paginação (10 itens por página)
- Busca por nome e raça com debounce automático
- Cadastro de novos pets
- Edição de pets existentes
- Visualização detalhada
- Upload de fotos
- Exibição de tutor vinculado

### Módulo de Tutores
- Listagem com paginação (10 itens por página)
- Busca por nome e telefone com debounce automático
- Cadastro de novos tutores
- Edição de tutores existentes
- Visualização detalhada
- Upload de fotos
- Vinculação e desvinculação de pets
- Listagem de pets vinculados

### Interface
- Tema claro e escuro (toggle)
- Design responsivo (mobile-first)
- Loading states em todas as operações
- Tratamento de erros com mensagens amigáveis
- Confirmações com modais customizados

## Tecnologias Utilizadas

### Core
- **React** 19.2.0 - Biblioteca para construção de interfaces
- **TypeScript** 5.9.3 - Tipagem estática
- **Vite** 7.2.4 - Build tool e dev server

### Roteamento e Estado
- **React Router DOM** 7.1.3 - Roteamento com lazy loading
- **Context API** - Gerenciamento de estado global (Tema e Autenticação)

### Estilização
- **Tailwind CSS** v4 - Framework CSS utility-first
- **@tailwindcss/postcss** - Plugin PostCSS

### Requisições HTTP
- **Axios** 1.7.9 - Cliente HTTP com interceptors

### Formulários
- **react-input-mask** 3.0.0-alpha.18 - Máscaras para inputs

### Testes
- **Vitest** 4.0.18 - Framework de testes
- **React Testing Library** 16.1.0 - Testes de componentes React
- **jsdom** 26.0.0 - DOM para testes
- **@testing-library/user-event** 14.6.0 - Simulação de interações

### Qualidade de Código
- **ESLint** 9.18.0 - Linter
- **TypeScript ESLint** 8.22.1 - Regras TypeScript para ESLint

## Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conexão com a internet (para acessar a API)

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd ProcessoSeletivoSesplag
```

2. Instale as dependências:
```bash
npm install
```

## Scripts Disponíveis

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento em `http://localhost:5173`

### Build
```bash
npm run build
```
Compila o TypeScript e gera build de produção na pasta `dist/`

### Preview
```bash
npm run preview
```
Visualiza o build de produção localmente

### Testes
```bash
npm run test
```
Executa todos os testes com Vitest

### Lint
```bash
npm run lint
```
Verifica o código com ESLint

## Estrutura do Projeto

```
src/
├── assets/                # Recursos estáticos (vazio - não utilizado)
├── components/            # Componentes reutilizáveis
│   ├── common/           # Componentes comuns (Loading)
│   ├── layout/           # Layout da aplicação (Header, Layout)
│   └── ui/               # Componentes de UI
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── FileUpload.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       ├── Pagination.tsx
│       └── Spinner.tsx
├── contexts/             # Contextos React
│   ├── AuthContext.tsx   # Autenticação e autorização
│   └── ThemeContext.tsx  # Gerenciamento de tema
├── hooks/                # Custom hooks
│   └── useDebounce.ts    # Hook de debounce para busca
├── pages/                # Páginas da aplicação
│   ├── Auth/
│   │   └── Login.tsx
│   ├── Home.tsx
│   ├── Pets/
│   │   ├── PetDetails.tsx
│   │   ├── PetForm.tsx
│   │   └── PetsList.tsx
│   └── Tutores/
│       ├── TutorDetails.tsx
│       ├── TutorForm.tsx
│       └── TutoresList.tsx
├── routes/               # Configuração de rotas
│   └── AppRoutes.tsx
├── services/             # Serviços de API
│   ├── api.ts            # Configuração base do Axios
│   ├── auth.service.ts   # Serviço de autenticação
│   ├── pets.service.ts   # Serviço de pets
│   └── tutores.service.ts # Serviço de tutores
├── tests/                # Configuração e testes
│   └── setup.ts          # Setup do Vitest
├── types/                # Definições TypeScript
│   ├── api.ts            # Tipos da API
│   ├── auth.ts           # Tipos de autenticação
│   ├── pet.ts            # Tipos de Pet
│   └── tutor.ts          # Tipos de Tutor
├── utils/                # Utilitários
│   └── errorHandler.ts   # Tratamento de erros da API
├── App.tsx               # Componente raiz
├── index.css             # Estilos globais
└── main.tsx              # Entry point
```

## Testes

O projeto possui **64 testes** distribuídos em:

- **Componentes UI**: 34 testes
  - Button (10 testes)
  - Card (11 testes)
  - Modal (8 testes)
  - Spinner (5 testes)

- **Serviços**: 26 testes
  - Auth Service (8 testes)
  - Pets Service (8 testes)
  - Tutores Service (10 testes)

- **Hooks**: 4 testes
  - useDebounce (4 testes)

Para executar os testes:
```bash
npm run test
```

## API

### Base URL
```
https://pet-manager-api.geia.vip
```

### Documentação
Swagger UI disponível em:
```
https://pet-manager-api.geia.vip/q/swagger-ui/
```

### Endpoints Principais

#### Autenticação
- `POST /autenticacao/login` - Login
- `PUT /autenticacao/refresh` - Renovar token

#### Pets
- `GET /v1/pets` - Listar pets (com paginação e filtros)
- `GET /v1/pets/{id}` - Buscar pet por ID
- `POST /v1/pets` - Criar pet
- `PUT /v1/pets/{id}` - Atualizar pet
- `POST /v1/pets/{id}/fotos` - Upload de foto
- `DELETE /v1/pets/{id}/fotos` - Remover foto

#### Tutores
- `GET /v1/tutores` - Listar tutores (com paginação e filtros)
- `GET /v1/tutores/{id}` - Buscar tutor por ID
- `POST /v1/tutores` - Criar tutor
- `PUT /v1/tutores/{id}` - Atualizar tutor
- `POST /v1/tutores/{id}/fotos` - Upload de foto
- `DELETE /v1/tutores/{id}/fotos` - Remover foto
- `POST /v1/tutores/{id}/pets/{petId}` - Vincular pet
- `DELETE /v1/tutores/{id}/pets/{petId}` - Desvincular pet

## Design System

### Cores do Tema Claro
- Background primário: `#FFFFFF`
- Background secundário: `#F5F5F5`
- Accent rosa: `#FF69B4`
- Accent verde limão: `#BFFF00`
- Accent laranja: `#FFA500`
- Texto primário: `#333333`
- Texto secundário: `#666666`

### Cores do Tema Escuro
- Background primário: `#1A1A1A`
- Background secundário: `#2D2D2D`
- Accent rosa: `#FF1493`
- Accent verde limão: `#9ACD32`
- Accent laranja: `#FF8C00`
- Texto primário: `#FFFFFF`
- Texto secundário: `#CCCCCC`

## Arquitetura

### Padrões Utilizados

**Component-Based Architecture**
- Componentes funcionais com hooks
- Separação entre componentes de UI, layout e páginas
- Reutilização através de props tipadas

**Service Layer Pattern**
- Serviços isolados para cada domínio (auth, pets, tutores)
- Instância única do Axios com interceptors
- Tratamento centralizado de erros

**Context API**
- AuthContext: gerencia autenticação e tokens
- ThemeContext: gerencia tema claro/escuro

**Custom Hooks**
- useDebounce: otimiza buscas com delay de 500ms

**Lazy Loading**
- Todas as páginas carregadas sob demanda
- Suspense boundaries com fallback de loading

### Fluxo de Autenticação

1. Usuário faz login via `POST /autenticacao/login`
2. Tokens são armazenados no localStorage
3. Interceptor adiciona access_token em todas as requisições
4. Em caso de 401, interceptor tenta renovar com refresh_token
5. Se refresh falhar, usuário é redirecionado ao login

### Otimizações

- Debounce em buscas (500ms)
- Lazy loading de rotas
- Paginação server-side
- Memoização onde necessário
- Build otimizado com code splitting

## Docker / Containerização

O projeto está empacotado em container Docker com todas as dependências isoladas, conforme requisito do processo seletivo.

### Executar com Docker Compose

```bash
# Build e iniciar o container
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f

# Parar container
docker-compose down
```

A aplicação estará disponível em: `http://localhost:8080`

### Executar com Docker (sem Compose)

```bash
# Build da imagem
docker build -t pet-manager-web .

# Executar container
docker run -d -p 8080:80 --name pet-manager-web pet-manager-web

# Parar e remover
docker stop pet-manager-web
docker rm pet-manager-web
```

### Detalhes da Containerização

- **Multi-stage build**: Stage 1 compila com Node.js, Stage 2 serve com Nginx
- **Imagem final**: nginx:alpine (extremamente leve)
- **Porta exposta**: 80 (mapeada para 8080 no host)
- **Nginx**: Configurado com rewrite rules para SPA e compressão gzip
- **Dependências**: Todas isoladas no container

### Arquivos Docker

- `Dockerfile`: Definição da imagem multi-stage
- `docker-compose.yml`: Orquestração do container
- `.dockerignore`: Exclusão de arquivos desnecessários
- `nginx.conf`: Configuração do servidor web

## Build e Deploy

### Gerar Build de Produção
```bash
npm run build
```

O build será gerado na pasta `dist/` com:
- HTML minificado
- CSS otimizado e minificado
- JavaScript com code splitting e tree shaking
- Assets com hash para cache busting

### Preview Local do Build
```bash
npm run preview
```

### Deploy

O projeto pode ser deployado em qualquer serviço de hospedagem estática:

- **Vercel**: `vercel deploy`
- **Netlify**: Conectar repositório ou arrastar pasta `dist/`
- **GitHub Pages**: Configurar gh-pages
- **Nginx/Apache**: Copiar conteúdo de `dist/` para servidor

**Importante**: Configurar rewrite rules para SPA (todas as rotas devem apontar para index.html)

Exemplo de configuração Nginx:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Licença

Este projeto foi desenvolvido como parte de um processo seletivo.

## Autor

- **Daniele Tavares Lobo** - [@danitavareslobo](https://github.com/danitavareslobo)
