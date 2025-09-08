import express from "express";
import { atualizarUsuarioController } from "../controllers/editUser.controllers.js";

const router = express.Router();

router.post("/atualizar", atualizarUsuarioController);

export default router;