import { Vehicle } from '../../models/vehicle';
import { MainMenuView } from '../main_menu';
import clear from 'clear';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { VehicleDetailsView } from './details';
import { EditVehicleView } from './edit_vehicle';
import { SimulateView } from '../simulation/simulate';

//options
const simulate_route = chalk.yellow('Simulate Route');
const edit_details = chalk.magenta('Edit details');
//---
const logout = 'Logout';

export function LoggedMenuView(vehicle: Vehicle): void {
    VehicleDetailsView(vehicle);
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose an option: ",
        choices: [simulate_route, edit_details, new inquirer.Separator(), logout]
    })
        .then(async answers => {
            switch (answers.option) {
                case simulate_route:
                    SimulateView(vehicle);
                    break;
                case edit_details:
                    EditVehicleView(vehicle);
                    break;
                //-------
                case logout:
                    clear();
                    MainMenuView();
                    break;
                default:
                    clear();
                    LoggedMenuView(vehicle);
                    break;
            }
        })
}
