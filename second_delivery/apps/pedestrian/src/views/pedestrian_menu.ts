import axios from 'axios';
import { Pedestrian } from '../models/pedestrian';
import { GetPedestrians, PostPedestrian } from '../service/pedestrian';

export async function ListPedestriansView() {
    await GetPedestrians();
}

export async function AddPedestrian() {
    var pedestrian: Pedestrian = new Pedestrian('', 0, 0);
    PostPedestrian(pedestrian);
}