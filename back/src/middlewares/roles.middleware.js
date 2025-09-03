export function requireUsuario(req, res, next) {
  if (req.session.user?.role !== "Usuario") {
    return res.status(403).send("Acesso restrito para Usuários!");
  }
  next();
}

export function requireOng(req, res, next) {
  if (req.session.user?.role !== "ONG") {
    return res.status(403).send("Acesso restrito para ONGs!");
  }
  next();
}

