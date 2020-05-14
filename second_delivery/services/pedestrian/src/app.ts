import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import pedestrianRoutes from './routes/pedestrian';
import { Pedestrian } from './models/pedestrian';

const app = express();

var corsOptions = {
    origin: "*",
    methods: "*",
}

console.log('Service Pedestrian');
createConnection().then(async (connection) => {
    console.log('Connected ...');
    setInterval(async () => {
        let value = 0.000010;
        let pedestrians: Pedestrian[] = await Pedestrian.find();
        for (let i = 0; i < pedestrians.length; i++) {
            let randonNumber = Math.floor(Math.random() * (2 - 0));
            if (randonNumber === 0) {
                pedestrians[i].setCoordX(Number(pedestrians[i].getCoordX()) + 0.000010);
                pedestrians[i].setCoordY(Number(pedestrians[i].getCoordY()) - 0.000010);
            } else {
                pedestrians[i].setCoordX(Number(pedestrians[i].getCoordX()) - 0.000010);
                pedestrians[i].setCoordY(Number(pedestrians[i].getCoordY()) + 0.000010);
            }
            await pedestrians[i].save();
            console.log(pedestrians[i]);
        }
    }, 5000);
});

app.use(cors(corsOptions));
app.use(express.json());

app.use('/pedestrian', pedestrianRoutes);

app.listen(3001);

