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


/**
 * Status -1 -> para de simular
 * Status 0 -> Continua a simular
 */
export async function pedestrainCheckCoord(lat: number, lng: number, name: string) {
    var response: AxiosResponse = await axios.get(`${urlCrosswalk}/check-proximity?lat=${lat}&lng=${lng}&isVehicle=no`);
    if (response.data.status == 0) {
        // Pode continuar a simular
        // Descartar as coordenadas do pedestre
        return {
            status: response.data.status
        }
    } else if (response.data.status == -1) {
        // Não pode continuar a simular
        // Atualizar as coordenadas do Pedestre (como? provavelmente com um identificador unico tipo numero de cidadao que vai ter de vir no pedido)
        // responder que ele pode andar
        return {
            status: response.data.status
        }
    }
}

/**
 * Status -1 -> para de simular
 * Status 0 -> Continua a simular
 */
export async function vehicleCheckCoord(lat: number, lng: number, license_plate: string) {
    var response: AxiosResponse = await axios.get(`${urlCrosswalk}/check-proximity?lat=${lat}&lng=${lng}&isVehicle=yes`);
    if (response.data.status == 0) {
        // Pode continuar a simular
        // Descartar as coordenadas do veiculo
        return {
            status: response.data.status
        }
    } else if (response.data.status == -1) {
        // Não pode continuar a simular
        // Atualizar as coordenadas do Veiculo (como? provavelmente com um identificador unico tipo matricula que vai ter de vir no pedido)
        // responder que ele pode andar
        return {
            status: response.data.status
        }
    }
}