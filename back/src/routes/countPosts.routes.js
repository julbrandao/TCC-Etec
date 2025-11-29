
import express from "express";
import { countPostsController } from "../controllers/countPosts.controllers.js";

const router = express.Router();

router.get("/postagens/quantidade/:id_ong", countPostsController);

export default router;
