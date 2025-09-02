import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

router.get("/configUser", async (req, res,) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Não autenticadoC" });
  }


 
  const { id, role } = req.session.user;
console.log('Deu erro2')
console.log(id)
console.log(role)


  try {
    let tabela, colunaId;

    if (role === "usuario" || role === "Usuario") {
      tabela = 'Usuario';
      colunaId = '"id_user"';
    }

    const { data, error } = await supabase
      .from(tabela)
      .select("*")
      .eq(colunaId, id)   // agora pega a coluna certa
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar dados no Supabase" });
  }
});
export default router;