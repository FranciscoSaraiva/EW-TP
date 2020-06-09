import axios, { AxiosResponse } from 'axios';
import { Vehicle } from '../models/vehicle';

const LOCALHOST = 'http://localhost:3001';

export async function GetVehicles(): Promise<Vehicle[]> {
    var response: AxiosResponse = await axios.get(LOCALHOST + '/vehicle');
    
    var vehicles: Vehicle[] = [];
    for (let index = 0; index < response.data.length; index++) {
        const vehicle = response.data[index];
        vehicles.push(new Vehicle(vehicle.id, vehicle.brand, vehicle.model, vehicle.license_plate, vehicle.lat, vehicle.lng));
    }
    return vehicles;
}

export async function PostVehicle(vehicle: Vehicle): Promise<Vehicle> {
    var response: AxiosResponse = await axios.post(LOCALHOST + '/vehicle', vehicle);
    var vehicle: Vehicle = response.data;
    return vehicle;
}

export async function EditVehicle(vehicle: Vehicle): Promise<Vehicle> {
    var response: AxiosResponse = await axios.put(LOCALHOST + '/vehicle/' + vehicle.getId(), vehicle);
    var vehicle: Vehicle = response.data;
    return vehicle;
}

export async function DeleteVehicle(id: Number): Promise<Vehicle> {
    var response: AxiosResponse = await axios.delete(LOCALHOST + '/vehicle/' + id);
    var vehicle: Vehicle = response.data;
    return vehicle;
}