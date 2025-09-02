// ===========================
// DECLARAÇÃO DE CONSTANTES
// ===========================

// Modais
const modalAlfabetico = document.getElementById('modal-az');
const modalCidades = document.getElementById('modal-localizacao');
const modalCategoria = document.getElementById('modal-categoria');

// Botões de seleção - Modal A-Z
const btnCrescente = document.getElementById('btn_crescente');
const btnDecrescente = document.getElementById('btn_decrescente');

// Botões de seleção - Modal Cidade
const botoesFiltroCidade = [...modalCidades.querySelectorAll('.btn-filtro')];

// Botões de seleção - Modal Categoria
const botoesFiltroCategoria = [...modalCategoria.querySelectorAll('.btn-filtro')];

// Estados de seleção
let filtroAlfabeticoSelecionado = null; // 'AZ' ou 'ZA'
let filtroCidadeSelecionado = null;
let filtroCategoriaSelecionado = null;

// Verifica se já tem filtro pré-selecionado no modal de cidades
const btnCidadeInicial = modalCidades.querySelector('.btn-filtro.selected');
if (btnCidadeInicial) {
  filtroCidadeSelecionado = btnCidadeInicial.dataset.filtro;
}

// Verifica se já tem filtro pré-selecionado no modal de categorias
const btnCategoriaInicial = modalCategoria.querySelector('.btn-filtro.selected');
if (btnCategoriaInicial) {
  filtroCategoriaSelecionado = btnCategoriaInicial.dataset.filtro;
}

// ===========================
// FUNÇÕES GENÉRICAS
// ===========================

function abrirModalPorBotao(event) {
  const modalId = event.currentTarget.getAttribute('data-open');
  const modal = document.getElementById(modalId);
  if (modal) modal.showModal();
}

function fecharModalPorBotao(event) {
  const modalId = event.currentTarget.getAttribute('data-close');
  const modal = document.getElementById(modalId);
  if (modal) modal.close();
}

function cancelarModalPorBotao(event) {
  const modalId = event.currentTarget.getAttribute('data-cancel');
  const modal = document.getElementById(modalId);
  if (modal) modal.close();
}

function aplicarFiltroPorBotao(event) {
  const tipo = event.currentTarget.getAttribute('data-aplicar');

  if (tipo === 'az') {
    if (!filtroAlfabeticoSelecionado) {
      alert('Nenhum filtro selecionado.');
    } else {
      alert(`Filtro aplicado: ${filtroAlfabeticoSelecionado === 'AZ' ? 'De A a Z' : 'De Z a A'}`);
    }
    modalAlfabetico.close();
  }

  else if (tipo === 'cidade') {
    if (!filtroCidadeSelecionado) {
      alert('Nenhum filtro selecionado.');
    } else {
      alert(`Filtro aplicado: ${filtroCidadeSelecionado}`);
    }
    modalCidades.close();
  }

  else if (tipo === 'categoria') {
    if (!filtroCategoriaSelecionado) {
      alert('Nenhum filtro selecionado.');
    } else {
      alert(`Filtro aplicado: ${filtroCategoriaSelecionado}`);
    }
    modalCategoria.close();
  }
}

// ===========================
// FUNÇÕES ESPECÍFICAS
// ===========================

function selecionarFiltroAlfabetico(botao) {
  [btnCrescente, btnDecrescente].forEach(b => {
    b.classList.remove('selected');
    b.setAttribute('aria-checked', 'false');
    b.tabIndex = -1;
  });

  botao.classList.add('selected');
  botao.setAttribute('aria-checked', 'true');
  botao.tabIndex = 0;

  filtroAlfabeticoSelecionado = (botao === btnCrescente) ? 'AZ' : 'ZA';
}

function selecionarFiltroCidade(botao) {
  botoesFiltroCidade.forEach(b => {
    b.classList.remove('selected');
    b.setAttribute('aria-checked', 'false');
    b.tabIndex = -1;
  });

  botao.classList.add('selected');
  botao.setAttribute('aria-checked', 'true');
  botao.tabIndex = 0;

  filtroCidadeSelecionado = botao.dataset.filtro;
}

function selecionarFiltroCategoria(botao) {
  botoesFiltroCategoria.forEach(b => {
    b.classList.remove('selected');
    b.setAttribute('aria-checked', 'false');
    b.tabIndex = -1;
  });

  botao.classList.add('selected');
  botao.setAttribute('aria-checked', 'true');
  botao.tabIndex = 0;

  filtroCategoriaSelecionado = botao.dataset.filtro;
}

// ===========================
// EVENTOS
// ===========================

// Botões de abrir/fechar/cancelar/aplicar
document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', abrirModalPorBotao);
});

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', fecharModalPorBotao);
});

document.querySelectorAll('[data-cancel]').forEach(btn => {
  btn.addEventListener('click', cancelarModalPorBotao);
});

document.querySelectorAll('[data-aplicar]').forEach(btn => {
  btn.addEventListener('click', aplicarFiltroPorBotao);
});

// Eventos de seleção
btnCrescente.addEventListener('click', () => selecionarFiltroAlfabetico(btnCrescente));
btnDecrescente.addEventListener('click', () => selecionarFiltroAlfabetico(btnDecrescente));
botoesFiltroCidade.forEach(btn => btn.addEventListener('click', () => selecionarFiltroCidade(btn)));
botoesFiltroCategoria.forEach(btn => btn.addEventListener('click', () => selecionarFiltroCategoria(btn)));
