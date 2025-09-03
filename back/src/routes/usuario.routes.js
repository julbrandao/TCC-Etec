import express from 'express';
import { createUser } from '../controllers/usuario.controllers.js';
 console.log(' router Body recebido:');
const router = express.Router();

router.post('/', createUser); // POST /api/users

export default router;