const modalPost = document.getElementById("modalPost");
const closeBtn = modalPost.querySelector(".sair");
const btnMPost = document.querySelector('[data-modal="btnModalPost"]')

btnMPost.addEventListener('click', () => {
  overlay.classList.toggle('show')
  overlay.style.zIndex = "1099"
  modalPost.classList.toggle('show')
})

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modalPost.classList.remove('show')
  overlay.classList.remove('show')

}); 