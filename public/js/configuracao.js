// js imagem de fundo do perfil---------------------

//fazer a div acionar o input
function AcionarFundo(){
    const inputFundo = document.getElementById("input_imagem_fundo");
    inputFundo.focus();
    inputFundo.click();
}

const inputImagemFundo = document.querySelector('.input-imagem-fundo');
const spanImagemFundo = document.querySelector('.span-imagem-fundo');

// Função para mostrar o texto padrão
function mostrarTextoPadrao() {
    spanImagemFundo.innerHTML = '<span class="texto-imagem-fundo">Escolha uma imagem de fundo</span>';
}

// Inicializa com o texto padrão
if (spanImagemFundo) {
    mostrarTextoPadrao();
}

if (inputImagemFundo && spanImagemFundo) {
    inputImagemFundo.addEventListener('change', function(e){
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if (file){
            const reader = new FileReader();
            reader.addEventListener('load', function(e){
                const readerTarget = e.target;
                // Limpa imagens anteriores
                spanImagemFundo.innerHTML = '';
                const img = document.createElement('img');
                img.src = readerTarget.result;
                img.classList.add('imagem-fundo-carregada');
                spanImagemFundo.appendChild(img);
            });

            reader.readAsDataURL(file);

            alert('Imagem selecionada');
        } else {
            mostrarTextoPadrao();
            alert('Nenhuma imagem selecionada');
        }
    });
} else {
    console.error('Elemento(s) não encontrado(s) no HTML.');
}

//imagem da bolinha do perfil-----------------------

//fazer a div acionar o input
function AcionarIcone(){
    const inputPerfil = document.getElementById("input_icone_perfil");
    inputPerfil.focus();
    inputPerfil.click();
}

const inputIconePerfil = document.querySelector('.input-icone-perfil');
const spanIconePerfil = document.querySelector('.span-icone-perfil');

// Função para mostrar a imagem padrão
function mostrarIconePadrao() {
    spanIconePerfil.innerHTML = '<img src="../assets/png/icones/icone_foto-config.png" alt="Ícone padrão" class="icone-perfil-padrao" ">';
}

// Inicializa com a imagem padrão
if (spanIconePerfil) {
    mostrarIconePadrao();
}

if (inputIconePerfil && spanIconePerfil) {
    inputIconePerfil.addEventListener('change', function(e){
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if (file){
            const reader = new FileReader();
            reader.addEventListener('load', function(e){
                const readerTarget = e.target;
                // Limpa imagens anteriores
                spanIconePerfil.innerHTML = '';
                const img = document.createElement('img');
                img.src = readerTarget.result;
                img.classList.add('icone-perfil-carregada');
                spanIconePerfil.appendChild(img);
            });

            reader.readAsDataURL(file);

            alert('Imagem de perfil selecionada');
        } else {
            mostrarIconePadrao();
            alert('Nenhuma imagem selecionada');
        }
    });
} else {
    console.error('Elemento(s) de ícone-perfil não encontrado(s) no HTML.');
}