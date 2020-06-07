import { Pedestrian } from '../../models/pedestrian';
import { MainMenuView } from '../main_menu';
import clear from 'clear';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { PedestrianDetailsView } from './details';
import { EditPedestrianView } from './edit_pedestrian';
import { SimulateView } from '../simulation/simulate';

//options
const simulate_route = chalk.yellow('Simulate Route');
const edit_details = chalk.magenta('Edit details');
//---
const logout = 'Logout';

export function LoggedMenuView(pedestrian: Pedestrian): void {
    PedestrianDetailsView(pedestrian);
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose an option: ",
        choices: [simulate_route, edit_details, new inquirer.Separator(), logout]
    })
        .then(async answers => {
            switch (answers.option) {
                case simulate_route:
                    SimulateView(pedestrian);
                    break;
                case edit_details:
                    EditPedestrianView(pedestrian);
                    break;
                //-------
                case logout:
                    clear();
                    MainMenuView();
                    break;
                default:
                    clear();
                    LoggedMenuView(pedestrian);
                    break;
            }
        })
}
