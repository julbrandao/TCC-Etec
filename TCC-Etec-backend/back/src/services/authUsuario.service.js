import supabase from '../config/supabase.js';
 console.log('Services Body recebido:');
 

export const validarUsuario = async (Email_user, Senha_user) => {
  const { data, error } = await supabase
    .from('Usuario') 
    .select('*')
    .eq('Email_user', Email_user)
    .eq('Senha_user', Senha_user)
    .single();

  if (error) {
    return { sucesso: false, mensagem: 'Usuário ou senha incorretos' };
  }

  return { sucesso: true, usuario: data };
};