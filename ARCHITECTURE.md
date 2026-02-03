# Documentação de Arquitetura

## Visão Geral

Sistema web SPA (Single Page Application) desenvolvido com React + TypeScript para gerenciamento de pets e tutores, seguindo princípios de Clean Architecture e boas práticas de desenvolvimento frontend.

## Princípios Arquiteturais

### 1. Separation of Concerns
Separação clara entre camadas de apresentação, lógica de negócio e acesso a dados:
- **Presentation Layer**: Componentes React (UI, Layout, Pages)
- **Business Logic Layer**: Contexts, Custom Hooks, Utils
- **Data Access Layer**: Services (API calls)

### 2. Single Responsibility Principle
Cada módulo/componente tem uma única responsabilidade:
- Componentes UI: apenas renderização e interação
- Services: apenas comunicação com API
- Contexts: apenas gerenciamento de estado global
- Hooks: apenas lógica reutilizável

### 3. DRY (Don't Repeat Yourself)
- Componentes reutilizáveis na pasta `components/ui/`
- Serviços isolados por domínio
- Tratamento de erros centralizado
- Custom hooks para lógica compartilhada

### 4. Composition over Inheritance
React favorece composição através de:
- Props drilling quando necessário
- Context API para estado global
- Componentes compostos (Card com CardHeader, CardTitle, etc.)

## Camadas da Aplicação

```
┌─────────────────────────────────────────────────┐
│           Presentation Layer                     │
│  ┌─────────────┐  ┌──────────┐  ┌────────────┐ │
│  │   Pages     │  │  Layout  │  │  UI/Common │ │
│  └─────────────┘  └──────────┘  └────────────┘ │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│          Business Logic Layer                    │
│  ┌──────────┐  ┌────────┐  ┌────────────────┐  │
│  │ Contexts │  │  Hooks │  │  Utils/Types   │  │
│  └──────────┘  └────────┘  └────────────────┘  │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│           Data Access Layer                      │
│  ┌──────────────────────────────────────────┐   │
│  │          Services (API Calls)            │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              External API                        │
│     https://pet-manager-api.geia.vip            │
└─────────────────────────────────────────────────┘
```

## Estrutura de Diretórios Detalhada

### `/src/components`

#### `/components/ui`
Componentes de interface reutilizáveis e sem estado (stateless quando possível):

- **Button**: Botão com variantes (primary, secondary, danger, outline)
- **Card**: Container com suporte a CardHeader, CardTitle, CardContent, CardImage
- **Input**: Input controlado com suporte a máscaras (telefone, CPF)
- **FileUpload**: Upload de arquivos com preview
- **Modal**: Modal customizado para confirmações
- **Pagination**: Navegação entre páginas com controles
- **Spinner**: Loading indicator animado

**Características**:
- Props totalmente tipadas com TypeScript
- Suporte a tema claro/escuro via Tailwind
- Classes CSS modulares e reutilizáveis
- Testados com React Testing Library

#### `/components/layout`
Componentes estruturais da aplicação:

- **Header**: Barra superior com navegação e toggle de tema
- **Layout**: Wrapper que inclui Header e renderiza children

#### `/components/common`
Componentes comuns que não se encaixam em UI:

- **Loading**: Tela de carregamento com mensagem personalizada

### `/src/contexts`

#### AuthContext
Gerencia autenticação e autorização:

```typescript
interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}
```

**Responsabilidades**:
- Login/logout de usuários
- Armazenamento de tokens no localStorage
- Verificação de autenticação
- Renovação automática de tokens (via interceptor do Axios)

