import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

router.get("/sessao", async (req, res,) => {
  if (req.session.user) {
    return res.status(200).json({});
  }
});
export default router;