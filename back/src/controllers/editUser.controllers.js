import { atualizarUsuario } from "../services/editUsuario.service.js";

export async function atualizarUsuarioController(req, res) {
  if (!req.session.user || req.session.user.role !== "Usuario") {
    return res.status(401).json({ error: "Acesso negado" });
  }

  try {
    const { id } = req.session.user;
    const dados = req.body;

    const data = await atualizarUsuario(id, dados);
    res.json({ message: "Dados do Usuário atualizados!", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar Usuário" });
  }
}