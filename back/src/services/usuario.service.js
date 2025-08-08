import supabase from '../config/supabase.js';
 console.log('Services Body recebido:');
 

export const buscarUsuarioPorEmail = async (Email_user,Nome_user) => {
  return await supabase
    .from('Usuario') // nome da tabela no Supabase
    .select('*')
    .eq('Email_user',Email_user)
    .single(); // retorna
};

export const buscarUsuarioPorNome = async (Nome_user) => {
  return await supabase
    .from('Usuario') // nome da tabela no Supabase
    .select('*')
    .eq('Nome_user',Nome_user)
    .single(); // retorna
};


export const insertUser = async ({ Nome_user,Senha_user, Email_user }) => {
  return await supabase.from('Usuario').insert({ Nome_user,Senha_user, Email_user });
};