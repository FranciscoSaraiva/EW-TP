import { Request, Response } from 'express';
import { Vehicle } from '../models/vehicle';

export async function index(req: Request, res: Response) {
    try {

        let response: any;
        if (req.query.license_plate) {
            response = await Vehicle.findOne({
                where: {
                    license_plate: req.query.license_plate
                }
            })
        } else {
            response = await Vehicle.find();
        }

        return res.send(response);

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function show(req: Request, res: Response) {
    try {
        let vehicles: Vehicle = await Vehicle.findOne(req.params.id);

        return res.send(vehicles);
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function create(req: Request, res: Response) {
    try {
        let vehicle: Vehicle = new Vehicle(req.body.brand, req.body.model, req.body.license_plate, req.body.lat, req.body.lng);
        await vehicle.save();

        return res.send(vehicle);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function update(req: Request, res: Response) {
    try {
        let vehicle: Vehicle = await Vehicle.findOne(req.params.id);
        if (vehicle) {
            console.log('entrei aqui2 ' + new Date());
            await Vehicle.update(Number(vehicle.getId()), req.body);
        }

        return res.send(await Vehicle.findOne(req.params.id));
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        let vehicle: Vehicle = await Vehicle.findOne(req.params.id);
        console.log('entrei aqui ' + new Date());
        if (vehicle) {
            Vehicle.remove(vehicle);
        }
        return res.send(true);

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}