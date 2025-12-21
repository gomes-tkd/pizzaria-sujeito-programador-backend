import prisma from "../../prisma/index.js";

interface RemoveItemRequest {
  item_id: string;
}

export default class RemoveOrderItemService {
  async execute({ item_id }: RemoveItemRequest) {
    if (!item_id) {
      throw new Error("ID do item inválido.");
    }

    if (!prisma.item) {
      console.error(
        "ERRO GRAVE: 'prisma.item' não existe. Models carregados:",
        Object.keys(prisma)
      );
      throw new Error(
        "Erro Interno: O Prisma Client não foi atualizado com a tabela Item."
      );
    }

    try {
      const itemExists = await prisma.item.findUnique({
        where: {
          id: item_id,
        },
      });

      if (!itemExists) {
        throw new Error("Item não encontrado");
      }

      await prisma.item.delete({
        where: {
          id: item_id,
        },
      });

      return { message: "Item removido com sucesso" };
    } catch (err) {
      if (err instanceof Error && err.message === "Item não encontrado") {
        throw err;
      }

      console.error("Erro ao deletar item:", err);
      throw new Error("Erro interno ao remover item do pedido");
    }
  }
}
