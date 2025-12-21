import { PrismaClient, Role, OrderStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const pizzasTradicionais = [
  {
    name: "Mussarela",
    description: "Queijo mussarela, orégano e azeitonas.",
    price: 4000,
  },
  {
    name: "Calabresa",
    description: "Mussarela, calabresa fatiada e cebola.",
    price: 4200,
  },
  {
    name: "Marguerita",
    description: "Mussarela, rodelas de tomate e manjericão fresco.",
    price: 4200,
  },
  {
    name: "Portuguesa",
    description: "Mussarela, presunto, ovos, cebola e ervilha.",
    price: 4500,
  },
  {
    name: "Frango com Catupiry",
    description: "Frango desfiado com cobertura de Catupiry original.",
    price: 4600,
  },
  {
    name: "Napolitana",
    description: "Mussarela, rodelas de tomate e parmesão ralado.",
    price: 4300,
  },
  {
    name: "Quatro Queijos",
    description: "Mussarela, provolone, parmesão e gorgonzola.",
    price: 5000,
  },
  {
    name: "Atum",
    description: "Atum sólido, cebola e mussarela.",
    price: 4800,
  },
  {
    name: "Bauru",
    description: "Mussarela, presunto e rodelas de tomate.",
    price: 4100,
  },
  {
    name: "Milho com Bacon",
    description: "Mussarela, milho verde e bacon crocante.",
    price: 4400,
  },
];

const pizzasPremium = [
  {
    name: "Pepperoni",
    description: "Mussarela e fatias de pepperoni importado.",
    price: 5500,
  },
  {
    name: "Lombo ao Creme",
    description: "Lombo canadense, champignon e catupiry.",
    price: 5800,
  },
  {
    name: "Camarão Especial",
    description: "Camarão refogado, cream cheese e cebolinha.",
    price: 8990,
  },
  {
    name: "Carne Seca",
    description: "Carne seca desfiada, catupiry e pimenta biquinho.",
    price: 6200,
  },
  {
    name: "Rúcula com Tomate Seco",
    description: "Mussarela de búfala, rúcula fresca e tomate seco.",
    price: 6000,
  },
  {
    name: "Picanha ao Alho",
    description: "Tiras de picanha, mussarela e alho frito.",
    price: 7500,
  },
  {
    name: "Strogonoff de Carne",
    description: "Strogonoff de carne, mussarela e batata palha.",
    price: 6500,
  },
  {
    name: "Palmito Especial",
    description: "Palmito pupunha, mussarela e orégano.",
    price: 5200,
  },
  {
    name: "Champignon com Bacon",
    description: "Mussarela, champignon fatiado e bacon.",
    price: 5400,
  },
];

const pizzasDoces = [
  {
    name: "Brigadeiro",
    description: "Chocolate ao leite e granulado.",
    price: 4500,
  },
  {
    name: "Prestígio",
    description: "Chocolate ao leite e coco ralado.",
    price: 4600,
  },
  {
    name: "Banana com Canela",
    description: "Banana fatiada, leite condensado e canela.",
    price: 4200,
  },
  {
    name: "Romeu e Julieta",
    description: "Goiabada cremosa e queijo minas.",
    price: 4400,
  },
];

const bebidas = [
  { name: "Coca-Cola Lata", description: "350ml", price: 600 },
  { name: "Coca-Cola 600ml", description: "Garrafa 600ml", price: 900 },
  { name: "Coca-Cola 2L", description: "Garrafa 2 Litros", price: 1400 },
  { name: "Coca-Cola Zero Lata", description: "350ml sem açúcar", price: 600 },
  { name: "Guaraná Antarctica Lata", description: "350ml", price: 600 },
  {
    name: "Guaraná Antarctica 2L",
    description: "Garrafa 2 Litros",
    price: 1300,
  },
  { name: "Fanta Laranja Lata", description: "350ml", price: 600 },
  { name: "Fanta Uva Lata", description: "350ml", price: 600 },
  { name: "Sprite Lata", description: "350ml", price: 600 },
  { name: "Schweppes Citrus", description: "Lata 350ml", price: 700 },
  { name: "Heineken Long Neck", description: "330ml", price: 1200 },
  { name: "Stella Artois Long Neck", description: "330ml", price: 1100 },
  { name: "Budweiser Long Neck", description: "330ml", price: 1000 },
  { name: "Eisenbahn Pilsen", description: "Long Neck 355ml", price: 1100 },
  { name: "Corona Extra", description: "Long Neck 330ml", price: 1400 },
  { name: "Água sem Gás", description: "Garrafa 500ml", price: 400 },
  { name: "Água com Gás", description: "Garrafa 500ml", price: 450 },
  { name: "Suco de Laranja Natural", description: "Copo 500ml", price: 1000 },
  {
    name: "Suco de Abacaxi c/ Hortelã",
    description: "Copo 500ml",
    price: 1100,
  },
  { name: "Suco de Uva Integral", description: "Garrafa 300ml", price: 900 },
  { name: "Chá Gelado Limão", description: "Garrafa 1.5L", price: 1200 },
  { name: "H2OH Limão", description: "Garrafa 500ml", price: 700 },
];

async function main() {
  console.log("🔥 Iniciando Seed Adaptado...");

  const passwordHash = await hash("123456", 8);

  await prisma.user.upsert({
    where: { email: "admin@pizzaria.com" },
    update: {},
    create: {
      name: "Dono da Pizzaria",
      email: "admin@pizzaria.com",
      password: passwordHash,
      phone: "11999990000",
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "garcom@pizzaria.com" },
    update: {},
    create: {
      name: "João Garçom",
      email: "garcom@pizzaria.com",
      password: passwordHash,
      phone: "11999991111",
      role: Role.STAFF,
    },
  });
  console.log("👥 Usuários verificados.");

  const catTradicional = await prisma.category.upsert({
    where: { name: "Pizzas Tradicionais" },
    update: {},
    create: { name: "Pizzas Tradicionais" },
  });
  const catPremium = await prisma.category.upsert({
    where: { name: "Pizzas Premium" },
    update: {},
    create: { name: "Pizzas Premium" },
  });
  const catDoce = await prisma.category.upsert({
    where: { name: "Pizzas Doces" },
    update: {},
    create: { name: "Pizzas Doces" },
  });
  const catBebidas = await prisma.category.upsert({
    where: { name: "Bebidas" },
    update: {},
    create: { name: "Bebidas" },
  });
  console.log("📂 Categorias verificadas.");

  const createProductList = async (list: any[], categoryId: string) => {
    for (const item of list) {
      const exists = await prisma.product.findFirst({
        where: { name: item.name },
      });
      if (!exists) {
        await prisma.product.create({
          data: {
            name: item.name,
            description: item.description,
            price: item.price,
            banner: "default_pizza.png",
            categoryId: categoryId,
          },
        });
      }
    }
  };

  await createProductList(pizzasTradicionais, catTradicional.id);
  await createProductList(pizzasPremium, catPremium.id);
  await createProductList(pizzasDoces, catDoce.id);
  await createProductList(bebidas, catBebidas.id);
  console.log("🍕 Cardápio Carregado.");

  const allProducts = await prisma.product.findMany();

  if (allProducts.length === 0) {
    throw new Error(
      "Erro: Produtos não foram criados. Abortando seed de pedidos."
    );
  }

  const randomProduct = () =>
    allProducts[Math.floor(Math.random() * allProducts.length)];
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const tables = [1, 2, 3, 4, 5, 6, 10, 11, 12, 15, 20, 22];

  console.log("📝 Gerando pedidos aleatórios...");

  const ordersToCreate = [];

  for (let i = 0; i < 8; i++) {
    const table = tables[i];
    const status =
      Math.random() > 0.5 ? OrderStatus.WAITING : OrderStatus.IN_PRODUCTION;

    const itemsCount = randomInt(1, 4);
    const orderItemsList = [];

    for (let j = 0; j < itemsCount; j++) {
      const prod = randomProduct();
      orderItemsList.push({
        amount: randomInt(1, 3),
        productId: prod.id,
      });
    }

    ordersToCreate.push(
      prisma.order.create({
        data: {
          table: table,
          status: status,
          draft: false,
          name: `Cliente Mesa ${table}`,
          items: { create: orderItemsList },
        },
      })
    );
  }

  for (let i = 0; i < 15; i++) {
    const table = tables[randomInt(0, tables.length - 1)];
    const itemsCount = randomInt(1, 6);
    const orderItemsList = [];

    for (let j = 0; j < itemsCount; j++) {
      const prod = randomProduct();
      orderItemsList.push({
        amount: randomInt(1, 2),
        productId: prod.id,
      });
    }

    ordersToCreate.push(
      prisma.order.create({
        data: {
          table: table,
          status: OrderStatus.DONE,
          draft: false,
          name: `Cliente Antigo ${i + 1}`,
          items: { create: orderItemsList },
        },
      })
    );
  }

  await Promise.all(ordersToCreate);

  console.log(`✅ ${ordersToCreate.length} pedidos criados com sucesso!`);
  console.log("✅ SEED FINALIZADO!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
