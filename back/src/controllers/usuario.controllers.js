
import { insertUser, buscarUsuario  } from '../services/usuario.service.js';
export const createUser = async (req, res) => {
const { Nome_user,Senha_user,Email_user } = req.body;

const {data: usuarioExistente, error: usuarioCriar } = await buscarUsuario(Nome_user,Email_user);

if(usuarioExistente){
      return res.status(409).json({ message: 'Usuario' }); 
}
 
if (!Nome_user || !Senha_user || !Email_user ) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.'});
}
 

if(usuarioCriar){
  try {
    
  const { data, error } = await insertUser({ Nome_user, Senha_user, Email_user});
  res.status(201).json({ message: 'Usuário criado com sucesso!', data });
  if (error) {
      
      return res.status(510).json({ error: 'Erro ao inserir no banco de dados.' });
    }
  if (data) {
    res.status(201).json({ message: 'Usuário criado com sucesso!', data });
  }

    
  } catch (err) {
    console.error('Erro inesperado:', err.message);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}
};