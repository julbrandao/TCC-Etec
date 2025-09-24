import { atualizarOng } from "../services/editOng.service.js";

export async function atualizarOngController(req, res) {
  if (!req.session.user || req.session.user.role !== "ONG") {
    return res.status(401).json({ error: "Acesso negado" });
  }
    console.log("BODY recebido:", req.body);
  console.log("FILES recebidos:", req.files);

  try {
    const { id } = req.session.user;

    const data = await atualizarOng(id, req.body, req.files);
    res.json({ message: "Dados da ONG atualizados!", ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar ONG" });
  }
}