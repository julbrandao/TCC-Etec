
function validaCNPJ(txtcnpj) {
	 var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
    var c = String(txtcnpj).replace(/[^\d]/g, '')
    
    if(c.length !== 14)
        return false

    if(/0{14}/.test(c))
        return false

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    return true
}


document.getElementById('txtcnpj').addEventListener('input', function(e) {
	var value = e.target.value;
	var rawValue = value.replace(/\D/g, ''); // Remove tudo que não é número

	// Verifica se o CNPJ tem 15 dígitos e se o primeiro dígito é '0'
	if (rawValue.length === 15 && rawValue.startsWith('0')) {
		// Verifica se, ao remover o '0', o restante é um CNPJ válido
		var potentialCNPJ = rawValue.substring(1);
		// Atualiza rawValue para o CNPJ sem o '0' inicial
		if (validaCNPJ(potentialCNPJ)) rawValue = potentialCNPJ;
	}
	var cnpjPattern = rawValue
					.replace(/^(\d{2})(\d)/, '$1.$2') // Adiciona ponto após o segundo dígito
					.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Adiciona ponto após o quinto dígito
					.replace(/\.(\d{3})(\d)/, '.$1/$2') // Adiciona barra após o oitavo dígito
					.replace(/(\d{4})(\d)/, '$1-$2') // Adiciona traço após o décimo segundo dígito
					.replace(/(-\d{2})\d+?$/, '$1'); // Impede a entrada de mais de 14 dígitos
	e.target.value = cnpjPattern;
});

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
  const AdF = document.getElementById('txtAdF').value.trim();

  const res = await fetch('/api/ongs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome_ong, cnpj,email_ong,rua,cidade,n_localizacao,estado,complemento,telefone,nome_representante,cpf_representante,
    objetivo,categoria_ong,descrição,senha_ong,razao_social,bairro,classificacao
    ,AdF})
    
  });

  if (!validaCNPJ(cnpj)) {
    e.preventDefault(); // Impede o envio do formulário
    alert('Campos invalidos');
    document.getElementById('txtcnpj').focus(); // Foca no campo de CNPJ após detectar erro
  }

 console.log('Body recebido:', nome_ong);

if (res.ok) {
    alert('Cadastrado com sucesso');
  }
  else{
    alert(error)
  }
});

