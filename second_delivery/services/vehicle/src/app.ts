import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import vehicleRoutes from './routes/vehicle';
import { Vehicle } from './models/vehicle';

const app = express();

var corsOptions = {
    origin: "*",
    methods: "*",
}

console.log('Service Vehicle Port: 3001');
createConnection().then(async (connection) => {
    console.log('Connected ...')
}).catch(err => { console.log(err) })

app.use(cors(corsOptions));
app.use(express.json());

app.use('/vehicle', vehicleRoutes);

app.listen(3001);

