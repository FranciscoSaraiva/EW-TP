import axios, { AxiosResponse } from 'axios';

let urlCrosswalk: string = 'http://localhost:3002/crosswalk';

export async function GetCrosswalks(): Promise<any> {
    var response: AxiosResponse = await axios.get(urlCrosswalk);
    var crosswalks: [] = response.data;
    return crosswalks;
}

export async function GetCrosswalk(id: number): Promise<any> {
    var response: AxiosResponse = await axios.get(`${urlCrosswalk}/${id}`);
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

export async function pedestrainCheckCoord() {

}

export async function vehicleCheckCoord() {

}