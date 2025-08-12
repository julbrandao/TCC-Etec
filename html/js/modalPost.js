const modalPost = document.getElementById("modalPost");
const openBtn = document.querySelector(".foto");
const overlay = document.getElementById('overlay')
const closeBtn = modalPost.querySelector(".sair");

openBtn.addEventListener("click", () => {
  modalPost.style.display = "flex";
  overlay.classList.toggle('show')
  overlay.style.zIndex = '1098'
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modalPost.style.display = "none"
  overlay.classList.remove('show')
  overlay.style.zIndex = '999'
});

overlay.addEventListener('click', () => {
  modalPost.style.display = "none";
  overlay.classList.remove('show')
  overlay.style.zIndex = '999'
})
