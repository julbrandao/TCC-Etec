import supabase from '../config/supabase.js';

export async function atualizarUsuario(id, dados) {
  const { data, error } = await supabase
    .from("Usuario")
    .update({
      Email_user: dados.Email_user,
      Nome_user: dados.Nome_user,
      Senha_user: dados.Senha_user,
    })
    .eq("id_user", id)
    .select();

  if (error) throw error;
  return data;
}