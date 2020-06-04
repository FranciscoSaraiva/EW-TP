import { Request, Response } from 'express';
import axios from 'axios';
import { calculate_distance } from '../util/util';
import * as crosswalkService from '../services/crosswalk';
import * as pedestrianService from '../services/pedestrian';
import * as vehicleService from '../services/vehicle';

export async function index(req: Request, res: Response) {
    try {
        let crosswalks = await crosswalkService.GetCrosswalks();
        return res.send(crosswalks);

    } catch (error) {
        return res.status(500).send(error);
    }
}
/**
 * 0.000009 -> 1
 * 0.00045 -> 1.609344
 */
// TO DO FALTA ENVIAR NOTIFICAÇÕES. COMO? NÃO SEI 
export async function show(req: Request, res: Response) {
    try {
        let crosswalk = await crosswalkService.GetCrosswalk(Number(req.params.id));

        let pedestrians = await pedestrianService.GetPedestrians();

        let vehicles = await vehicleService.GetVehicles();

        let contPedestrian = 0;
        pedestrians.forEach(pedestrian => {
            console.log(pedestrian);
            let distance = calculate_distance(pedestrian.coord_x, pedestrian.coord_y, crosswalk.coord_x, crosswalk.coord_y);
            console.log(distance);
            if (distance < 1) {
                contPedestrian++;
            }
        });

        let contVehicle = 0;
        if (vehicles) {
            vehicles.forEach(vehicle => {
                let distance = calculate_distance(vehicle.coord_x, vehicle.corrd_y, crosswalk.coord_x, crosswalk.coord_y);
                console.log(distance);
                if (distance < 50) {
                    contVehicle++;
                }
            })
        }


        let crosswalk_obj = ChangeCrosswalk(contPedestrian, contVehicle);

        crosswalk = await crosswalkService.EditCrosswalk(Number(req.params.id), crosswalk_obj);

        return res.status(200).send(crosswalk);

    } catch (error) {
        return res.status(500).send(error);
    }
}

function ChangeCrosswalk(contPedestrian: number, contVehicle: number) {
    let obj;
    if (contPedestrian > 0 && contVehicle == 0) {
        // semaforo pedestres verde
        // semaforo veiculos vermelho
        obj = {
            state: "verde",
            totalPedestrian: contPedestrian
        }
    } else if (contPedestrian > 0 && contVehicle > 0) {
        // semaforo pedestres verde
        // semaforo veiculos vermelho
        obj = {
            state: "verde",
            totalPedestrian: contPedestrian,
            totalVehicle: contVehicle
        }
    } else if (contPedestrian == 0 && contVehicle > 0) {
        // semaforo pedestres vermelho
        // semaforo veiculos verde
        obj = {
            state: "vermelho",
            totalVehicle: contVehicle
        }
    } else if (contPedestrian == 0 && contVehicle == 0) {
        // semaforo pedestres vermelho
        // semaforo veiculos verde
        obj = {
            state: "vermelho"
        }
    }
    return obj;
}

export async function create(req: Request, res: Response) {
    try {
        var crosswalk = await crosswalkService.CreateCrosswalk(req.body);
        return res.send(200).send(crosswalk);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function update(req: Request, res: Response) {
    try {
        var crosswalk = await crosswalkService.UpdateCrosswalk(Number(req.params.id), req.body)
        return res.send(200).send(crosswalk);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function remove(req: Request, res: Response) {
    try {
        var crosswalk = await crosswalkService.DeleteCrosswalk(Number(req.params.id));
        return res.status(200).send(crosswalk);
    } catch (error) {
        return res.status(500).send(error);
    }
}