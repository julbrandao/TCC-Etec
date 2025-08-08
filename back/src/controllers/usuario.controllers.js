
import { insertUser, buscarUsuarioPorEmail,buscarUsuarioPorNome  } from '../services/usuario.service.js';
export const createUser = async (req, res) => {
const { Nome_user,Senha_user,Email_user } = req.body;
const { data: usuarioExistente, error: erroBusca } = await buscarUsuarioPorEmail(Email_user);
const { data: usuarioExistente2, error: erroBusca2 } = await buscarUsuarioPorNome(Nome_user);
 
if (!Nome_user || !Senha_user || !Email_user ) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
}
 

if (usuarioExistente) {
    return res.status(409).json({ error: 'E-mail, já existente' }); 
}
if (usuarioExistente2) {
    return res.status(409).json({ error: 'Nome de usuario, já existente' }); 
}


  try {
  const { data, error } = await insertUser({ Nome_user, Senha_user, Email_user});
  if (error) {
      console.error('Erro Supabase:', error.message, Nome_user,Senha_user,Email_user);
      return res.status(510).json({ error: 'Erro ao inserir no banco de dados.' });
    }

    res.status(201).json({ message: 'Usuário criado com sucesso!', data });
  } catch (err) {
    console.error('Erro inesperado:', err.message);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};