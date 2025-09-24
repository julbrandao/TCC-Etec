import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

router.get("/check", async (req, res) => {
  const { seguidor_id, ong_id } = req.query;
  console.log("Check seguindo:", { seguidor_id, ong_id });

  if (!seguidor_id || !ong_id) {
    return res.status(400).json({ error: "IDs ausentes ou não válidos" });
  }

  try {
    const { data: jaSegue, error } = await supabase
      .from("seguidores")
      .select("*")
      .eq("seguidor_id", Number(seguidor_id))
      .eq("ong_id", Number(ong_id))
      .limit(1) // evita erro se tiver mais de um
      .maybeSingle();

    if (error) {
      console.error("Erro Supabase:", error);
      return res.status(500).json({ error: "Erro ao verificar seguidores", details: error });
    }

    return res.status(200).json({
      seguindo: !!jaSegue,
      label: jaSegue ? "Deixar de seguir" : "Seguir"
    });
  } catch (err) {
    console.error("Erro rota /check:", err);
    res.status(500).json({ error: "Erro no servidor", details: err });
  }
});


router.post("/", async (req, res) => {
  const { seguidor_id, ong_id } = req.body;

  if (seguidor_id === ong_id) {
    return res.status(400).json({ error: "Não pode seguir a si mesmo" });
  }

  if (!seguidor_id || !ong_id){
    return res.status(400).json({error: "IDs ausentes ou não válidos"})
  }

  try {
    // Verificando se há registro
    const { data: jaSegue, error: errorCheck } = await supabase
      .from("seguidores")
      .select("*")
      .eq("seguidor_id", seguidor_id)
      .eq("ong_id", ong_id)
      .maybeSingle();

      if(errorCheck){
        return res.status(500).json({error: "Erro ao verificar seguidores 1", details: errorCheck})
      }

      if (jaSegue !== null) {
         // Deletar
        const { error: errorDelete } = await supabase
        .from("seguidores")
        .delete()
        .eq("seguidor_id", seguidor_id)
        .eq("ong_id", ong_id);

        if (errorDelete) {
          return res.status(500).json({ error: "Erro ao deixar de seguir", details: errorDelete });
        }

      return res.status(200).json({ message: "Deixou de seguir", seguindo: false, reload: true });
}

// Inserir
    const { error: errorInsert } = await supabase
    .from("seguidores")
    .insert({ seguidor_id, ong_id });

    if (errorInsert) {
    return res.status(500).json({ error: "Erro ao seguir", details: errorInsert });
  }

  return res.status(200).json({ message: "Seguiu com sucesso", seguindo: true, reload: true });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro no servidor" });
    }
});

export default router;
