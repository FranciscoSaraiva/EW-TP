import { Request, Response } from 'express';
import { Crosswalk } from '../models/crosswalk';
import { Record } from '../models/record';

export async function index(req: Request, res: Response) {
    try {
        let crosswalks: Crosswalk[] = await Crosswalk.find();

        return res.send(crosswalks);
    } catch (error) {
        return res.status(500).send({ message: "Alguma coisa correu mal ...", error });
    }
}

export async function show(req: Request, res: Response) {
    try {
        let crosswalk: Crosswalk = await Crosswalk.findOne(req.params.id);

        return res.send(crosswalk);
    } catch (error) {
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

        let record_crosswalk: Record = await Record.findOne({ where: { date: new Date().toISOString().substr(0, 10), crosswalk } });

        if (!record_crosswalk) {
            record_crosswalk = new Record(new Date(), crosswalk);
            await record_crosswalk.save();
        }

        if (req.body.totalPedestrian) {
            record_crosswalk.setTotalPedestrians(record_crosswalk.getTotalPedestrians() + req.body.totalPedestrian);
            await record_crosswalk.save();
            delete req.body.totalPedestrian;
        }

        if (req.body.totalVehicle) {
            record_crosswalk.setTotalVehicles(record_crosswalk.getTotalVehicles() + req.body.totalVehicle);
            await record_crosswalk.save();
            delete req.body.totalVehicle;
        }

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