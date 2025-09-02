import supabase from '../config/supabase.js';
 console.log('Services Body recebido:');
 

export const buscarUsuario = async (Nome_user, Email_user) => {
  return await supabase
    .from('Usuario') // nome da tabela no Supabase
    .select('*')
    .or(`Nome_user.eq.${Nome_user},Email_user.eq.${Email_user}`)
    .single();
}


export const insertUser = async ({ Nome_user,Senha_user, Email_user }) => {
  return await supabase.from('Usuario').insert({ Nome_user, Email_user,Senha_user });
};