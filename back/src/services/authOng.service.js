import supabase from '../config/supabase.js';
 console.log('Services Body recebido:');
 

export const validarOng = async (cnpj, email_ong,senha_ong) => {
  const { data, error } = await supabase
    .from('ONG') 
    .select('*')
    .eq('email_ong', email_ong)
    .eq('senha_ong', senha_ong)
    .eq('cnpj', cnpj)
    .single();

  if (error) {
    return { sucesso: false, mensagem: 'Cnpj, Email ou senha incorretos' };
  }

  return { sucesso: true, ong: data };
};
