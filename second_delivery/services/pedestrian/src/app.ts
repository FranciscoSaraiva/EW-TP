import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import pedestrianRoutes from './routes/pedestrian';

const app = express();

var corsOptions = {
    origin: "*",
    methods: "*",
}

console.log('Service Pedestrian');
createConnection().then(async (connection) => {
    console.log('Connected ...');
});

app.use(cors(corsOptions));
app.use(express.json());

app.use('/pedestrian', pedestrianRoutes);

app.listen(3001);

