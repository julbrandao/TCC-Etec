import express from "express";
import { atualizarOngController } from "../controllers/editOng.controllers.js";

const router = express.Router();

router.post("/atualizar", atualizarOngController);

export default router;
