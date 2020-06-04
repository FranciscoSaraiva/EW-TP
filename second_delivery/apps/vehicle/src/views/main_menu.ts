//imports
import clear from 'clear';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { ListVehiclesView, AddVehicleView, EditVehicleView, DeleteVehicleView } from './vehicle_menu';


//options
const list_vehicles = chalk.yellow('Check vehicles');
const add_vehicle = chalk.blueBright('Add vehicle');
const edit_vehicle = chalk.magenta('Edit vehicle');
const delete_vehicle = chalk.redBright('Delete vehicle');
//---
const exit = 'Exit';

export function MainMenu(): void {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose an option: ",
        choices: [list_vehicles, add_vehicle, edit_vehicle, delete_vehicle, new inquirer.Separator(), exit]
    })
        .then(async answers => {
            switch (answers.option) {
                case list_vehicles:
                    ListVehiclesView();
                    break;
                case add_vehicle:
                    AddVehicleView();
                    break;
                case edit_vehicle:
                    EditVehicleView();
                    break;
                case delete_vehicle:
                    DeleteVehicleView();
                    break;
                //-------
                case exit:
                    process.exit(0);
                default:
                    clear();
                    MainMenu();
                    break;
            }
        })
}