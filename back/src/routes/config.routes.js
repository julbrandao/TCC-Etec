import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

router.get("/config", async (req, res,) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Não autenticado" });
  }
 
  const { id, role } = req.session.user;

if (role === "ONG" || role === "ong") {
console.log('Deu erro2')
console.log(id)
console.log(role)


  try {
    let tabela, colunaId;

    if (role === "ong" || role === "ONG") {
      tabela = 'ONG';
      colunaId = '"id_ong"';
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
}if ( role === "Usuario" || role === "usuario") {
    return res.status(401).json({error: "Somente Ongs"})  
}
});
export default router;