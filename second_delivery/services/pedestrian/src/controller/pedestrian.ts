import { Request, Response } from 'express';
import { Pedestrian } from '../models/pedestrian';

export async function index(req: Request, res: Response) {
    try {
        let pedestrians: Pedestrian[] = await Pedestrian.find();

        return res.send(pedestrians);
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function show(req: Request, res: Response) {
    try {
        let pedestrian: Pedestrian = await Pedestrian.findOne(req.params.id);

        return res.send(pedestrian);
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function create(req: Request, res: Response) {
    try {
        let pedestrian: Pedestrian = new Pedestrian(req.body.name, req.body.lat, req.body.lng);
        await pedestrian.save();

        return res.send(pedestrian);
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function update(req: Request, res: Response) {
    try {
        let pedestrian: Pedestrian = await Pedestrian.findOne(req.params.id);

        await Pedestrian.update(Number(pedestrian.getId()), req.body);

        return res.send(await Pedestrian.findOne(req.params.id));
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        let pedestrian: Pedestrian = await Pedestrian.findOne(req.params.id);

        Pedestrian.remove(pedestrian);

        return res.send(pedestrian);

    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}