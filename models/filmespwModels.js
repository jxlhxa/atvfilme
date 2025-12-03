import db from '../database/conexao.js';

const postarFilmes = async (filme) => {
  const novo = [
    filme.nome_filme,
    filme.resenha_filme,
    filme.avaliacao_filme
  ]
  console.log('Postando  filme:', filme);
  const [result] = await db.query('INSERT INTO filmes(nome_filme, resenha_filme, avaliacao_filme) VALUES (?, ?, ?)', novo);
  return result.insertId;
};

const buscarFilmes = async() => {
  const [rows] = await db.query('SELECT * FROM filmes');
  console.log('Filmes encontrados: ', rows);
  return rows;
};

const buscarFilmesPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM filmes WHERE id_filme = ?', id);
  return rows [0];
};

const buscarFilmesPorAvaliacao = async (avaliacao) => {
  const [rows] = await db.query('SELECT * FROM filmes WHERE avaliacao_filme = ?', avaliacao);
  return rows;
};

const atualizarFilmes = async (id, filme) => {
  await db.query('UPDATE filmes SET ? WHERE id_filme = ?', [filme, id]);
  console.log('Filme atualizado:', { id, ...filme });
};

const deletarFilmes = async (id) => {
  await db.query('DELETE FROM filmes WHERE id_filme = ?', id);
};

export default {
  postarFilmes,
  buscarFilmes,
  buscarFilmesPorId,
  buscarFilmesPorAvaliacao,
  atualizarFilmes,
  deletarFilmes
};
