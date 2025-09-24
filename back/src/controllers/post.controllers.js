import { criarPost, listarPosts } from "../services/post.service.js";

export const criarPostController = async (req, res) => {
  try {
    const { textPost } = req.body;
    const files = req.files; // agora é um array de arquivos

    if (!req.session.user || req.session.user.role !== "ONG") {
      return res.status(403).json({ error: "Apenas ONG pode postar" });
    }

    if (!textPost) {
      return res.status(400).json({ error: "Escreva um conteudo pelo menos" });
    }

    const post = await criarPost(req.session.user.id, textPost, files);

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar postagem" });
  }
};

export const listarPostsController = async (req, res) => {
  try {
    const posts = await listarPosts(req.session.user.id);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
};