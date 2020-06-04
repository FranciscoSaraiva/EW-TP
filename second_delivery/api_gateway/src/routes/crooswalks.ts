import { Router } from 'express';
import * as crosswalks from '../controller/crosswalks';

const routes = Router();

routes.get('/', crosswalks.index);
routes.get('/:id', crosswalks.show);

export default routes;