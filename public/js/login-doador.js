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

  if (res.ok) {
    // redireciona para o dashboard
    window.location.href = '/feed.html';
  } else {
    
    alert('Email ou senha inválidos');
  }

});