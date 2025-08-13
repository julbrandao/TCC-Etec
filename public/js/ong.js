
document.getElementById('form-cadastro').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome_ong = document.getElementById('txtnome').value.trim();
  const cnpj = document.getElementById('txtcnpj').value.trim();
  const email_ong = document.getElementById('txtemail').value.trim();
  const rua = document.getElementById('txtrua').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const n_localizacao = document.getElementById('txtnumlocal').value.trim();
  const estado = document.getElementById('txtestado').value.trim();
  const complemento = document.getElementById('txtcomplemento').value.trim();
  const telefone = document.getElementById('txttelefone').value.trim();
  const nome_representante = document.getElementById('txtreplegal').value.trim();
  const cpf_representante = document.getElementById('txtcpf').value.trim();
  const objetivo = document.getElementById('txtobj').value.trim();
  const categoria_ong = document.getElementById('categoria').value.trim();
  const descrição = document.getElementById('txtdesc').value.trim();
  const senha_ong = document.getElementById('txtsenha').value.trim();
  const razao_social = document.getElementById('txtrazao').value.trim(); //Mudar depois do teste 
  const bairro = document.getElementById('txtbairro').value.trim(); //Mudar depois do teste 
  const classificacao = document.getElementById('Classificacao').value.trim(); //Mudar depois do teste 

  const res = await fetch('/api/ongs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome_ong, cnpj,email_ong,rua,cidade,n_localizacao,estado,complemento,telefone,nome_representante,cpf_representante,
    objetivo,categoria_ong,descrição,senha_ong,razao_social,bairro,classificacao
     })
    
  });
 console.log('Body recebido:', nome_ong);

if (res.ok) {
    alert('Cadastrado com sucesso');
  }
  else{
    alert(message)
  }

});