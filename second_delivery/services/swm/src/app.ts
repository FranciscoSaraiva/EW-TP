import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import crosswalkRoutes from './routes/crosswalk';
import { Crosswalk } from './models/crosswalk';

const app = express();

var corsOptions = {
    origin: "*",
    methods: "*",
}

console.log('Service Crosswalk Port: 3002');
createConnection().then(async (connection) => {
    let crosswalk = new Crosswalk("avenida da liberdade", 0.000000, 0.000000, "verde");
    await crosswalk.save();
    console.log('Connected ...')
});

app.use(cors(corsOptions));
app.use(express.json());

app.use('/crosswalk', crosswalkRoutes);

app.listen(3002);

