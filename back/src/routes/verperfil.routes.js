import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tabela = "ONG";
    const colunaId = "id_ong"; 

    // Buscar a ONG pelo ID
    const { data: dataONG, error } = await supabase
      .from(tabela)
      .select("*")
      .eq(colunaId, id)
      .single();

    if (error) {
      console.error("Erro ao buscar ONG:", error);
      return res.status(404).json({ error: "ONG não encontrada" });
    }

    // Contar seguidores dessa ONG
    const { count: totalSeguidores, error: errorCount } = await supabase
      .from("seguidores")
      .select("*", { count: "exact", head: true })
      .eq("ong_id", id);

    if (errorCount) {
      console.error("Erro ao contar seguidores:", errorCount);
      return res.status(500).json({ error: "Erro ao contar seguidores" });
    }

    // Atualizar a tabela ONG com o total de seguidores
    const { error: errorUpdate } = await supabase
      .from(tabela)
      .update({ seguidores: totalSeguidores ?? 0 })
      .eq(colunaId, id);

    if (errorUpdate) {
      console.error("Erro ao atualizar seguidores:", errorUpdate);
    }

    // Atualizar o objeto retornado também
    dataONG.seguidores = totalSeguidores ?? 0;

    res.json(dataONG);

  } catch (err) {
    console.error("Erro inesperado:", err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
});

export default router;
