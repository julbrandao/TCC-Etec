document.getElementById('form-cadastro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const Email_user = document.getElementById('txtemail').value;
  const Senha_user = document.getElementById('txtsenha').value;

  const res = await fetch('/api/usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Email_user, Senha_user }),
 })

 const result = await res.json();

  document.getElementById('response').textContent = result.message || result.error || 'Teste1';
    const dados = await resposta.json();
  console.log(dados);

});