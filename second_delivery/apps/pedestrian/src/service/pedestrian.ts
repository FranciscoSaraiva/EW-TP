import axios, { AxiosResponse } from 'axios';
import { Pedestrian } from '../models/pedestrian';

const LOCALHOST = 'http://localhost:3003';

export async function GetPedestrians(): Promise<Pedestrian[]> {
    var response: AxiosResponse = await axios.get(LOCALHOST + '/pedestrian');

    var pedestrians: Pedestrian[] = [];
    for (let index = 0; index < response.data.length; index++) {
        const pedestrian = response.data[index];
        pedestrians.push(new Pedestrian(pedestrian.id, pedestrian.name, pedestrian.coord_x, pedestrian.coord_y));
    }
    return pedestrians;
}

export async function PostPedestrian(pedestrian: Pedestrian): Promise<Pedestrian> {
    var response: AxiosResponse = await axios.post(LOCALHOST + '/pedestrian', pedestrian);

    var pedestrian: Pedestrian = response.data;
    return pedestrian;
}

export async function EditPedestrian(pedestrian: Pedestrian): Promise<Pedestrian> {
    var response: AxiosResponse = await axios.put(LOCALHOST + '/pedestrian/' + pedestrian.getId(), pedestrian);

    var pedestrian: Pedestrian = response.data;
    return pedestrian;
}

export async function DeletePedestrian(id: Number): Promise<Pedestrian> {
    var response: AxiosResponse = await axios.delete(LOCALHOST + '/pedestrian/' + id);

    var pedestrian: Pedestrian = response.data;
    return pedestrian;
}