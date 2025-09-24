import supabase  from "../config/supabase.js";

export const criarPost = async (id_ong, textPost, files) => {
  try {
    let fileUrls = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const filePath = `Ongs/postagens/${id_ong}/${Date.now()}-${file.originalname}`;

        const { error: uploadError } = await supabase.storage
          .from("imagens")
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
          });

        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage
          .from("imagens")
          .getPublicUrl(filePath);

        fileUrls.push(publicUrl.publicUrl);
      }
    }

    // salva no banco (imagens em array JSON)
    const { data, error: dbError } = await supabase
      .from("post")
      .insert([
        {
          
          conteudo_post:textPost,
          imagem_url: fileUrls, // array de URLs
          id_ong: id_ong,
        },
      ])
      .select()
      .single();

    if (dbError) throw dbError;

    return data;
  } catch (err) {
    console.error("Erro no service criarPost:", err);
    throw err;
  }
};
export const listarPosts = async (id) => {
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
    .eq("id_ong", id)
    .order("data_hora", { ascending: false });

  if (error) throw error;

  return data;
};