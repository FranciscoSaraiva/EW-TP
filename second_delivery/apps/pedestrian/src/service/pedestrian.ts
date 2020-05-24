import axios, { AxiosResponse } from 'axios';
import { Pedestrian } from '../models/pedestrian';

export async function GetPedestrians(): Promise<Pedestrian[]> {
    var response: AxiosResponse = await axios.get('http://localhost:3001/pedestrian');
    var pedestrians: Pedestrian[] = [];
    for (let index = 0; index < response.data.length; index++) {
        const pedestrian = response.data[index];
        pedestrians.push(new Pedestrian(pedestrian.name, pedestrian.coord_x, pedestrian.coord_y));
    }
    return pedestrians;
}

export async function PostPedestrian(pedestrian: Pedestrian): Promise<Pedestrian> {
    var response: AxiosResponse = await axios.post('http://localhost:3001/pedestrian', pedestrian);
    var pedestrian: Pedestrian = response.data;
    return pedestrian;
}