import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from "express-session";

import usuarioRoutes from './routes/usuario.routes.js';
import ongRoutes from './routes/ong.routes.js';
import verPerfilOng from './routes/verperfil.routes.js';
import authRoutes from './routes/auth.routes.js';
import configRoutes from './routes/config.routes.js';
import configUserRoutes from './routes/configUser.routes.js';
import editOngRoutes from './routes/editOng.routes.js';
import editUserRoutes from './routes/editUser.routes.js';
import sessaoRoutes from './routes/sessao.routes.js';
import seguirRoutes from './routes/seguir.routes.js';
import midiasRoutes from './routes/midias.routes.js';
import postRoutes from './routes/post.routes.js';
import postExRoutes from './routes/postEX.routes.js';
import postSegRoutes from './routes/postSeg.routes.js';
import postFeedRoutes from './routes/feed.routes.js';
import colecaoRoutes from './routes/colecao.routes.js';
import colecaoOngRoutes from './routes/colecao_ong.routes.js';
import buscarOng from './routes/buscarOng.routes.js';
import postCurtir from './routes/postCurtir.routes.js';
import postCurtirO from './routes/postCurtirO.routes.js';
import sugestoesRoutes from "./routes/sugestoes.routes.js";
import ongfiltro from './routes/ongsfiltro.routes.js';
import countPostsRoutes from "./routes/countPosts.routes.js";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../../public')));

app.use(
  session({
    secret: "segredo-super-seguro",
    resave: false,
    saveUninitialized: false,
    cookie: {
    httpOnly: true,
    secure: false,   // true apenas em produção com HTTPS
    sameSite: "lax",
    path: "/"
  }
  })
);

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao encerrar sessão:", err);
      return res.status(500).json({ error: "Erro ao encerrar sessão" });
    }

    res.clearCookie("connect.sid", { path: "/" }); // mesmo path do session
    return res.status(200).json({ message: "Logout realizado com sucesso" });
  });
});


// Rotas da API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ongs', ongRoutes);
app.use('/api/ongs', ongfiltro);

app.use('/api/perfilOng/', verPerfilOng);
app.use('/api/', authRoutes);
app.use('/api', configRoutes);
app.use('/api', configUserRoutes);
app.use('/api/ong/', editOngRoutes);
app.use('/api/user/', editUserRoutes);
app.use('/api/seguir', seguirRoutes);
app.use('/api', sessaoRoutes);
app.use('/api/', postRoutes);
app.use('/api/posts/', postExRoutes);
app.use('/api/posts/update', postExRoutes);
app.use('/api/', midiasRoutes);
app.use('/api/', postSegRoutes);
app.use('/api/', postFeedRoutes);
app.use('/api/', colecaoRoutes);
app.use('/api/', colecaoOngRoutes);
app.use('/api/', buscarOng);
app.use('/api/post/', postCurtir);
app.use('/api/post/', postCurtirO);
app.use("/api/sugestoes", sugestoesRoutes);
app.use("/api/", countPostsRoutes);

app.get("/public", (req, res) => {
  res.send("Qualquer um pode ver isso");
});
app.get("/index.html", (req, res) => {
  res.send(`Bem-vindo, ${req.session.user.email}`);
});
app.get("/ong/feed",(req, res) => {
  res.send("Área restrita para ONGs");
});

app.get("/sessao", (req, res) => {
  if (req.session.user) {
    res.json({
      logado: true,
      usuario: req.session.user
    });
  } else {
    res.json({
      logado: false,
      mensagem: "Nenhum usuário autenticado"
    });
  }
});

export default app;



// Importações:

// npm init -y 
// npm install express sequelize mysql2 ejs ejs-layouts	 
// npm install --save-dev nodemon
// npm install express
// npm install express ejs 
// npm install @supabase/supabase-js
// npm i postgres
// npm install dotenv
// npm install bcrypt -> Abaixei para testar uma coisa, mas nao consegui e não to usando por enquanto
// npm install express dotenv @supabase/supabase-js  -> se alguma estiver dando errado
// npm i memorystorage -> Vinicius fez o storage com ele, mas nao achei informações o suficiente para min fazer
// npm install express-session
// npm install cookie-parser
// npm install multer



 