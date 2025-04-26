//Função para fazer o dropdown da postagem funcionar 
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

function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
    }
  }
  