
import { insertOng,buscarOng
  } from '../services/ong.service.js';
export const createUser = async (req, res) => {

const { nome_ong, cnpj,email_ong,rua,cidade,n_localizacao,estado,complemento,telefone,nome_representante,cpf_representante,
    objetivo,categoria_ong,descrição,senha_ong,razao_social,bairro,classificacao } = req.body;

const { data: ongExistente, error: ongLegal } = await buscarOng(nome_ong,cnpj,email_ong,n_localizacao,telefone);


if (ongExistente) {
    return res.status(409).json({ error: 'Ong, já cadastrada' }); 
}

if (!nome_ong || 
  !cnpj || !email_ong ||
  !rua ||
  !cidade ||
  !n_localizacao ||
  !estado || !complemento ||
  !telefone ||
  !nome_representante ||
  !cpf_representante ||
    !objetivo || !categoria_ong ||
    !descrição || !senha_ong ||
    !razao_social ||
    !bairro ||
    !classificacao) {
    return res.status(400).json({ error: 'Preencha todos os campos' });
}

if (ongLegal){
  try {
  const { data, error } = await insertOng({ nome_ong, cnpj,email_ong,rua,cidade,n_localizacao,estado,complemento,telefone,nome_representante,cpf_representante,
    objetivo,categoria_ong,descrição,senha_ong,razao_social,bairro,classificacao});
  if (error) {
      console.error('Erro Supabase:', error.message);
      return res.status(510).json({ error: 'Erro ao inserir no banco de dados.' });
    }

    res.status(201).json({ message: 'Usuário criado com sucesso!', data });
  } catch (err) {
    console.error('Erro inesperado:', err.message);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}
};