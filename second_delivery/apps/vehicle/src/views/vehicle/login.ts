import { Vehicle } from "../../models/vehicle";
import { clear } from "console";
import inquirer from "inquirer";
import { GetVehicles } from "../../service/vehicle";
import chalk from "chalk";
import { MainMenuView } from "../main_menu";
import { LoggedMenuView } from "./vehicle_menu";

export async function LoginVehicleView() {
    clear();
    var vehicles: Vehicle[] = await GetVehicles();
    var vehicle: Vehicle;
    inquirer.prompt([
        { type: 'input', name: 'license_plate', message: 'Vehicle license plate?' },
    ])
        .then(async answer => {
            let license_plate: string = answer.license_plate;

            for (let index = 0; index < vehicles.length; index++) {
                let veh = vehicles[index];
                if (veh.getLicense_plate() == license_plate) {
                    clear();
                    console.log(chalk.greenBright('Login successful!'));
                    LoggedMenuView(veh);
                    return;
                }
            }
            clear();
            console.log(chalk.redBright('No vehicle found...'));
            MainMenuView();
            return;
        })
        .catch(err => { console.log(err) })
}