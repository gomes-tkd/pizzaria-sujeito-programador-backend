import { type Request, type Response } from "express";
import RemoveItemOrderService from "../../services/order/remove-oder-item-service.js";

export default class RemoveItemController {
  async handle(req: Request, res: Response) {
    const itemId =
      (req.query.itemId as string) || (req.query.item_id as string);

    if (!itemId) {
      return res.status(400).json({ error: "ID do item é obrigatório." });
    }

    const removeItemService = new RemoveItemOrderService();

    try {
      const result = await removeItemService.execute({
        item_id: itemId,
      });

      return res.status(200).json(result);
    } catch (err) {
      if (err instanceof Error && err.message === "Item não encontrado") {
        return res.status(400).json({ error: err.message });
      }

      return res.status(500).json({ error: "Erro interno ao remover item." });
    }
  }
}
