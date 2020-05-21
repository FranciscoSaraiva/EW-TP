import axios, { AxiosResponse } from 'axios';
import { Pedestrian } from '../models/pedestrian';

export async function GetPedestrians(): Promise<Pedestrian[]> {
/*     var response: AxiosResponse = await axios.get('//localhost:3001/pedestrian');
    var pedestrians: Pedestrian[] = response.data;
    return pedestrians; */
    var peds = [];
    peds.push(new Pedestrian('André', 0,0));
    peds.push(new Pedestrian('Chico', 0,0));
    peds.push(new Pedestrian('Rui', 0,0));
    
    return peds;
}

export async function PostPedestrian(pedestrian: Pedestrian): Promise<Pedestrian> {
    var response: AxiosResponse = await axios.post('//localhost:3001/pedestrian', pedestrian);
    var pedestrian: Pedestrian = response.data;
    return pedestrian;
}