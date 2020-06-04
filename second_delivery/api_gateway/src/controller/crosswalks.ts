import { Request, Response } from 'express';
import axios from 'axios';
import { calculate_distance } from '../util/util';
let urlCrosswalk = 'http://localhost:3002/crosswalk';
let urlPedestrian = 'http://localhost:3003/pedestrian';
let urlVechicle = 'http://localhost:3001/vehicle';

export async function index(req: Request, res: Response) {
    try {
        let crosswalks = await axios.get(urlCrosswalk).then(data => {
            return data.data;
        }).catch(error => {
            return error;
        });

        return res.send(crosswalks);

    } catch (error) {
        return res.status(500).send(error);
    }
}
/**
 * 0.000009 -> 1
 * 0.00045 -> 1.609344
 */
export async function show(req: Request, res: Response) {
    try {
        let crosswalk = await axios.get(urlCrosswalk + '/' + req.params.id).then(data => {
            return data.data
        }).catch(error => {
            return error;
        });

        let pedestrians = await axios.get(urlPedestrian).then(data => {
            return data.data;
        }).catch(error => {
            return error;
        })

        let vehicles = await axios.get(urlVechicle).then(data => {
            return data.data;
        }).catch(error => {
            return error;
        })

        let contPedestrian = 0;
        pedestrians.forEach(pedestrian => {
            let distance = calculate_distance(pedestrian.coord_x, pedestrian.corrd_y, crosswalk.coord_x, crosswalk.coord_y);
            if (distance < 10) {
                contPedestrian++;
            }
        });

        let contVehicle = 0;
        vehicles.forEach(vehicle => {
            let distance = calculate_distance(vehicle.coord_x, vehicle.corrd_y, crosswalk.coord_x, crosswalk.coord_y);
            if (distance < 50) {
                contVehicle++;
            }
        })

        if (contPedestrian > 0 && contVehicle == 0) {
            // pedido a mudar o semafro da crosswalk
            // semaforo pedestres verde
            // semaforo veiculos vermelho
            crosswalk = await axios.put(urlCrosswalk + '/' + req.params.id, { state: "verde", totalPedestrian: contPedestrian })
                .then(data => {
                    return data.data
                })
                .catch(error => {
                    return error
                })
        } else if (contPedestrian > 0 && contVehicle > 0) {
            // pedido a mudar o semafro da crosswalk
            // semaforo pedestres verde
            // semaforo veiculos vermelho
            crosswalk = await axios.put(urlCrosswalk + '/' + req.params.id, { state: "verde", totalPedestrian: contPedestrian, totalVehicle: contVehicle })
                .then(data => {
                    return data.data
                })
                .catch(error => {
                    return error
                })
        } else if (contPedestrian == 0 && contVehicle > 0) {
            // pedido a mudar o semafro da crosswalk
            // semaforo pedestres vermelho
            // semaforo veiculos verde
            crosswalk = await axios.put(urlCrosswalk + '/' + req.params.id, { state: "vermelho", totalVehicle: contVehicle })
                .then(data => {
                    return data.data
                })
                .catch(error => {
                    return error
                })
        } else if (contPedestrian == 0 && contVehicle == 0) {
            // pedido a mudar o semafro da crosswalk
            // semaforo pedestres vermelho
            // semaforo veiculos verde
            crosswalk = await axios.put(urlCrosswalk + '/' + req.params.id, { state: "vermelho" })
                .then(data => {
                    return data.data
                })
                .catch(error => {
                    return error
                })
        }

        return res.status(200).send(crosswalk);

    } catch (error) {
        return res.status(500).send(error);
    }
}