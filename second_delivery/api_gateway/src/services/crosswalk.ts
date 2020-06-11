import axios, { AxiosResponse } from 'axios';
import Axios from 'axios';

let urlCrosswalk: string = 'http://localhost:3002';
let urlPedestrian: string = 'http://localhost:3003/pedestrian';
let urlVehicles: string = 'http://localhost:3001/vehicle';

export async function GetCrosswalks(): Promise<any> {
    try {
        var response: AxiosResponse = await axios.get(`${urlCrosswalk}/crosswalk`);
        var crosswalks: [] = response.data;
        response = await axios.get(`${urlPedestrian}`);
        var pedestrians: [] = response.data;
        response = await axios.get(`${urlVehicles}`);
        var vehicles: [] = response.data;
        return {
            crosswalks,
            pedestrians,
            vehicles
        };
    } catch (error) {
        console.log(error);
    }

}

export async function GetCrosswalk(id: number): Promise<any> {
    var response: AxiosResponse = await axios.get(`${urlCrosswalk}/crosswalk/${id}`);
    var crosswalk: {} = response.data;
    return crosswalk;
}

export async function EditCrosswalk(id: number, obj: {}): Promise<any> {
    var response: AxiosResponse = await axios.put(`${urlCrosswalk}/${id}`, obj);
    var crosswalk: {} = response.data;
    return crosswalk;
}

export async function CreateCrosswalk(crosswalk: {}): Promise<any> {
    var response: AxiosResponse = await axios.post(`${urlCrosswalk}/crosswalk/`, crosswalk);
    var crosswalk: {} = response.data;
    return crosswalk;
}

export async function UpdateCrosswalk(id: number, crosswalk: {}): Promise<any> {
    var response: AxiosResponse = await axios.put(`${urlCrosswalk}/${id}`, crosswalk);
    var crosswalk: {} = response.data;
    return crosswalk;
}

export async function DeleteCrosswalk(id: number): Promise<any> {
    var response: AxiosResponse = await axios.delete(`${urlCrosswalk}/${id}`);
    var crosswalk: {} = response.data;
    return crosswalk;
}

/**
 * Status -1 -> para de simular
 * Status 0 -> Continua a simular
 */
export async function pedestrianCheckCoord(lat: number, lng: number, name: string) {
    var response: AxiosResponse = await axios.get(`${urlCrosswalk}/crosswalk/check-proximity?lat=${lat}&lng=${lng}&name=${name}&isVehicle=no`);

    return {
        status: response.data.status
    }
}

/**
 * Status -1 -> para de simular
 * Status 0 -> Continua a simular
 */
export async function vehicleCheckCoord(lat: number, lng: number, license_plate: string) {
    try {
        var response: AxiosResponse = await axios.get(`${urlCrosswalk}/crosswalk/check-proximity?lat=${lat}&lng=${lng}&license_plate=${license_plate}&isVehicle=yes`);
        return {
            status: response.data.status,
            pedestrianInRange: response.data.pedestrianInRange
        }
    } catch (e) {
        console.log(e);
    }

}