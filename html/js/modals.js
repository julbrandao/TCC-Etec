  const modalPost = document.getElementById("modalPost");
  const openBtn = document.querySelector(".btnPost");
  const closeBtn = modalPost.querySelector(".sair");

  openBtn.addEventListener("click", () => {
    modalPost.style.display = "flex"; 
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    modalPost.style.display = "none"; 
  });