#### ThemeContext
Gerencia tema claro/escuro:

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
```

**Responsabilidades**:
- Alternar entre temas
- Persistir preferência no localStorage
- Aplicar classe 'dark' no documento

### `/src/hooks`

#### useDebounce
Hook customizado para debounce de valores:

```typescript
function useDebounce<T>(value: T, delay: number): T
```

**Uso**: Otimiza buscas em tempo real, aguardando 500ms após a última digitação antes de fazer requisição à API.

### `/src/services`

Camada de acesso a dados usando padrão Service Layer:

#### api.ts
Configuração base do Axios com:
- Base URL da API
- Interceptores de request (adiciona token)
- Interceptores de response (trata erros 401 e renova token)
- Headers padrão

#### auth.service.ts
Serviço de autenticação:
- `login(credentials)`: Autentica usuário
- `refresh(refreshToken)`: Renova access token

#### pets.service.ts
Serviço de pets:
- `listar(filtros)`: Lista pets com paginação
- `buscarPorId(id)`: Busca pet específico
- `criar(data)`: Cria novo pet
- `atualizar(id, data)`: Atualiza pet existente
- `uploadFoto(id, file)`: Upload de foto
- `removerFoto(id)`: Remove foto

#### tutores.service.ts
Serviço de tutores:
- `listar(filtros)`: Lista tutores com paginação
- `buscarPorId(id)`: Busca tutor específico
- `criar(data)`: Cria novo tutor
- `atualizar(id, data)`: Atualiza tutor existente
- `uploadFoto(id, file)`: Upload de foto
- `removerFoto(id)`: Remove foto
- `vincularPet(tutorId, petId)`: Vincula pet ao tutor
- `desvincularPet(tutorId, petId)`: Desvincula pet do tutor

**Padrão**: Todos os serviços exportam objeto com métodos, não classes.

### `/src/pages`

Páginas da aplicação organizadas por módulo:

#### `/pages/Auth`
- **Login**: Formulário de autenticação

#### `/pages/Pets`
- **PetsList**: Lista com paginação, busca e cards
- **PetDetails**: Visualização detalhada e ações (editar, excluir foto)
- **PetForm**: Formulário de cadastro/edição (modo create/edit)

#### `/pages/Tutores`
- **TutoresList**: Lista com paginação, busca e cards
- **TutorDetails**: Visualização detalhada, pets vinculados e ações
- **TutorForm**: Formulário de cadastro/edição (modo create/edit)

#### `/pages/Home`
- Dashboard inicial com links para módulos

**Características**:
- Carregadas sob demanda (Lazy Loading)
- Utilizam hooks customizados (useDebounce)
- Gerenciam estado local com useState
- Efeitos colaterais com useEffect
- Navegação com useNavigate (React Router)

### `/src/routes`

#### AppRoutes.tsx
Configuração centralizada de rotas:

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />

      <Route path="/pets" element={<PetsList />} />
      <Route path="/pets/:id" element={<PetDetails />} />
      <Route path="/pets/novo" element={<PetForm />} />
      <Route path="/pets/:id/editar" element={<PetForm />} />

      <Route path="/tutores" element={<TutoresList />} />
      <Route path="/tutores/:id" element={<TutorDetails />} />
      <Route path="/tutores/novo" element={<TutorForm />} />
      <Route path="/tutores/:id/editar" element={<TutorForm />} />
    </Route>
  </Routes>
</BrowserRouter>
```

**Estratégias**:
- Lazy Loading com `React.lazy()` e `Suspense`
- Rotas protegidas com `ProtectedRoute` component
- Fallback de loading durante carregamento

### `/src/types`

Definições TypeScript para type-safety:

#### api.ts
```typescript
interface ApiError
interface PaginatedResponse<T>
```

#### auth.ts
```typescript
interface User
interface LoginRequest
interface LoginResponse
interface RefreshTokenRequest
interface RefreshTokenResponse
```

#### pet.ts
```typescript
interface Pet
interface Foto
interface PetFilters
interface CreatePetRequest
interface UpdatePetRequest
```

#### tutor.ts
```typescript
interface Tutor
interface TutorFilters
interface CreateTutorRequest
interface UpdateTutorRequest
```

### `/src/utils`

#### errorHandler.ts
Tratamento centralizado de erros da API:

```typescript
function handleApiError(error: unknown): ApiError
```

Converte erros do Axios em formato padronizado com mensagens amigáveis.

## Fluxos Principais

### 1. Fluxo de Autenticação

```
┌──────────┐
│  Usuário │
└────┬─────┘
     │
     ▼
┌─────────────────┐
│  Login Page     │
│  (form submit)  │
└────┬────────────┘
     │
     ▼
┌─────────────────────────┐
│  AuthContext.login()    │
│  - authService.login()  │
└────┬────────────────────┘
     │
     ▼
┌───────────────────────────┐
│  API Response             │
│  - access_token           │
│  - refresh_token          │
└────┬──────────────────────┘
     │
     ▼
┌────────────────────────────┐
│  localStorage.setItem()    │
│  - Armazena tokens         │
└────┬───────────────────────┘
     │
     ▼
┌────────────────────────────┐
│  navigate('/')             │
│  - Redireciona para Home   │
└────────────────────────────┘
```

### 2. Fluxo de Requisição Autenticada

