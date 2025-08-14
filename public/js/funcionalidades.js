document.addEventListener('DOMContentLoaded', () => {
  const menuList = document.getElementById('navlinks');
  const overlay = document.getElementById('overlay');
  const btnMenuList = document.getElementById('hamburger');
  const profileBtn = document.getElementById('dropdown-perfil');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const criarPost = document.getElementById('abrirModalCriarPost');
  const modalCriarPost = document.getElementById('criarPost');
  const sairCriarPost = document.getElementById('sairCriarPost');
  const salvarPostagem = document.getElementById('salvarPublicacao');
  const sairSalvarPublicacao = document.getElementById('sairSalvarPublicacao');
  const btnSalvarPost = document.querySelectorAll('.btnSalvarPost');

  // SIDEBAR DA BARRA DE NAVEGAÇÃO
  if (btnMenuList) {
    btnMenuList.addEventListener('click', () => {
      if (menuList) menuList.classList.toggle('open');
      btnMenuList.classList.toggle('open');
      if (overlay) overlay.classList.toggle('show');
    });
  }

  // MODAL CRIAR POSTAGEM
  if (criarPost && modalCriarPost && overlay) {
    criarPost.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      overlay.classList.toggle('show');
      modalCriarPost.classList.toggle('show');
    });
  }

  // FECHAR MODAL CRIAR POST
  if (sairCriarPost && modalCriarPost && overlay) {
    sairCriarPost.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.remove('show');
      modalCriarPost.classList.remove('show');
    });
  }

  // SAIR SALVAR PUBLICAÇÃO
  if (sairSalvarPublicacao && salvarPostagem && overlay) {
    sairSalvarPublicacao.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.remove('show');
      salvarPostagem.classList.remove('show');
    });
  }

  // OVERLAY
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (menuList) menuList.classList.remove('open');
      if (btnMenuList) btnMenuList.classList.remove('open');
      overlay.classList.remove('show');
      if (dropdownMenu) dropdownMenu.classList.remove('show');
      if (modalCriarPost) modalCriarPost.classList.remove('show');
      if (salvarPostagem) salvarPostagem.classList.remove('show');
    });
  }

  // DROPDOWN PERFIL
  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('show');
      if (overlay) overlay.classList.toggle('show');
    });

    dropdownMenu.addEventListener('click', (e) => e.stopPropagation());
  }

  window.toggleOptions = function(element) {
    const container = element.parentElement;
    if (container) container.classList.toggle('active');
  };

  // FECHAR OPTIONS AO CLICAR FORA
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.options-container').forEach(container => {
      if (!container.contains(e.target)) {
        container.classList.remove('active');
      }
    });
  });

  // SALVAR POSTAGEM (corrigido para vários botões)
  if (btnSalvarPost.length > 0) {
    btnSalvarPost.forEach(botao => {
      botao.addEventListener('click', () => {
        salvarPostagem.classList.toggle('show');
        overlay.classList.toggle('show');
      });
    });
  }
});
