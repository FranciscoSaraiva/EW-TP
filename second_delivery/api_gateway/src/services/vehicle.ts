import axios, { AxiosResponse } from 'axios'

let urlVechicle = 'http://localhost:3001/vehicle';

export async function GetVehicles(): Promise<any> {
    var response: AxiosResponse = await axios.get(urlVechicle);
    var vehicles: [] = response.data;
    return vehicles;
}