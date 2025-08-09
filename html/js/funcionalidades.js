//Função para fazer o dropdown da postagem funcionar 


const menuList = document.getElementById('navlinks')
const overlay = document.getElementById('overlay')
const btnMenuList = document.getElementById('hamburger')
const profileBtn = document.getElementById('dropdown-perfil')
const dropdownMenu = document.getElementById('dropdownMenu')


btnMenuList.addEventListener('click', () => {
  menuList.classList.toggle('open')
  hamburger.classList.toggle('open')
  overlay.classList.toggle('show')
})

overlay.addEventListener('click', () => {
  menuList.classList.remove('open')
  hamburger.classList.remove('open')
  overlay.classList.remove('show')
  profileMenu.classList.remove('open')
  dropdownMenu.classList.remove('show')
});


function toggleOptions(element) {
    const container = element.parentElement;
    container.classList.toggle('active');
}

document.addEventListener('click', function(e) {
  document.querySelectorAll('.options-container').forEach(container => {
      if (!container.contains(e.target)) {
          container.classList.remove('active');
      }
  });
});

profileBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show')
  overlay.classList.toggle('show')
})



