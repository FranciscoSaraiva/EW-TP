import { Vehicle } from "../../models/vehicle";
import inquirer from "inquirer";
import { EditVehicle, GetVehicles } from "../../service/vehicle";
import { clear } from "console";
import { LoggedMenuView } from "./vehicle_menu";

export async function EditVehicleView(vehicle: Vehicle) {
    var vehicles: Vehicle[] = await GetVehicles();

    let id: Number = vehicle.getId();
    let brand: String = vehicle.getBrand();
    let model: String = vehicle.getModel();
    let license_plate: String = vehicle.getLicense_plate();
    let lat: Number = vehicle.getLat();
    let lng: Number = vehicle.getLng();

    inquirer.prompt([
        { type: "input", name: 'brand', message: 'Brand? (leave blank to skip)' },
        { type: "input", name: 'model', message: 'Model? (leave blank to skip)' },
        { type: "input", name: 'license_plate', message: 'License Plate? (leave blank to skip)' },
        { type: "input", name: 'lat', message: 'Coordinate X (leave blank to skip)' },
        { type: "input", name: 'lng', message: 'Coordinate Y (leave blank to skip)' }
    ])
        .then(async answers => {
            brand = (answers.brand == "") ? brand : answers.brand;
            model = (answers.model == "") ? model : answers.model;
            license_plate = (answers.license_plate == "") ? license_plate : answers.license_plate;
            lat = (answers.lat == "") ? lat : answers.lat;
            lng = (answers.lng == "") ? lng : answers.lng;

            var vehicle: Vehicle = new Vehicle(id, brand, model, license_plate, lat, lng);
            console.log(vehicle)
            await EditVehicle(vehicle);
            clear();
            console.log(`Edited vehicle >> ${vehicle.getLicense_plate()} [${vehicle.getLat()}/${vehicle.getLng()}] <<`)
            LoggedMenuView(vehicle);
        })
        .catch(err => { console.log(err) })
}