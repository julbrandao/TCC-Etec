import supabase from '../config/supabase.js';
 console.log('Services Body recebido:');
 

export const buscarOng = async (nome_ong,cnpj,email_ong,n_localizacao,telefone) => {
  return await supabase
    .from('ONG') // nome da tabela no Supabase
    .select('*')
    .or(`nome_ong.eq.${nome_ong},cnpj.eq.${cnpj},email_ong.eq.${email_ong},n_localizacao.eq.${n_localizacao},telefone.eq.${telefone}`)
    .single()
};


export const insertOng = async ({ nome_ong, cnpj,email_ong,rua,cidade,n_localizacao,estado,complemento,telefone,nome_representante,cpf_representante,
    objetivo,categoria_ong,descrição,senha_ong,razao_social,bairro,classificacao }) => {
  return await supabase.from('ONG').insert({ nome_ong, cnpj,email_ong,rua,cidade,n_localizacao,estado,complemento,telefone,nome_representante,cpf_representante,
    objetivo,categoria_ong,descrição,senha_ong,razao_social,bairro,classificacao });
};