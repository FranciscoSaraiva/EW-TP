import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import crosswalksRoutes from './routes/crooswalks';

const app = express();

var corsOptions = {
    origin: "*",
    methods: "*",
}

console.log('API Gateway Port: 3333')

app.use(cors(corsOptions));
app.use(express.json());
app.use('/crosswalks', crosswalksRoutes);

app.listen(3333);
