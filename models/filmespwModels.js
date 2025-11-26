import db from '../database/conexao.js';

const postarFilmes = async (filme) => {
  console.log('Postando  filme:', filme);
  const [result] = await db.query('INSERT INTO tarefa SET ?', filme);
  return result.insertId;
};

const buscarFilmes = async() => {
  const [rows] = await db.query('SELECT * FROM filmes');
  console.log('Filmes encontrados: ', rows);
  return rows;
};

const buscarFilmesPorId = async (id) => {
  const [rows] = await db.query('SELECT * FROM fimes WHERE id = ?', id);
  return rows [0];
};

const buscarFilmesPorAvaliacao = async (avaliacao) => {
  const [rows] = await db.query('SELECT * FROM filmes WHERE avaliacao_filme = ?', avaliacao);
  return rows;
};

const atualizarFilmes = async (id, filme) => {
  await db.query('UPDATE filmes SET ? WHERE id = ?', [id, filme]);
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
