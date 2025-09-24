import express from "express";
import { atualizarOngController } from "../controllers/editOng.controllers.js";
import multer from "multer";
const router = express.Router();

const upload = multer();
router.put("/atualizar", upload.fields([
    { name: "input_icone_perfil", maxCount: 1 },
    { name: "input_imagem_fundo", maxCount: 1 }
  ]),atualizarOngController);

export default router;
