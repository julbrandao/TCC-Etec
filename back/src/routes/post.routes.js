import express from "express";
import { criarPostController , listarPostsController } from "../controllers/post.controllers.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post("/posts", upload, criarPostController);

router.get("/perfil", listarPostsController);



export default router;