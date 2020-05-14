import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import crosswalkRoutes from './routes/crosswalk';

const app = express();

var corsOptions = {
    origin: "*",
    methods: "*",
}

console.log('Service Crosswalk');
createConnection().then(async (connection) => {
    console.log('Connected ...')
    setInterval(() => {

    }, 5000);
});

app.use(cors(corsOptions));
app.use(express.json());

app.use('/crosswalk', crosswalkRoutes);

app.listen(3002);

