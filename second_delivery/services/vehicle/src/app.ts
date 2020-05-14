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

console.log('Service Vehicle');
createConnection().then(async (connection) => {
    console.log('Connected ...')
    setInterval(async () => {
        let value = 0.000050;
        let vehicles: Vehicle[] = await Vehicle.find();
        for (let i = 0; i < vehicles.length; i++) {
            let randonNumber = Math.floor(Math.random() * (2 - 0));
            if (randonNumber === 0) {
                vehicles[i].setCoordX(Number(vehicles[i].getCoordX()) + value);
                vehicles[i].setCoordY(Number(vehicles[i].getCoordY()) - value);
            } else {
                vehicles[i].setCoordX(Number(vehicles[i].getCoordX()) - value);
                vehicles[i].setCoordY(Number(vehicles[i].getCoordY()) + value);
            }
            await vehicles[i].save();
            console.log(vehicles[i]);
        }
    }, 5000);
}).catch(err => { console.log(err) })

app.use(cors(corsOptions));
app.use(express.json());

app.use('/vehicle', vehicleRoutes);

app.listen(3001);

