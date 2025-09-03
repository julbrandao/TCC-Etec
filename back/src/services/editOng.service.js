import supabase from '../config/supabase.js';

export async function atualizarOng(id, dados) {
  const { data, error } = await supabase
    .from("ONG")
    .update({
      nome_ong: dados.nome_ong,
      cnpj: dados.cnpj,email_ong: dados.email_ong, 
      rua: dados.rua, cidade: dados.cidade, n_localizacao: dados.n_localizacao, 
      estado: dados.estado
    ,complemento: dados.complemento, telefone: dados.telefone, 
    nome_representante: dados.nome_representante, 
    cpf_representante: dados.cpf_representante,
    objetivo: dados.objetivo, categoria_ong: dados.categoria_ong, descrição: dados.descrição, senha_ong: dados.senha_ong, 
    razao_social: dados.razao_social, bairro: dados.bairro,
     classificacao: dados.classificacao, AdF: dados.AdF 
    })
    .eq("id_ong", id)
    .select();

  if (error) throw error;
  return data;
}