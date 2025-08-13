export const verificarLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }
  next();
};
