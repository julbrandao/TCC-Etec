import supabase from "../config/supabase.js";
import { extname } from "path";

/**
 * Criar uma nova mídia
 */
export const criarMidia = async (id_ong, descricao, file) => {
  try {
    if (!file) throw new Error("Nenhum arquivo recebido");

    // Determinar extensão do arquivo
    const ext = file.originalname
      ? extname(file.originalname)
      : `.${file.mimetype.split("/")[1]}`;

    // Nome único com timestamp
    const filePath = `Ongs/midias/${id_ong}/${Date.now()}${ext}`;

    console.log("Salvando no Supabase:", filePath);

    const { error: uploadError } = await supabase.storage
      .from("imagens")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false, // evita sobrescrever
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("imagens")
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    const { data, error: dbError } = await supabase
      .from("midias")
      .insert([
        {
          imagem_midia: publicUrl,
          descricao_midia: descricao,
          data_midia: new Date(),
          id_ong: id_ong,
        },
      ])
      .select()
      .single();

    if (dbError) throw dbError;

    return data;
  } catch (err) {
    console.error("Erro no service criarMidia:", err);
    throw err;
  }
};

/**
 * Listar mídias
 */
export const listarMidias = async () => {
  const { data, error } = await supabase
    .from("midias")
    .select(`
      id_midia,
      imagem_midia,
      descricao_midia,
      data_midia,
      ONG (id_ong, nome_ong)
    `)
    .order("data_midia", { ascending: false });

  if (error) throw error;

  return data;
};

export const listarMidiasEspecifica = async (id_ong) => {
  // garante que seja número
  const id = parseInt(id_ong);
  if (isNaN(id)) return [];

  try {
    const { data, error } = await supabase
      .from("midias")
      .select(`
        id_midia,
        imagem_midia,
        descricao_midia,
        data_midia,
        ONG!inner (id_ong, nome_ong)
      `)
      .eq("ONG.id_ong", id)
      .order("data_midia", { ascending: false });

    if (error) {
      console.error("Erro Supabase:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("Erro inesperado ao listar mídias:", err);
    return [];
  }
};


