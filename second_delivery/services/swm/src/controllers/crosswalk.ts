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
        let status: number = 0;

        for (let i = 0; i < crosswalks.length; i++) {
            const crosswalk = crosswalks[i];
            if (isVehicle == "yes") {
                if (checkDistance(crosswalk, lat, lng, 50)) {
                    if (crosswalk.getState() == -1 || crosswalk.getState() == 0) {
                        // está verde para peões
                        status = -1;
                    } else {
                        // está verde para carros
                        status = 0;
                    }
                    // To Do Alterar isto
                    // Se não existir nenhum Record daquele dia
                    // Deve criar um record novo para aquela crosswalk
                    let record: Record = await Record.findOne({ where: { crosswalk } });
                    record.setTotalVehicles(Number(record.getTotalVehicles()) + 1);
                    await record.save();
                } else {
                    status = 0;
                }
            } else {
                if (checkDistance(crosswalk, lat, lng, 10)) {
                    // To Do Alterar isto
                    // Se não existir nenhum Record daquele dia
                    // Deve criar um record novo para aquela crosswalk
                    let record: Record = await Record.findOne({ where: { crosswalk } });
                    record.setTotalPedestrians(Number(record.getTotalPedestrians()) + 1);
                    await record.save();
                    crosswalk.setState(-1);
                    await crosswalk.save();
                    status = 0;
                } else {
                    status = 0;
                }
            }
        }

        return res.send({ status });

    } catch (error) {
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
    // mile -> meter = 1 609.344
    dist = dist * 1609.344;
    if (dist < distance) {
        return true;
    }
    return false;

}