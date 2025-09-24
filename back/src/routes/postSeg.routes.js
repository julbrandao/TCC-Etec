import express from "express";
import { listarPostsController } from "../controllers/postSeg.controllers.js";

const router = express.Router();

router.get("/perfilSeg", listarPostsController);

export default router;