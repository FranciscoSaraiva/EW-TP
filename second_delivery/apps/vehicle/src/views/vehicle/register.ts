import { PostVehicle } from "../../service/vehicle";
import inquirer from "inquirer";
import chalk from "chalk";
import { clear } from "console";
import { Vehicle } from "../../models/vehicle";
import { LoggedMenuView } from "./vehicle_menu";

export function RegisterVehicleView() {
    clear();
    var vehicle: Vehicle;
    inquirer.prompt([
        { type: 'input', name: 'brand', message: 'Vehicle brand?' },
        { type: 'input', name: 'model', message: 'Vehicle model?' },
        { type: 'input', name: 'license_plate', message: 'Vehicle license plate?' },
    ])
        .then(async answer => {
            let brand: string = answer.brand;
            let model: string = answer.model;
            let license_plate: string = answer.license_plate;

            vehicle = new Vehicle(null, brand, model, license_plate, 0, 0);
            let response_veh: any = await PostVehicle(vehicle);
            vehicle.setId(response_veh.id);

            clear();
            console.log(chalk.green('Vehicle created!'));
            console.log(chalk.blue('Vehicle: ') + chalk.magenta(vehicle.getLicense_plate()));
            LoggedMenuView(vehicle);
        })
        .catch(err => { console.log(err) })
}
