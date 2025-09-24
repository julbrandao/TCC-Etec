import express from "express";
import { criarMidiaController, listarMidiasController, listarMidiasEspecificaController } from "../controllers/midia.controllers.js";
import { uploadMidia } from "../middlewares/uploadmidia.middleware.js";

const router = express.Router();

router.post("/midias", uploadMidia, criarMidiaController);
router.get("/midias", listarMidiasController);
router.get("/midias/:id", listarMidiasEspecificaController);

export default router;
