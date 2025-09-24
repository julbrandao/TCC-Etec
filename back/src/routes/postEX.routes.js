import express from "express";
import multer from "multer";
import  supabase from "../config/supabase.js";
const router = express.Router();

// ---------------------
// 1. Buscar um post pelo ID
// ---------------------
router.get("/:id_post", async (req, res) => {
  const { id_post } = req.params;

  try {



    
    const { data, error } = await supabase
      .from("post")
      .select("id_post, conteudo_post, imagem_url, ONG(nome_ong)")
      .eq("id_post", id_post)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar post" });
  }
});

// ---------------------
// 2. Atualizar post
// ---------------------
const upload = multer({ storage: multer.memoryStorage() });

router.put(
  "/:id_post",
  upload.array("novasMidias", 4),
  async (req, res) => {
    try {
      const { data: postt, error } = await supabase
    .from("post")
    .select(`
      ONG (
        id_ong,
      )
    `)
    .single()
      const { id_post } = req.params;
      const { conteudo_post, imagensExistentes } = req.body;
      console.log(postt)
       let id_ong = postt 
      // garante que imagensExistentes seja array
      let imagensAtuais = [];
      if (imagensExistentes) {
        imagensAtuais = JSON.parse(imagensExistentes); // frontend manda JSON.stringfy([...])
      }

      // processa novos arquivos enviados
      const novasUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
        const filePath = `Ongs/postagens/${id_ong}/${Date.now()}-${file.originalname}`;
          const { error: uploadError } = await supabase.storage
            .from("imagens")
            .upload(filePath, file.buffer, {
              contentType: file.mimetype,
              upsert: false,
            });

          if (uploadError) {
            console.error(uploadError);
            return res.status(500).json({ error: "Erro ao enviar arquivo" });
          }

          const { data: publicUrlData } = supabase.storage
            .from("imagens")
            .getPublicUrl(filePath);

          novasUrls.push(publicUrlData.publicUrl);
        }
      }

      // junta as imagens que sobraram com as novas
      const imagensFinais = [...imagensAtuais, ...novasUrls];

      // atualiza no banco
      const { error: updateError } = await supabase
        .from("post")
        .update({
          conteudo_post,
          imagem_url: imagensFinais,
        })
        .eq("id_post", id_post);

      if (updateError) {
        console.error(updateError);
        return res.status(500).json({ error: "Erro ao atualizar post" });
      }

      return res.json({
        message: "Post atualizado com sucesso",
        imagens: imagensFinais,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro interno" });
    }
  }
);

router.delete("/:id_post", async (req, res) => {
  try {
    const { id_post } = req.params;

    // 1. Buscar o post para saber quais midias remover
    const { data: post, error: fetchError } = await supabase
      .from("post")
      .select("imagem_url")
      .eq("id_post", id_post)
      .single();

    if (fetchError) {
      console.error(fetchError);
      return res.status(500).json({ error: "Erro ao buscar post" });
    }

    if (!post) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    // 2. Deletar mídias do storage
    if (post.imagens && post.imagens.length > 0) {
      // precisamos converter as publicUrls em caminhos do bucket
      const paths = post.imagens.map((url) => {
        const parts = url.split("/storage/v1/object/public/imagens/Ongs/postagens/");
        return parts[1]; // pega o caminho depois do bucket
      });

      const { error: deleteError } = await supabase.storage
        .from("imagens")
        .remove(paths);

      if (deleteError) {
        console.error(deleteError);
        // não dá erro fatal, só loga
      }
    }

    // 3. Remover o post do banco
    const { error: deletePostError } = await supabase
      .from("post")
      .delete()
      .eq("id_post", id_post);

    if (deletePostError) {
      console.error(deletePostError);
      return res.status(500).json({ error: "Erro ao deletar post" });
    }

    return res.json({ message: "Post deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno ao excluir post" });
  }
});

export default router;