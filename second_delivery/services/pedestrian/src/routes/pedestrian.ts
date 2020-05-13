import { Router } from 'express';

const routes = Router();

routes.get('/');
routes.get('/:id');
routes.put('/:id');
routes.post('/');
routes.delete('/:id');

export default routes;