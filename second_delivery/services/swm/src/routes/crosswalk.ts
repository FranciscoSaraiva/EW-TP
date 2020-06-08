import { Router } from 'express';
import * as crosswalk from '../controllers/crosswalk';

const routes = Router();

routes.get('/', crosswalk.index);


routes.get('/check-proximity', crosswalk.checkProximityToContinueSimulating);

routes.get('/:id', crosswalk.show);
routes.put('/:id', crosswalk.update);
routes.post('/', crosswalk.create);
routes.delete('/:id', crosswalk.remove);

export default routes;