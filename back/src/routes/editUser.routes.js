import express from "express";
import { atualizarUsuarioController } from "../controllers/editUser.controllers.js";
import multer from "multer";
const upload = multer();

const router = express.Router();

router.put("/atualizar", upload.fields([
    { name: "input_icone_perfil", maxCount: 1 },
    { name: "input_imagem_fundo", maxCount: 1 }
  ]),atualizarUsuarioController);

export default router;