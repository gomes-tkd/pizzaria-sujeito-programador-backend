import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Gerenciamento da Pizzaria",
    version: "1.0.0",
    description:
      "Documentação completa dos endpoints para Cardápio, Pedidos, Autenticação de Clientes e Funcionários (Admin/Staff).",
  },
  tags: [
    {
      name: "Auth",
      description: "Endpoints para autenticação e sessões (Login).",
    },
    {
      name: "Users",
      description: "Operações de gerenciamento de usuários (Staff).",
    },
    {
      name: "Categories",
      description: "Gerenciamento das categorias do cardápio.",
    },
    {
      name: "Products",
      description: "Gerenciamento dos itens disponíveis no cardápio.",
    },
    {
      name: "Orders",
      description: "Fluxo completo de pedidos, da criação ao acompanhamento.",
    },
  ],
  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Servidor de Desenvolvimento Local",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "Token JWT (JSON Web Token) obtido no endpoint POST /session. Necessário para Staff (ADMIN/STAFF).",
      },
    },
    schemas: {
      Role: {
        type: "string",
        enum: ["ADMIN", "STAFF"],
        example: "STAFF",
        description: "Nível de permissão do usuário.",
      },
      OrderStatus: {
        type: "string",
        enum: ["WAITING", "IN_PRODUCTION", "DONE", "DELIVERED", "CANCELED"],
        example: "WAITING",
        description: "Status atual do pedido.",
      },
      User: {
        type: "object",
        description: "Modelo de Usuário (Staff/Administrador).",
        properties: {
          id: { type: "string", example: "clx4b2d5r0000j4m47k5o4k5p" },
          name: { type: "string", example: "Admin da Pizzaria" },
          email: {
            type: "string",
            format: "email",
            example: "admin@pizzaria.com",
          },
          password: {
            type: "string",
            description: "Campo somente para criação/atualização.",
          },
          phone: { type: "string", example: "5511987654321" },
          role: { $ref: "#/components/schemas/Role" },
          createdAt: { type: "string", format: "date-time" },
        },
        required: ["id", "name", "email", "phone", "role"],
      },

      Category: {
        type: "object",
        properties: {
          id: { type: "string", example: "cat_01" },
          name: { type: "string", example: "Pizzas Salgadas" },
          createdAt: { type: "string", format: "date-time" },
        },
        required: ["id", "name"],
      },

      Product: {
        type: "object",
        description: "Item do cardápio.",
        properties: {
          id: { type: "string", example: "prod_001" },
          name: { type: "string", example: "Pizza Calabresa" },
          description: {
            type: "string",
            example: "Calabresa fatiada, cebola e azeitonas.",
          },
          price: {
            type: "integer",
            format: "int32",
            example: 4500,
            description: "Preço em centavos (ex: 45.00 BRL)",
          },
          banner: {
            type: "string",
            format: "url",
            example: "https://cdn.pizzaria.com/calabresa.jpg",
          },
          disabled: {
            type: "boolean",
            example: false,
            description: "Indica se o item está temporariamente indisponível.",
          },
          categoryId: { type: "string", example: "cat_01" },
          category: {
            $ref: "#/components/schemas/Category",
            description:
              "Detalhes da categoria (opcional em alguns endpoints).",
          },
          createdAt: { type: "string", format: "date-time" },
        },
        required: ["id", "name", "price", "categoryId"],
      },

      Order: {
        type: "object",
        description: "Um pedido completo.",
        properties: {
          id: { type: "string", example: "ord_20251214_001" },
          table: { type: "string", example: "Mesa 5" },
          status: { $ref: "#/components/schemas/OrderStatus" },
          draft: {
            type: "boolean",
            example: false,
            description: "Se TRUE, o pedido ainda está sendo montado.",
          },
          name: {
            type: "string",
            nullable: true,
            example: "Cliente no Balcão",
          },
          createdAt: { type: "string", format: "date-time" },
        },
        required: ["id", "table", "status", "draft"],
      },

      OrderItem: {
        type: "object",
        description: "Item dentro de um pedido.",
        properties: {
          id: { type: "string", example: "item_01" },
          quantity: { type: "integer", example: 1 },
          orderId: { type: "string" },
          productId: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
        required: ["id", "quantity", "orderId", "productId"],
      },

      AuthCredentials: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "admin@pizzaria.com",
          },
          password: { type: "string", format: "password", example: "senha123" },
        },
      },
      ErrorResponse: {
        type: "object",
        description: "Estrutura padrão para respostas de erro (AppError).",
        properties: {
          status: { type: "string", example: "error" },
          message: { type: "string", example: "Recurso não encontrado." },
        },
      },
    },
  },
};

const options: swaggerJSDoc.Options = {
  swaggerDefinition,
  apis: ["./src/routes.ts", "./src/controllers/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
