

import express from 'express';
const router = express.Router();

import { validarOng } from '../services/authOng.service.js';


router.post('/login', async (req, res) => {
  const { cnpj, email_ong,senha_ong } = req.body;

  if (!email_ong || !senha_ong || !cnpj) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos' });
  }

  const resultado = await validarOng(cnpj, email_ong,senha_ong);

  if (!resultado.sucesso) {
    return res.status(401).json({ mensagem: resultado.mensagem });
  }

  // Aqui poderíamos gerar um token ou salvar sessão
  res.json({ mensagem: 'Login realizado com sucesso', ong: resultado.ong });
});

export default router;