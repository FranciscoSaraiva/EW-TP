import axios, { AxiosResponse } from 'axios';

let urlCrosswalk: string = 'http://localhost:3002';

export async function GetCrosswalks(): Promise<any> {
    try {
        var response: AxiosResponse = await axios.get(`${urlCrosswalk}/crosswalk`);
        var crosswalks: [] = response.data;
        return crosswalks;
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
    var response: AxiosResponse = await axios.post(urlCrosswalk, crosswalk);
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
export async function pedestrainCheckCoord(lat: number, lng: number, name: string) {
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
            status: response.data.status
        }
    } catch (e) {
        console.log(e);
    }

}