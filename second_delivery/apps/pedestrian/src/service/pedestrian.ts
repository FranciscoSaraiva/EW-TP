import axios, { AxiosResponse } from 'axios';
import { Pedestrian } from '../models/pedestrian';

export async function GetPedestrians(): Promise<Pedestrian[]> {
    var response: AxiosResponse = await axios.get('//localhost:3001/pedestrian');
    var pedestrians: Pedestrian[] = response.data;
    return pedestrians;
}

export async function PostPedestrian(pedestrian: Pedestrian) {
    axios.post('//localhost:3001/pedestrian', pedestrian)
        .then(data => { console.log(data.data) })
        .catch(err => { console.log(err) })
}