```
┌────────────────┐
│  Componente    │
│  (useEffect)   │
└────┬───────────┘
     │
     ▼
┌─────────────────────┐
│  Service Method     │
│  petsService.list() │
└────┬────────────────┘
     │
     ▼
┌──────────────────────────┐
│  Axios Interceptor       │
│  - Adiciona Bearer token │
└────┬─────────────────────┘
     │
     ▼
┌─────────────────┐
│  API Request    │
└────┬────────────┘
     │
     ├─── 200 OK ───────────┐
     │                      │
     │                      ▼
     │              ┌──────────────┐
     │              │  Response    │
     │              │  Data        │
     │              └──────────────┘
     │
     └─── 401 Unauthorized ─┐
                            │
                            ▼
                    ┌────────────────────────┐
                    │  Interceptor           │
                    │  - Tenta refresh token │
                    └────┬───────────────────┘
                         │
                         ├─ Sucesso ──> Retry Request
                         │
                         └─ Falha ───> Logout + Redirect to Login
```

### 3. Fluxo de Busca com Debounce

```
┌──────────────┐
│  Usuário     │
│  (digitando) │
└────┬─────────┘
     │
     ▼
┌────────────────────────┐
│  Input onChange        │
│  - setBuscaTemp(valor) │
└────┬───────────────────┘
     │
     ▼
┌──────────────────────────────┐
│  useDebounce(valor, 500ms)   │
│  - Aguarda 500ms sem mudança │
└────┬─────────────────────────┘
     │
     ▼
┌─────────────────────────┐
│  useEffect              │
│  - setFiltros(debounced)│
└────┬────────────────────┘
     │
     ▼
┌──────────────────────────┐
│  useEffect               │
│  - service.listar(filtros)│
└────┬─────────────────────┘
     │
     ▼
┌─────────────────┐
│  API Request    │
└─────────────────┘
```

### 4. Fluxo de Upload de Foto

```
┌──────────────┐
│  Usuário     │
│  (seleciona) │
└────┬─────────┘
     │
     ▼
┌────────────────────┐
│  FileUpload        │
│  - onChange event  │
└────┬───────────────┘
     │
     ▼
┌───────────────────────┐
│  Validação            │
│  - Tipo de arquivo    │
│  - Tamanho (max 5MB)  │
└────┬──────────────────┘
     │
     ▼
┌────────────────────────┐
│  Preview (Base64)      │
│  - FileReader.readAs.. │
└────┬───────────────────┘
     │
     ▼
┌────────────────────────┐
│  handleSubmit          │
│  - service.uploadFoto()│
└────┬───────────────────┘
     │
     ▼
┌────────────────────────────┐
│  FormData                  │
│  - append('file', arquivo) │
└────┬───────────────────────┘
     │
     ▼
┌────────────────────────┐
│  API POST              │
│  multipart/form-data   │
└────┬───────────────────┘
     │
     ▼
┌─────────────────────┐
│  Atualiza UI        │
│  - Nova foto exibida│
└─────────────────────┘
```

## Decisões Técnicas

### Por que React?
- Biblioteca madura e amplamente adotada
- Ecossistema rico de ferramentas
- Performance com Virtual DOM
- Hooks permitem código limpo e reutilizável

### Por que TypeScript?
- Type safety previne erros em tempo de compilação
- Melhor IntelliSense e autocompletar
- Documentação implícita via tipos
- Refatoração mais segura

### Por que Vite?
- Build extremamente rápido
- HMR (Hot Module Replacement) instantâneo
- Configuração mínima
- Melhor experiência de desenvolvimento

### Por que Tailwind CSS?
- Utility-first permite desenvolvimento rápido
- Purge automático de CSS não utilizado
- Suporte nativo a dark mode
- Sem conflitos de nomenclatura CSS

### Por que Context API (não Redux/Zustand)?
- Requisitos de estado global são simples (Auth + Theme)
- Context API é nativa do React
- Menos boilerplate
- Suficiente para escala do projeto

### Por que Axios (não Fetch)?
- Interceptors para tokens e erros
- Timeout configurável
- Transformação automática de JSON
- Cancelamento de requisições
- Melhor tratamento de erros

### Por que Vitest (não Jest)?
- Integração nativa com Vite
- Mais rápido que Jest
- Mesma API do Jest (fácil migração)
- Suporte a ESM out of the box

## Otimizações de Performance

### 1. Code Splitting
- Lazy loading de todas as páginas
- Chunks separados por rota
- Reduz bundle inicial

