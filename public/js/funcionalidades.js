document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // VARIÁVEIS GERAIS
  // ==============================
  const overlay = document.getElementById("overlay");
  let abertos = 0;

  // ==============================
  // FUNÇÕES ABRIR/FECHAR
  // ==============================
  function abrir(el) {
    if (el && !el.classList.contains("show")) {
      el.classList.add("show");
      abertos++;
    }
    overlay?.classList.add("show");
  }

  window.abrir = abrir;


  function fechar(el) {
    if (el && el.classList.contains("show")) {
      el.classList.remove("show");
      abertos = Math.max(0, abertos - 1);
    }
    if (overlay && abertos === 0) overlay.classList.remove("show");
  }
  window.fechar = fechar;
  // ==============================
  // FUNÇÃO PARA CONFIGURAR ABRIR E FECHAR
  // ==============================
  function configAbertura(botao, alvo) {
    if (botao && alvo) {
      botao.addEventListener("click", (e) => {
        e.preventDefault();
        abrir(alvo);
      });
    }
  }

  function configFechamento(botao, alvo) {
    if (botao && alvo) {
      botao.addEventListener("click", (e) => {
        e.preventDefault();
        fechar(alvo);
      });
    }
  }

  // ==============================
  // NAVBAR (hamburger + sidebar)
  // ==============================
  const menuList = document.getElementById("navlinks");
  const btnMenuList = document.getElementById("hamburger");

  if (btnMenuList && menuList) {
    btnMenuList.addEventListener("click", () => {
      if (!menuList.classList.contains("show")) {
        abrir(menuList);
        btnMenuList.classList.add("show");
      } else {
        fechar(menuList);
        btnMenuList.classList.remove("show");
      }
    });
  }

  // ==============================
  // DROPDOWN PERFIL
  // ==============================
  const profileBtn = document.getElementById("dropdown-perfil");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.contains("show")
        ? fechar(dropdownMenu)
        : abrir(dropdownMenu);
    });

    dropdownMenu.addEventListener("click", (e) => e.stopPropagation());
  }



  // ==============================
  // MODAIS -> Usam .show
  // ==============================

    // MODAL CRIAR COLEÇÃO
    configAbertura(document.getElementById("abrirCriarColecao"), document.getElementById("criarColecao"));
    configFechamento(document.getElementById("fecharCriarColecao"), document.getElementById("criarColecao"));
    configFechamento(document.getElementById("btn-cancelar-criarcolecao"), document.getElementById("criarColecao"));

    // MODAL ADICIONAR IMAGEM À COLEÇÃO
    configAbertura(document.getElementById("abrirAdicionarImagem"), document.getElementById("adicionarImagemModal"));
    configFechamento(document.getElementById("closeModal"), document.getElementById("adicionarImagemModal"));
    configFechamento(document.getElementById("cancelBtn"), document.getElementById("adicionarImagemModal"));

  //PREVIEW DA IMAGEM SELECIONADA

  function mostrarPreview(file) {
  limparPreview();
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.alt = file.name;
  previewContainer.appendChild(img);
}

function limparPreview() {
  previewContainer.innerHTML = "";
}

      const fileInput = document.getElementById("fileInput");
      const previewContainer = document.getElementById("previewContainer");

      if (fileInput) {
      fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
      mostrarPreview(file);
      }
    });

    
    }

    //------------------------------------------------------------------

    // PREVIEW DAS IMAGENS/VIDEOS SELECIONADOS NO CRIAR POST

let arquivosSelecionados = [];

function mostrarPreviewPost() {
  limparPreviewPost();

  arquivosSelecionados.forEach((file, index) => {
    const wrapper = document.createElement("div");
    wrapper.style.cssText =
      "position:relative;display:inline-block;margin:5px;width:100px;height:100px;overflow:hidden;border:1px solid #ddd;border-radius:10px;";

    const url = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = url;
      img.alt = file.name;
      img.style.cssText = "width:100%;height:100%;object-fit:cover;";
      wrapper.appendChild(img);
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      video.style.cssText = "width:100%;height:100%;object-fit:cover;";
      wrapper.appendChild(video);
    }

    // Botão de excluir
    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.style.cssText =
      "position:absolute;top:4px;right:4px;background:rgb(0,0,0,0.5);color:#fff;border:none;border-radius:50%;cursor:pointer;width:20px;height:20px;font-size:14px;line-height:20px;";
    btn.addEventListener("click", () => removerArquivo(index));

    wrapper.appendChild(btn);
    previewContainerPost.appendChild(wrapper);
    
  });
}


function limparPreviewPost() {
  previewContainerPost.innerHTML = "";
}
function removerArquivo(index) {
  arquivosSelecionados.splice(index, 1);// remove do array
  atualizarInputFiles();
  mostrarPreviewPost();
}

function atualizarInputFiles() {
  const dt = new DataTransfer();
  arquivosSelecionados.forEach((f) => dt.items.add(f));
  fileInputPost.files = dt.files;
}

const fileInputPost = document.getElementById("imagemPost");
const previewContainerPost = document.getElementById("previewContainerPost");

if (fileInputPost) {
  fileInputPost.addEventListener("change", (e) => {
    const novosArquivos = Array.from(e.target.files);

    // junta com os que já existem, sem passar de 4
    arquivosSelecionados = arquivosSelecionados.concat(novosArquivos).slice(0, 4);

    atualizarInputFiles();
    mostrarPreviewPost();
  });
}



    //------------------------------------------------------------------



    
    // MODAL CRIAR POST
    configAbertura(document.getElementById("abrirModalCriarPost"), document.getElementById("criarPost"));
    configFechamento(document.getElementById("sairCriarPost"), document.getElementById("criarPost"));

    // MODAL SALVAR POST
      document.querySelectorAll(".btnSalvarPost").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          abrir(document.getElementById("salvarPublicacao"));
      });
    });

    configFechamento(document.getElementById("sairSalvarPublicacao"), document.getElementById("salvarPublicacao"));

        // MODAL EXCLUIR POST
      document.querySelectorAll(".btnExcluirPost").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          abrir(document.getElementById("excluirPost"));
      });
    });
    configFechamento(document.getElementById("btn-cancelar-excluirmodal"), document.getElementById("excluirPost"));
    configFechamento(document.getElementById("fecharSaida"), document.getElementById("excluirPost"));

    // MODAL SAIR DA CONTA
    document.querySelectorAll(".link-sair").forEach((btn) => {
      configAbertura(btn, document.getElementById("modalsairconta"));
    });
    configFechamento(document.getElementById("btn-cancelar-sairconta"), document.getElementById("modalsairconta"));
    configFechamento(document.getElementById("fecharSaida"), document.getElementById("modalsairconta"));


  // ==============================
  // FECHAR TUDO AO CLICAR NO OVERLAY
  // ==============================
  overlay?.addEventListener("click", () => {
    document.querySelectorAll(".show").forEach((el) => {
      if (el !== overlay) fechar(el);
    });
  });

  // ==============================
  // DROPDOWN OPÇÕES (posts: editar, excluir, salvar)
  // ==============================
  
document.querySelectorAll(".options-post").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const container = btn.parentElement;
    container.classList.toggle("active");
    e.stopPropagation();
  });
});

// MODAL SALVAR POST


// MODAL EDITAR POST

document.querySelectorAll(".btnEditarPost").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    abrir(document.getElementById("editarPost"));
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".options-container").forEach((c) => c.classList.remove("active"));
});
});
