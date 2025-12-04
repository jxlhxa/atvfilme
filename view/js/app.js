const api = 'http://localhost:3000/filmes';

function addFilmeHTML(filme) {
    const data = new Date(filme.data);
    return `
                <li data-id="${resenha.id_filme}">
                <div class="acoes">
                    <button class="remover" title="Remover">
                    <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
                </li>
            `;
}

function carregarFilmes() {
    fetch(api)
        .then(res => res.json())
        .then(filmes => {
            const ul = document.getElementById('lista-tarefas');
            ul.innerHTML = '';
            filmes.forEach(filme => {
                ul.innerHTML += addFilmeHTML(filme);
            });
        });
}

document.getElementById('form-filme').addEventListener('submit', function (e) {
    e.preventDefault();
//     const titulo = document.getElementById('titulo').value;
//     const descricao = document.getElementById('descricao').value;
//     const data = document.getElementById('data').value;
//     fetch(api, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ titulo, descricao, data, status: 0 })
//     }).then(() => {
//         carregarTarefas();
//         this.reset();
//     });
// });


















document.addEventListener("click", async (event) => {
    if (event.target.closest(".remover")) {
        const li = event.target.closest("li");   // pega o <li> do botão
        const id = li.dataset.id;                // pega o data-id

        console.log("ID para deletar:", id);

        // 1. Chama o backend para remover
        await fetch(`http://localhost:3000/filmes/${id}`, {
            method: "DELETE"
        });

        // 2. Remove da tela
        li.remove();
    }
});