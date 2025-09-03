// back/routes/auth.js
import express from "express";
import supabase from '../config/supabase.js';


const router = express.Router();

// LOGIN USUÁRIO
router.post("/usuario/login", async (req, res) => {
  const { Senha_user,Email_user } = req.body;

  const { data: user, error } = await supabase
    .from("Usuario")
    .select("*")
    .eq("Email_user", Email_user)
    .eq("Senha_user", Senha_user)
    .single()

  if (error) return res.status(500).json({ error: error.message });
  if (!user || user.length === 0) return res.status(401).json({ error: "Usuário inválido" });

   req.session.user = {
      id: user.id_user,
      email: user.Email_user,
      role: 'Usuario', // "usuario" ou "ong"
    };
  

  res.status(200).json({ message: "Login usuário OK"});
});

// LOGIN ONG
router.post("/ongs/login", async (req, res) => {
  const { email_ong, senha_ong,cnpj } = req.body;
  if (
  !cnpj || !email_ong ||!senha_ong) {
    return res.status(400).json({ error: 'Preencha todos os campos' });
}
  const { data, error } = await supabase 
    .from("ONG")
    .select("id_ong,email_ong,senha_ong,cnpj")
    .eq("email_ong", email_ong)
    .eq("senha_ong", senha_ong)
    .eq("cnpj",cnpj)
    .single()
  
  if (error) return res.status(500).json({ error: 'Credenciais Invalidas' });
  if (!data || data.length === 0) return res.status(401).json({ error: "ONG inválida" })
  if(data) {
   req.session.user = {
  id: data.id_ong ,        
  role: "ONG",
  email: data.email_ong,
  cnpj: data.cnpj,
};
  }
    console.log("Resultado do Supabase:", req.session.user)
  res.status(200).json({ message: "Login Ong OK"});


});


export default router;
