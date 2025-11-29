async function carregarQuantidadePostagens(id_ong) {
  try {
    const response = await fetch(`/api/postagens/quantidade/${id_ong}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar quantidade de postagens");
    }

    const data = await response.json();

    // Atualiza o elemento no HTML
    const txt = document.getElementById("txtcountpost");
    if (txt) {
      txt.textContent = data.quantidade_postagens;
    }
  } catch (error) {
    console.error("Erro no frontend ao carregar quantidade:", error);
  }
}
