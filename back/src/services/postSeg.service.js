import supabase  from "../config/supabase.js";
export const listarPosts = async () => {
  let id_ong = "30";
  const { data, error } = await supabase
    .from("post")
  .select(`
      id_post,
      conteudo_post,
      imagem_url,
      data_hora,
      ONG (
        id_ong,
        nome_ong
      )
`)
    .eq("id_ong", id_ong)
    .order("data_hora", { ascending: false });

  if (error) throw error;

  return data;
};