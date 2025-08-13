import express from 'express';
const router = express.Router();
import { validarUsuario } from '../services/authUsuario.service.js';


router.post('/login', async (req, res) => {
  const { Email_user, Senha_user } = req.body;

  if (!Email_user || !Senha_user ) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' });
  }

  const resultado = await validarUsuario(Email_user, Senha_user);

  if (!resultado.sucesso) {
    return res.status(401).json({ mensagem: resultado.mensagem });
  }

  // Aqui poderíamos gerar um token ou salvar sessão
  res.json({ mensagem: 'Login realizado com sucesso', usuario: resultado.usuario });
});


export default router;