import supabase from '../config/supabase.js';

export async function atualizarUsuario(id, body, files) {
  const updateData = {};

  // ----------------------------
  // Atualizar textos do perfil
  // ----------------------------
  updateData.Nome_user = body.txtnome;
  updateData.Email_user = body.txtemail;
  updateData.Senha_user = body.txtsenha;


  // ----------------------------
  // Função auxiliar para salvar arquivos no bucket
  // ----------------------------
  async function salvarArquivo(file, id_user) {
    const fileName = `User/perfil/${id_user}/${Date.now()}_${file.originalname}`;
    const { error } = await supabase.storage
      .from("imagens")
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from("imagens")
      .getPublicUrl(fileName);

      
    return publicUrl.publicUrl;
  }

  // ----------------------------
  // Atualizar imagens se existirem
  // ----------------------------
  if (files?.input_icone_perfil) {
    updateData.foto_perfil_usuario = await salvarArquivo(files.input_icone_perfil[0], "input_icone_perfil");
  }
  if (files?.input_imagem_fundo) {
    updateData.foto_header_usuario = await salvarArquivo(files.input_imagem_fundo[0], "input_imagem_fundo");
  }

  // ----------------------------
  // Atualizar no banco
  // ----------------------------
  const { error } = await supabase
    .from("Usuario")
    .update(updateData)
    .eq("id_user", id);

  if (error) throw error;

  return updateData;

}