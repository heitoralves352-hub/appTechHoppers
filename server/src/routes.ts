import express from 'express';
import knex from './database/connection';

const routes = express.Router();

// Confere se os campos obrigatórios vieram preenchidos
function dadosValidos(body: any) {
  return Boolean(body.nome) && Boolean(body.local) && body.capmax !== undefined && body.capmax !== '';
}

// Listar todas as colmeias
routes.get('/colmeias', async (request, response) => {
  try {
    const colmeias = await knex('colmeia').select('*').orderBy('id');
    response.json(colmeias);
  } catch (err) {
    console.error(err);
    response.status(500).json({ erro: 'Erro ao listar as colmeias.' });
  }
});

// Buscar uma colmeia pelo id
routes.get('/colmeia/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const colmeia = await knex('colmeia').where('id', id).first();

    if (!colmeia) {
      response.status(404).json({ erro: 'Colmeia não encontrada.' });
      return;
    }
    response.json(colmeia);
  } catch (err) {
    console.error(err);
    response.status(500).json({ erro: 'Erro ao buscar a colmeia.' });
  }
});

// Cadastrar uma colmeia (o id é gerado pelo banco)
routes.post('/colmeia', async (request, response) => {
  if (!dadosValidos(request.body)) {
    response.status(400).json({ erro: 'Preencha nome, local e capacidade máxima.' });
    return;
  }

  const { nome, local, capmax } = request.body;

  try {
    const [id] = await knex('colmeia').insert({ nome, local, capmax });
    response.status(201).json({ id, nome, local, capmax });
  } catch (err) {
    console.error(err);
    response.status(500).json({ erro: 'Erro ao cadastrar a colmeia.' });
  }
});

// Atualizar uma colmeia
routes.put('/colmeia/:id', async (request, response) => {
  if (!dadosValidos(request.body)) {
    response.status(400).json({ erro: 'Preencha nome, local e capacidade máxima.' });
    return;
  }

  const { id } = request.params;
  const { nome, local, capmax } = request.body;

  try {
    const alteradas = await knex('colmeia').where('id', id).update({ nome, local, capmax });

    if (alteradas === 0) {
      response.status(404).json({ erro: 'Colmeia não encontrada.' });
      return;
    }
    response.json({ id: Number(id), nome, local, capmax });
  } catch (err) {
    console.error(err);
    response.status(500).json({ erro: 'Erro ao atualizar a colmeia.' });
  }
});

// Excluir uma colmeia
routes.delete('/colmeia/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const excluidas = await knex('colmeia').where('id', id).delete();

    if (excluidas === 0) {
      response.status(404).json({ erro: 'Colmeia não encontrada.' });
      return;
    }
    response.status(204).send();
  } catch (err) {
    console.error(err);
    response.status(500).json({ erro: 'Erro ao excluir a colmeia.' });
  }
});

export default routes;