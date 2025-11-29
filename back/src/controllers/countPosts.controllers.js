// controllers/countPosts.controller.js
import { contarPostagensPorOng } from "../services/countPosts.service.js";

export const countPostsController = async (req, res) => {
  try {
    const { id_ong } = req.params;

    if (!id_ong) {
      return res.status(400).json({ error: "id_ong é obrigatório" });
    }

    const quantidade = await contarPostagensPorOng(id_ong);
    return res.status(200).json({
      id_ong,
      quantidade_postagens: Number(quantidade) || 0,
    });
  } catch (err) {
    console.error("[countPostsController] erro:", err);
    return res.status(500).json({
      error: "Erro ao buscar quantidade de postagens",
      details: err.message || String(err),
    });
  }
};
