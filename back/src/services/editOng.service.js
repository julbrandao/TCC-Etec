import supabase from '../config/supabase.js';

export async function atualizarOng(id, body, files) {
  const updateData = {};

  // ----------------------------
  // Atualizar textos do perfil
  // ----------------------------
  updateData.nome_ong = body.txtnome;
  updateData.cnpj = body.txtcnpj;
  updateData.email_ong = body.txtemail;
  updateData.rua = body.txtrua;
  updateData.cidade = body.cidade;
  updateData.n_localizacao = body.txtnumlocal;
  updateData.estado = body.txtestado;
  updateData.complemento = body.txtcomplemento;
  updateData.telefone = body.txttelefone;
  updateData.nome_representante = body.txtreplegal;
  updateData.cpf_representante = body.txtcpf;
  updateData.objetivo = body.txtobj;  
  updateData.categoria_ong = body.categoria;
  updateData.descrição = body.txtdesc;
  updateData.senha_ong = body.txtsenha;
  updateData.razao_social = body.txtrazao;
  updateData.bairro = body.txtbairro;
  updateData.classificacao = body.Classificacao;
  updateData.AdF = body.txtAdF;


  // ----------------------------
  // Função auxiliar para salvar arquivos no bucket
  // ----------------------------
  async function salvarArquivo(file, id_ong) {
    const fileName = `Ongs/perfil/${id_ong}/${Date.now()}_${file.originalname}`;
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
    updateData.foto_perfil_ong = await salvarArquivo(files.input_icone_perfil[0], "input_icone_perfil");
  }
  if (files?.input_imagem_fundo) {
    updateData.foto_header_ong = await salvarArquivo(files.input_imagem_fundo[0], "input_imagem_fundo");
  }

  // ----------------------------
  // Atualizar no banco
  // ----------------------------
  const { error } = await supabase
    .from("ONG")
    .update(updateData)
    .eq("id_ong", id);

  if (error) throw error;

  return updateData;

}