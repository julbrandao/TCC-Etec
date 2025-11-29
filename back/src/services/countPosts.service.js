
import supabase from "../config/supabase.js";

export const contarPostagensPorOng = async (id_ong) => {
  try {
    const { count, error } = await supabase
      .from("post")
      .select("*", { count: "exact", head: true })
      .eq("id_ong", id_ong);

    if (error) throw error;

    return count;
  } catch (err) {
    console.error("Erro ao contar postagens:", err);
    throw err;
  }
};
