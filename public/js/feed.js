document.querySelectorAll('.fotos-post').forEach(galeria => {
  const qtd = galeria.querySelectorAll('img').length;
  galeria.classList.add(`fotos-post-${qtd}`);
});

let currentImageIndex = 0;
let imageList = [];

// Adiciona evento em todas as imagens
document.querySelectorAll('.fotos-post img').forEach(img => {
  img.addEventListener('click', () => {
    const parent = img.closest('.fotos-post');
    imageList = Array.from(parent.querySelectorAll('img')).map(i => i.src);
    currentImageIndex = imageList.indexOf(img.src);
    openLightbox();
  });
});

function openLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  // Esconde as setas se houver apenas uma imagem
  const showButtons = imageList.length > 1;
  prevBtn.style.display = showButtons ? 'flex' : 'none';
  nextBtn.style.display = showButtons ? 'flex' : 'none';

  modal.classList.remove('lightbox-hidden');
  img.src = imageList[currentImageIndex];
}

function closeLightbox() {
  document.getElementById('lightbox-modal').classList.add('lightbox-hidden');
}

function navigateLightbox(direction) {
  currentImageIndex += direction;

  if (currentImageIndex < 0) currentImageIndex = imageList.length - 1;
  if (currentImageIndex >= imageList.length) currentImageIndex = 0;

  document.getElementById('lightbox-img').src = imageList[currentImageIndex];
}