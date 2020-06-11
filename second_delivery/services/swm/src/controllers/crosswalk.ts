import axios, { AxiosResponse } from 'axios';

import { Request, Response } from 'express';
import { Crosswalk } from '../models/crosswalk';
import { Record } from '../models/record';

const urlPedestrian = 'http://localhost:3003/pedestrian';
const urlVehicle = 'http://localhost:3001/vehicle';

export async function index(req: Request, res: Response) {
    try {
        let crosswalks: Crosswalk[] = await Crosswalk.find();
        let response = []
        for (let i = 0; i < crosswalks.length; i++) {
            const crosswalk = crosswalks[i];
            let record: Record = await Record.findOne({ where: { crosswalk } });
            if (!record) {
                record = new Record(new Date(), crosswalk)
                record.setTotalVehicles(0);
                record.setTotalPedestrians(0);
                await record.save();
            }
            response.push({ crosswalk, record });
        }

        return res.send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function show(req: Request, res: Response) {
    try {
        let crosswalk: Crosswalk = await Crosswalk.findOne({ where: { id: req.params.id } });

        let pedestrians: AxiosResponse = await axios.get(`${urlPedestrian}/`)
        let vehicles: AxiosResponse = await axios.get(`${urlVehicle}/`);

        let res_pedestrians = pedestrians.data;
        let res_vehicles = vehicles.data;

        if (pedestrians.data >= 0) {
            for (let i = 0; i < pedestrians.data.length; i++) {
                const pedestrian = pedestrians.data[i];
                if (checkDistance(crosswalk, pedestrian.lat, pedestrian.lng, 100)) {
                    res_pedestrians.push(pedestrian);
                }
            }
        }

        if (vehicles.data >= 0) {
            for (let i = 0; i < vehicles.data.length; i++) {
                const vehicle = vehicles.data[i];
                if (checkDistance(crosswalk, vehicle.lat, vehicle.lng, 200)) {
                    res_vehicles.push(vehicle);
                }
            }
        }

        let response = {
            crosswalk,
            res_pedestrians,
            res_vehicles
        }

        return res.send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function create(req: Request, res: Response) {
    try {
        let crosswalk: Crosswalk = new Crosswalk(req.body.address, req.body.coord_x, req.body.coord_y, req.body.state);
        await crosswalk.save();

        return res.send(crosswalk);
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function update(req: Request, res: Response) {
    try {
        let crosswalk: Crosswalk = await Crosswalk.findOne(req.params.id);

        await Crosswalk.update(Number(crosswalk.getId()), req.body);

        return res.send(crosswalk);
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        let crosswalk: Crosswalk = await Crosswalk.findOne(req.params.id);

        Crosswalk.remove(crosswalk);

        return res.send(crosswalk);

    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

async function checkPedestriansInRange(lat: number, lng: number): Promise<boolean> {
    let inRange: boolean = false;
    let pedestrians: AxiosResponse = await axios.get(`${urlPedestrian}/`)
    if (pedestrians.data.length > 0) {
        for (let i = 0; i < pedestrians.data.length; i++) {
            var pedestrian = pedestrians.data[i];
            var crosswalk = new Crosswalk("template", lat, lng, 0);
            if (checkDistance(crosswalk, pedestrian.lat, pedestrian.lng, 100)) { //100 metros de distância alerta
                inRange = true;
                break;
            }
        }
    }
    return inRange;
}

export async function checkProximityToContinueSimulating(req: Request, res: Response) {
    try {

        let crosswalks: Crosswalk[] = await Crosswalk.find();

        let lat: number = Number(req.query.lat);
        let lng: number = Number(req.query.lng);

        let isVehicle: string = req.query.isVehicle.toString();

        /**
         * status -> 0 -> Pode continuar a simular
         * status -> -1 -> Tem de parar de simular
         */
        let status: number[] = [];

        let carAllowedToContinue: boolean[] = [];
        let pedestrianInRange: boolean = false;

        for (let i = 0; i < crosswalks.length; i++) {
            const crosswalk = crosswalks[i];
            if (isVehicle == "yes") {
                let vehicleState: object = await checkForVehicleState(crosswalk, lat, lng);
                status.push(vehicleState['status']);
                carAllowedToContinue.push(vehicleState['carAllowedToContinue']);
            } else {
                let pedestrianState: object = await checkForPedestrianState(crosswalk, lat, lng);
                status.push(pedestrianState['status']);
            }
        }
        if (isVehicle == "yes") {
            pedestrianInRange = await checkPedestriansInRange(lat, lng);
        }

        switch (isVehicle) {
            case "yes":
                if (status.filter(status => { return status == -1 }).length > 0 || carAllowedToContinue.filter(status => { return status == true }).length > 0) {
                    await checkSimulatorContinue(isVehicle, req.query.license_plate.toString(), lat, lng);
                } else {
                    await checkDatabaseForEdit(isVehicle, req.query.license_plate.toString());
                }
                break;
            case "no":
                if (status.filter(status => { return status == 0 }).length > 0) {
                    await checkSimulatorContinue(isVehicle, req.query.name.toString(), lat, lng);
                } else {
                    await checkDatabaseForEdit(isVehicle, req.query.name.toString());
                }
                break;
        }

        return res.send({
            "status": (status.filter(status => { return status == -1 }).length > 0) ? -1 : 0,
            "pedestrianInRange": pedestrianInRange
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

function checkDistance(crosswalk: Crosswalk, lat: number, lng: number, distance: number) {
    if ((crosswalk.getLat() == lat) && (crosswalk.getLng() == lng)) {
        return true;
    }

    var radlat1 = Math.PI * Number(crosswalk.getLat()) / 180;
    var radlat2 = Math.PI * lat / 180;
    var theta = Number(crosswalk.getLng()) - lng;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1609.344;
    if (dist < distance) {
        return true;
    }
    return false;
}

async function checkForVehicleState(crosswalk: Crosswalk, lat: number, lng: number): Promise<object> {
    let status: number;
    let carAllowedToContinue: boolean = false;
    if (checkDistance(crosswalk, lat, lng, 200)) {
        if (crosswalk.getState() == -1 || crosswalk.getState() == 0) {
            status = -1;
        } else {
            status = 0;
        }
        carAllowedToContinue = true;
        let record: Record = await Record.findOne({ where: { crosswalk } });
        if (record) {
            record.setTotalVehicles(Number(record.getTotalVehicles()) + 1);
        }
        else
            record = new Record(new Date(), crosswalk);
        await record.save();
    } else {
        status = 0;
    }
    return { status, carAllowedToContinue };
}

async function checkForPedestrianState(crosswalk: Crosswalk, lat: number, lng: number): Promise<object> {
    var status = 0;
    var pedestrianInRange = false;
    if (checkDistance(crosswalk, lat, lng, 100)) {
        if (crosswalk.getState() == -1 || crosswalk.getState() == 0) {
            status = 0;
        } else {
            status = -1;
        }
        let record: Record = await Record.findOne({ where: { crosswalk } });
        if (record) {
            record.setTotalPedestrians(Number(record.getTotalPedestrians()) + 1);
        }
        else
            record = new Record(new Date(), crosswalk);
        await record.save();

        pedestrianInRange = true;
    } else {
        status = 0;
    }
    return { status, pedestrianInRange };
}

async function checkSimulatorContinue(isVehicle: string, identifier: string, lat: number, lng: number) {
    try {
        if (isVehicle == "yes") {
            let hasVehicle: AxiosResponse = await axios.get(`${urlVehicle}?license_plate=${identifier}`);
            if (hasVehicle.data.id >= 0) {
                await axios.put(`${urlVehicle}/${hasVehicle.data.id}`, { lat, lng });
            } else {
                await axios.post(`${urlVehicle}`, { license_plate: identifier, brand: 'honda', model: 'crx', lat, lng });
            }
        } else {
            let hasPedestrian: AxiosResponse = await axios.get(`${urlPedestrian}?name=${identifier}`);
            if (hasPedestrian.data.id >= 0) {
                await axios.put(`${urlPedestrian}/${hasPedestrian.data.id}`, { lat, lng });
            } else {
                await axios.post(`${urlPedestrian}`, { name: identifier, lat, lng });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function checkDatabaseForEdit(isVehicle: string, identifier: string) {
    try {
        if (isVehicle == "yes") {
            let hasVehicle: AxiosResponse = await axios.get(`${urlVehicle}?license_plate=${identifier}`);
            if (hasVehicle.data.id >= 0) {
                await axios.put(`${urlVehicle}/${hasVehicle.data.id}`, { lat: 0, lng: 0 })
            }
        } else {
            let hasPedestrian: AxiosResponse = await axios.get(`${urlPedestrian}?name=${identifier}`);
            if (hasPedestrian.data.id >= 0) {
                await axios.put(`${urlPedestrian}/${hasPedestrian.data.id}`, { lat: 0, lng: 0 });
            }
        }
    } catch (error) {
        console.log(error);
    }

}