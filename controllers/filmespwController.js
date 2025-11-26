import filmeModel from '../models/filmespwModels.js';

const postarFilmes = async (req, res) => {
  try {
    const filme = req.body;
    const id = await filmeModel.postarFilmes(filme);
    res.status(201).json({ id, ...filme });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao postar filme' });
  }
};

const buscarFilmes = async (req, res) => {
  try {
    const filmes = await filmeModel.buscarFilmes();
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
};

const buscarFilmesPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const filme = await filmeModel.buscarFilmesPorId(id);
    if (filme) {
      res.status(200).json(filme);
    } else {
      res.status(404).json({ error: 'Filme não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar filme' });
  }
};

const buscarFilmesPorAvaliacao = async (req, res) => {
  try {
    const { avaliacao } = req.params;
    const filmes = await filmeModel.buscarFilmesPorAvaliacao(avaliacao);
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar filmes por avaliacao' });
  }
};

const atualizarFilmes = async (req, res) => {
  try {
    const { id } = req.params;
    const filme = req.body;
    await filmeModel.atualizarFilmes(id, filme);
    res.status(200).json({ id, ...filme });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar filme' });
  }
};

const deletarFilmes = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID do filme a ser deletado:', req.params.id);
    await filmeModel.deletarFilmes(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar filme' });
  }
};

export default {
    postarFilmes,
    buscarFilmes,
    buscarFilmesPorId,
    buscarFilmesPorAvaliacao,
    atualizarFilmes,
    deletarFilmes
}