### 2. Debounce em Buscas
- Evita requisições desnecessárias
- Delay de 500ms
- Melhora UX e performance da API

### 3. Paginação Server-Side
- Apenas 10 itens por página
- Reduz payload da API
- Melhor performance de renderização

### 4. Build Otimizado
- Tree shaking remove código não utilizado
- Minificação de JS/CSS
- Gzip compression
- Cache busting com hashes

### 5. Imagens
- Upload limitado a 5MB
- Preview em base64 antes do upload
- Lazy loading de imagens

## Segurança

### 1. Autenticação
- JWT tokens com expiração
- Refresh token para renovação
- Tokens armazenados no localStorage (considerações de XSS)
- Logout limpa todos os tokens

### 2. Autorização
- Rotas protegidas verificam autenticação
- Redirecionamento automático ao login
- Interceptor valida tokens em todas as requisições

### 3. Validação
- Validação client-side em formulários
- TypeScript previne tipos inválidos
- Sanitização de inputs (masks)

### 4. HTTPS
- API usa HTTPS obrigatoriamente
- Tokens trafegados de forma segura

## Escalabilidade

### Atual
- Arquitetura suporta adição de novos módulos
- Serviços isolados por domínio
- Componentes reutilizáveis

### Possíveis Melhorias Futuras

1. **Estado Global Mais Robusto**
   - Migrar para Zustand ou Redux Toolkit se necessário
   - Store separada por domínio

2. **Cache de Dados**
   - React Query para cache automático
   - Revalidação em background
   - Otimistic updates

3. **Testes E2E**
   - Playwright ou Cypress
   - Testes de fluxos completos

4. **Monitoramento**
   - Sentry para error tracking
   - Google Analytics para métricas
   - Performance monitoring

5. **PWA**
   - Service Workers para offline
   - Cache de assets
   - Instalável

6. **Internacionalização**
   - react-i18next
   - Múltiplos idiomas

7. **Server-Side Rendering**
   - Next.js para SSR/SSG
   - Melhor SEO
   - Performance inicial

## Testes

### Estratégia de Testes

#### Unitários (64 testes)
- **Componentes UI**: Testam renderização e interações
- **Serviços**: Testam chamadas à API com mocks
- **Hooks**: Testam lógica de debounce

#### Cobertura
- Componentes críticos: 100%
- Serviços: 100%
- Hooks customizados: 100%

### Ferramentas
- **Vitest**: Test runner
- **React Testing Library**: Testes de componentes
- **jsdom**: Simula ambiente browser
- **@testing-library/user-event**: Simula interações

### Boas Práticas
- Testes focam em comportamento, não implementação
- Queries preferem acessibilidade (getByRole, getByLabelText)
- Asserts verificam o que o usuário vê
- Mocks apenas para APIs externas

## Manutenibilidade

### Convenções de Código

1. **Nomenclatura**
   - Componentes: PascalCase
   - Funções/variáveis: camelCase
   - Constantes: UPPER_SNAKE_CASE
   - Arquivos: PascalCase para componentes, camelCase para utils

2. **Estrutura de Arquivos**
   - Um componente por arquivo
   - Testes ao lado do código (`*.test.tsx`)
   - Index.ts para barrel exports

3. **TypeScript**
   - Sempre tipar props, estados e retornos
   - Evitar `any`
   - Usar tipos utilitários (Partial, Pick, Omit)
   - Interfaces para objetos públicos

4. **React**
   - Componentes funcionais apenas
   - Hooks no topo do componente
   - useEffect com dependências explícitas
   - Early returns para condicionais

5. **CSS**
   - Tailwind classes inline
   - Classes de tema com prefixo `dark:`
   - Mobile-first (responsivo)

### Documentação
- README.md com instruções completas
- ARCHITECTURE.md (este arquivo) explica decisões
- Comentários apenas quando necessário
- Código autodescritivo

## Conclusão

Esta arquitetura foi projetada para:
- **Manutenibilidade**: Código limpo e organizado
- **Escalabilidade**: Fácil adicionar novos módulos
- **Performance**: Otimizações em várias camadas
- **Type Safety**: TypeScript em 100% do código
- **Testabilidade**: 64 testes cobrindo casos críticos
- **DX (Developer Experience)**: Ferramentas modernas (Vite, Tailwind)
- **UX (User Experience)**: Loading states, debounce, tema claro/escuro

A arquitetura segue princípios SOLID e Clean Architecture adaptados para frontend React, resultando em uma aplicação robusta, testável e pronta para produção.
