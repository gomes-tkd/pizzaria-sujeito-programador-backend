# Documentação de Contexto do Projeto - Pizzaria Backend

Este documento detalha a arquitetura, organização, tecnologias e especificações do projeto backend da Pizzaria.

## 1. Arquitetura do Projeto

O projeto segue uma arquitetura em camadas (Layered Architecture) adaptada para APIs RESTful com Node.js e TypeScript. O fluxo de dados é unidirecional:

**Fluxo da Requisição:**

1.  **Rotas (`Routes`)**: Recebem a requisição HTTP, definem o endpoint e aplicam middlewares (autenticação, validação, etc.).
2.  **Controladores (`Controllers`)**: Recebem a requisição da rota, extraem os dados necessários e chamam o serviço apropriado. Responsáveis por lidar com os objetos `req` e `res` do Express.
3.  **Serviços (`Services`)**: Contêm a regra de negócio da aplicação. Recebem dados do controller, validam regras de negócio complexas e interagem com o banco de dados.
4.  **Banco de Dados (Prisma ORM)**: Camada de persistência de dados.

**Diagrama Simplificado:**
`Request` -> `Route` -> `Middleware` -> `Controller` -> `Service` -> `Prisma/DB` -> `Response`

## 2. Organização de Pastas (`src/`)

A estrutura de pastas é organizada por responsabilidade técnica e, dentro dela, por domínio (ex: user, category).

- **`@types/`**: Definições de tipos globais ou sobrescritas (ex: extensão do Request do Express).
- **`config/`**: Arquivos de configuração do projeto.
- **`controllers/`**: Controladores da aplicação.
  - `user/`: Controladores relacionados a usuários.
  - `category/`: Controladores relacionados a categorias.
- **`docs/`**: Configurações do Swagger.
- **`errors/`**: Classes de erros personalizados (`AppError`).
- **`middlewares/`**: Middlewares da aplicação (autenticação, validação, tratamento de erros).
- **`prisma/`**: Instância do cliente Prisma e configurações de conexão.
- **`routes/`**: Definições das rotas da API.
- **`schemas/`**: Schemas de validação de dados (Zod).
- **`services/`**: Serviços com a lógica de negócio.
- **`server.ts`**: Ponto de entrada da aplicação.

## 3. Tecnologias e Versões

As principais bibliotecas e versões utilizadas no projeto são:

- **Linguagem**: TypeScript (~5.9.3)
- **Runtime**: Node.js (via `tsx` para desenvolvimento)
- **Framework Web**: Express (^5.2.1)
- **ORM**: Prisma (^6.19.0)
- **Banco de Dados**: PostgreSQL
- **Validação**: Zod (^4.1.13)
- **Autenticação**: JWT (jsonwebtoken ^9.0.3) + Bcryptjs (^3.0.3)
- **Documentação**: Swagger (swagger-jsdoc ^6.2.8)

## 4. Modelagem do Banco de Dados (Prisma Schema)

O banco de dados PostgreSQL possui as seguintes tabelas e relacionamentos principais:

### Enums

- **`Role`**: `ADMIN`, `STAFF`
- **`OrderStatus`**: `WAITING`, `IN_PRODUCTION`, `DONE`, `DELIVERED`, `CANCELED`

### Models

#### `User` (users)

- `id`: String (UUID)
- `name`: String
- `email`: String (Unique)
- `password`: String
- `phone`: String
- `role`: Role (Default: STAFF)
- `createdAt`, `updatedAt`: DateTime

#### `Category` (categories)

- `id`: String (UUID)
- `name`: String (Unique)
- `products`: Relacionamento com Product[]
- `createdAt`, `updatedAt`: DateTime

#### `Product` (products)

- `id`: String (UUID)
- `name`: String
- `description`: String
- `price`: Int
- `banner`: String
- `disabled`: Boolean (Default: false)
- `categoryId`: String (FK -> Category)
- `createdAt`, `updatedAt`: DateTime

#### `Order` (orders)

- `id`: String (UUID)
- `table`: String
- `status`: OrderStatus (Default: WAITING)
- `draft`: Boolean (Default: true)
- `name`: String?
- `orderItems`: Relacionamento com OrderItem[]
- `createdAt`, `updatedAt`: DateTime

#### `OrderItem` (order_items)

- `id`: String (UUID)
- `quantity`: Int
- `orderId`: String (FK -> Order)
- `productId`: String (FK -> Product)
- `createdAt`, `updatedAt`: DateTime

## 5. Endpoints da API

### Autenticação (`/auth`)

- **POST** `/auth/login`: Autentica um usuário e retorna um token JWT.
  - **Body**: `{ email, password }`
  - **Validação**: `authUserSchema`

### Usuários (`/users`)

- **POST** `/users`: Cria um novo usuário.
  - **Body**: `{ name, email, password, phone, role? }`
  - **Validação**: `createUserSchema`
- **GET** `/users/me`: Retorna os detalhes do usuário autenticado.
  - **Auth**: Requer token Bearer.

### Categorias (`/categories`)

- **POST** `/categories`: Cria uma nova categoria.
  - **Auth**: Requer token Bearer e Role ADMIN.
  - **Body**: `{ name }`
  - **Validação**: `createCategorySchema`
- **GET** `/categories`: Lista todas as categorias.
  - **Auth**: Requer token Bearer.

### Produtos (`/products`)

- **POST** `/products`: Cria um novo produto com upload de imagem.
  - **Auth**: Requer token Bearer e Role ADMIN.
  - **Content-Type**: `multipart/form-data`
  - **Body**:
    - `name`: string
    - `description`: string
    - `price`: string
    - `category_id`: string (UUID)
    - `file`: arquivo de imagem (banner)
  - **Validação**: `createProductSchema`

## 6. Validação e Middlewares

### Validação (Zod)

Utilizamos a biblioteca **Zod** para definir schemas e validar os dados de entrada.
O middleware `validateSchema(schema)` intercepta a requisição e valida `body`, `query` ou `params` antes de chegar ao controller.

**Schemas Principais:**

- `createUserSchema`: Valida nome (min 3), email, telefone (regex), senha (forte) e role.
- `authUserSchema`: Valida email e senha.
- `createCategorySchema`: Valida nome da categoria (min 2).

### Middlewares

- **`validateSchema`**: Valida a requisição contra um schema Zod. Retorna 400 se inválido.
- **`isAuthenticated`**: Verifica se o token JWT está presente e é válido. Injeta o `user_id` no request. Retorna 401 se não autorizado.
- **`isAdmin`**: Verifica se o usuário autenticado possui a role `ADMIN`. Retorna 403 se proibido.
- **`errorHandler`**: Middleware global para capturar exceções e retornar respostas de erro padronizadas.
