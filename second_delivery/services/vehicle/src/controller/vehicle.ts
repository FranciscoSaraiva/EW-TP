import { Request, Response } from 'express';
import { Vehicle } from '../models/vehicle';

export async function index(req: Request, res: Response) {
    try {
        let vehicles: Vehicle[] = await Vehicle.find();

        return res.send(vehicles);
    } catch (error) {
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
        let vehicle: Vehicle = new Vehicle(req.body.brand, req.body.model, req.body.license_plate, req.body.coord_x, req.body.coord_y);
        await vehicle.save();

        return res.send(vehicle);
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function update(req: Request, res: Response) {
    try {
        let vehicle: Vehicle = await Vehicle.findOne(req.params.id);

        await Vehicle.update(Number(vehicle.getId()), req.body);

        return res.send(vehicle);
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        let vehicle: Vehicle = await Vehicle.findOne(req.params.id);

        Vehicle.remove(vehicle);

        return res.send(vehicle);

    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}