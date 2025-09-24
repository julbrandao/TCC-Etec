import { criarMidia, listarMidias, listarMidiasEspecifica } from "../services/midia.service.js";

export const criarMidiaController = async (req, res) => {
  console.log("Arquivo recebido:", req.file); // Para conferir se está chegando
  const { txtlegenda } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: "Nenhum arquivo recebido" });

  const midia = await criarMidia(req.session.user.id, txtlegenda, file);
  res.json({ ok: true, midia });
};


export const listarMidiasController = async (req, res) => {
  try {
    const midias = await listarMidias();
    res.json(midias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar mídias" });
  }
};

export const listarMidiasEspecificaController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

    const midias = await listarMidiasEspecifica(id);

    res.json(midias || []);
  } catch (err) {
    console.error("Erro ao listar mídias:", err);
    res.status(500).json({ error: "Erro interno ao listar mídias", detalhes: err.message });
  }
};



