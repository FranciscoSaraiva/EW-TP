import { Router } from 'express';
import * as pedestrian from '../controller/pedestrian';

const routes = Router();

routes.get('/', pedestrian.index);
routes.get('/:id', pedestrian.show);
routes.put('/:id', pedestrian.update);
routes.post('/', pedestrian.create);
routes.delete('/:id', pedestrian.remove);

export default routes;