import { Router } from 'express';
import * as vehicle from '../controller/vehicle';

const routes = Router();

routes.get('/', vehicle.index);
routes.get('/:id', vehicle.show);
routes.put('/:id', vehicle.update);
routes.post('/', vehicle.create);
routes.delete('/:id', vehicle.remove);

export default routes;