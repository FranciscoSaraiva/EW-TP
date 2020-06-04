import { Router } from 'express';
import * as crosswalks from '../controller/crosswalks';

const routes = Router();

routes.get('/', crosswalks.index);

export default routes;