import express from 'express';
import knex from './database/connection';

const routes = express();

routes.post('/colmeia', async (request, response) => {
    const {
        nome,
        local,
        capmax,
        id
    } = request.body;

    const colmeia = {
        nome,
        local,
        capmax,
        id
    }

    const insertedIds = await knex('colmeia').insert(colmeia);
    const produto_id = insertedIds[0];

    response.json({
        ...colmeia
    });

});
routes.get('/colmeia/:id', async (request, response) => {
    const {id}=request.params;
    const colmeia = await knex('colmeia')
        .select('colmeia.*')
        .where('colmeia.id', id)
        .first();

    response.json(colmeia);
}

);
routes.put('/colmeia/:id', async (request, response) => {
    const {id } = request.params;

    const{
       nome,
       local,
       capmax,
    } = request.body;

    const colmeia = {
       nome,
       local,
       capmax,
       id
    }
    await knex ('colmeia')
    .update(colmeia)
    .where('id', id);

     response.json({
       status: 'success',
       data: colmeia
    });
 });
 routes.delete('/colmeia/:id', async (request, response) => {
    const {id } = request.params;


    await knex ('colmeia')
    .delete()
    .where('colmeia.id', id);

     response.json({
       status: 'success',
    });
 });
 routes.get('/colmeias', async (request, response) => {
    const colmeias = await knex('colmeia')
        .select('colmeia.*')
        .orderBy('colmeia.id');

    response.json(colmeias);
}
);
export default routes;