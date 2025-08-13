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
  const btnSalvarPost = document.querySelector('.btnSalvarPost')

  // SIDEBAR DA BARRA DE NAVEGAÇÃO
  if (btnMenuList) {
    btnMenuList.addEventListener('click', () => {
      if (menuList) menuList.classList.toggle('open');
      btnMenuList.classList.toggle('open');
      if (overlay) overlay.classList.toggle('show');
    });
  }

  // MODAL CRIAR POSTAGEM (abre ao clicar no input/button)
  if (criarPost && modalCriarPost && overlay) {
    criarPost.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      overlay.classList.toggle('show');
      modalCriarPost.classList.toggle('show');
    });
  }

  // fechar modal criar post
  if (sairCriarPost && modalCriarPost && overlay) {
    sairCriarPost.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.remove('show');
      modalCriarPost.classList.remove('show');
    });
  }

  if (btnSalvarPost){
    btnSalvarPost.addEventListener('click', () => {
      salvarPostagem.classList.toggle('show')
      overlay.classList.toggle('show')
    })
  }

  // sair salvar publicação (se existir)
  if (sairSalvarPublicacao && salvarPostagem && overlay) {
    sairSalvarPublicacao.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.remove('show');
      salvarPostagem.classList.remove('show');
    });
  }

  // OVERLAY -> remove elementos abertos (apenas se existir overlay)
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

  // DROPDOWN DO MENU DE PERFIL
  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // evita que o clique se propague e feche algo externo
      dropdownMenu.classList.toggle('show');
      if (overlay) overlay.classList.toggle('show');
    });

    // evita que clique dentro do dropdown feche via outros handlers
    dropdownMenu.addEventListener('click', (e) => e.stopPropagation());
  }

  window.toggleOptions = function(element) {
    const container = element.parentElement;
    if (container) container.classList.toggle('active');
  };

  // Fecha as opções quando clicar fora
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.options-container').forEach(container => {
      if (!container.contains(e.target)) {
        container.classList.remove('active');
      }
    });
  });
});
