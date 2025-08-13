import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import usuarioRoutes from './routes/usuario.routes.js';
import ongRoutes from './routes/ong.routes.js';
import lOngRoutes from './routes/authOng.routes.js';
import lUserOngRoutes from './routes/authUsuario.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../../public')));

// Rotas da API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ongs', ongRoutes);
app.use('/api/usuarios', lUserOngRoutes);
app.use('/api/ongs', lOngRoutes);

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
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



//add logica da page de cadastro, e page base para add a navbar.
//mover arquivos de cadastro e login para a pasta que desejar