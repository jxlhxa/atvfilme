const api = 'http://localhost:3000/filmes';

function addFilmeHTML(filme) {
    return `
                <li id="${filme.id_filme}">
               <strong>${filme.nome_filme || ''}</strong>
            <p>${filme.resenha_filme || ''}</p>
            <small>Avaliação: ${filme.avaliacao_filme || '-'}</small>
            <div class="acoes">   
             <button class="remover" title="Remover"><i class="fa-solid fa-trash"></i>
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

//form submit
document.getElementById('form-tarefa').addEventListener('submit', function (e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const resenha = document.getElementById('resenha').value;
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    const avaliacao = ratingInput ? ratingInput.value : null;  

fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nome_filme: titulo,
        resenha_filme: resenha,
        avaliacao_filme: avaliacao
    })
 }) .then(() => {
         carregarFilmes();
       this.reset();
      })
})



//Remover filme 
document.addEventListener("click", async (event) => {
    if (event.target.closest(".remover")) {
        const li = event.target.closest("li");   // pega o <li> do botão
        const id = li.id;                // pega id

        console.log("ID para deletar:", id);

    //  1. Chama o backend para remover 
        await fetch(`http://localhost:3000/filmes/${id}`, {
    method: "DELETE"
});

        // 2. Remove da tela
        li.remove();
    }
});

// Filtrar por avaliação
function filtrarPorAvaliacao(avaliacao) {
    fetch(api)
        .then(res => res.json())
        .then(filmes => {
            const filtrados = filmes.filter(f => f.avaliacao_filme == avaliacao);
            const ul = document.getElementById('lista-tarefas');
            ul.innerHTML = '';
            filtrados.forEach(filme => {
                ul.innerHTML += addFilmeHTML(filme);
            });
        });
}
document.getElementById('btn-filtrar').addEventListener('click', function () {
    const ratingInput = document.querySelector('input[name="rating"]:checked');

    if (!ratingInput) {
        alert("Selecione uma avaliação para filtrar.");
        return;
    }

    const avaliacao = ratingInput.value;
    filtrarPorAvaliacao(avaliacao);
});

//Editar resenha
// function transformarEmFormulario(li, filme) {
//     li.innerHTML = `
//         <input type="text" id="edit-titulo" value="${filme.nome_filme}">
//         <input type="text" id="edit-resenha" value="${filme.resenha_filme}">
        
//         <select id="edit-avaliacao">
//             <option value="1" ${filme.avaliacao_filme == 1 ? "selected" : ""}>1</option>
//             <option value="2" ${filme.avaliacao_filme == 2 ? "selected" : ""}>2</option>
//             <option value="3" ${filme.avaliacao_filme == 3 ? "selected" : ""}>3</option>
//             <option value="4" ${filme.avaliacao_filme == 4 ? "selected" : ""}>4</option>
//             <option value="5" ${filme.avaliacao_filme == 5 ? "selected" : ""}>5</option>
//         </select>

//         <button class="salvar">Salvar</button>
//         <button class="cancelar">Cancelar</button>
//     `;
// }
// document.addEventListener("click", async (event) => {
//     if (event.target.closest(".editar")) {
//         const li = event.target.closest("li");
//         const id = li.id;

//         // Buscar dados atuais desse filme
//         const res = await fetch(`${api}/${id}`);
//         const filme = await res.json();

//         transformarEmFormulario(li, filme);
//     }
// if (event.target.classList.contains("salvar")) {
//         const li = event.target.closest("li");
//         const id = li.id;

//         const novoTitulo = document.getElementById("edit-titulo").value;
//         const novaResenha = document.getElementById("edit-resenha").value;
//         const novaAvaliacao = document.getElementById("edit-avaliacao").value;

//         await fetch(`${api}/${id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 nome_filme: novoTitulo,
//                 resenha_filme: novaResenha,
//                 avaliacao_filme: novaAvaliacao
//             })
//         });

//         carregarFilmes(); // atualiza a lista
//     }
//      if (event.target.classList.contains("cancelar")) {
//         carregarFilmes(); // simplesmente recarrega a lista original
//     }
// });