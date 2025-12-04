import express from 'express';
import filmespwController from '../controllers/filmespwController.js';

const router = express.Router();

router.post('/', filmespwController.postarFilmes);
router.get('/', filmespwController.buscarFilmes);
router.get('/avaliacao/:avaliacao', filmespwController.buscarFilmesPorAvaliacao);
router.get('/:id', filmespwController.buscarFilmesPorId);
router.put('/:id', filmespwController.atualizarFilmes);
router.delete('/:id', filmespwController.deletarFilmes);

export default router;