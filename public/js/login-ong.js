
  document.getElementById('form-cadastro').addEventListener('submit', async function (e) {
    e.preventDefault();

 const cnpj = document.getElementById('txtcnpj').value.trim();
  const email_ong = document.getElementById('txtemail').value.trim();
  const senha_ong = document.getElementById('txtsenha').value.trim();

  const res = await fetch('/api/ongs/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({cnpj, email_ong,senha_ong
     })
    
  });
  const result = await res.json();

  document.getElementById('response').textContent = result.message || result.error || 'Teste1';
    const dados = await resposta.json();
  console.log(dados);
});
