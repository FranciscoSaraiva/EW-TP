import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import crosswalkRoutes from './routes/crosswalk';
import { Crosswalk } from './models/crosswalk';
import axios from 'axios';

const app = express();

var corsOptions = {
    origin: "*",
    methods: "*",
}

console.log('Service Crosswalk Port: 3002');
createConnection().then(async (connection) => {
    console.log('Connected ...')
    let crosswalk = new Crosswalk("avenida da liberdade", 41.55965, -8.40044, 1);
    await crosswalk.save();

    let state = 1;
    setInterval(async () => {
        /**
         * Lógica da Simulação do Semáforo 
         * Lógica do Semáforo devia ser mudada (vertente do carro ao invés do peão )
         * Passava a ser -1 vermelho 0 amarelo 1 verde 
         */
        let crosswalks = await Crosswalk.find();
        for (let i = 0; i < crosswalks.length; i++) {
            const crosswalk = crosswalks[i];
            if (state == 1) {
                state = 0;
                crosswalk.setState(0);
                await crosswalk.save()
            } else if (state == 0) {
                state = -1;
                crosswalk.setState(-1);
                await crosswalk.save()
            } else if (state == -1) {
                state = 1;
                crosswalk.setState(1);
                await crosswalk.save()
            }
        }
    }, 10000)
});



app.use(cors(corsOptions));
app.use(express.json());

app.use('/crosswalk', crosswalkRoutes);

app.listen(3002);

