const modalPost = document.getElementById("modalPost");
const openBtn = document.querySelector(".foto");
const overlay2 = document.getElementById('overlay2')
const closeBtn = modalPost.querySelector(".sair");

openBtn.addEventListener("click", () => {
  modalPost.style.display = "flex";
  overlay2.classList.toggle('show')
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modalPost.style.display = "none";
  overlay2.classList.remove('show')
});