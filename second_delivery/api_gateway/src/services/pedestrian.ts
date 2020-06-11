import axios, { AxiosResponse } from 'axios';

let urlPedestrian: string = 'http://localhost:3003/pedestrian';

export async function GetPedestrians(): Promise<any> {
    var response: AxiosResponse = await axios.get(urlPedestrian);
    let pedestrians: [] = response.data;
    return pedestrians;
}
