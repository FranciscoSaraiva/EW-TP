import { Router } from 'express';
import * as crosswalks from '../controller/crosswalks';

const routes = Router();

routes.get('/', crosswalks.index);
routes.get('/pedestrain-check-coord', crosswalks.pedestrainCheckCoord);
routes.get('/vehicle-check-coord', crosswalks.vehicleCheckCoord);
routes.get('/:id', crosswalks.show);

export default routes;