import { atualizarOng } from "../services/editOng.service.js";

export async function atualizarOngController(req, res) {
  if (!req.session.user || req.session.user.role !== "ONG") {
    return res.status(401).json({ error: "Acesso negado" });
  }

  try {
    const { id } = req.session.user;
    const dados = req.body;

    const data = await atualizarOng(id, dados);
    res.json({ message: "Dados da ONG atualizados!", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar ONG" });
  }
}