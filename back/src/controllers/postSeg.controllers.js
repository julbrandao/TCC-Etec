import { listarPosts } from "../services/postSeg.service.js";

export const listarPostsController = async (req, res) => {
  try {
    const posts = await listarPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
};