import { PostPedestrian } from "../../service/pedestrian";
import inquirer from "inquirer";
import chalk from "chalk";
import { clear } from "console";
import { Pedestrian } from "../../models/pedestrian";
import { LoggedMenuView } from "./pedestrian_menu";

export function RegisterPedestrianView() {
    clear();
    var pedestrian: Pedestrian;
    inquirer.prompt([
        { type: 'input', name: 'name', message: 'Pedestrian name?' },
    ])
        .then(async answer => {
            let name: string = answer.name;
            pedestrian = new Pedestrian(null, name, 0, 0);
            let response_ped: any = await PostPedestrian(pedestrian);
            pedestrian.setId(response_ped.id);
            clear();
            console.log(chalk.green('Pedestrian created!'));
            console.log(chalk.blue('Pedestrian: ') + chalk.magenta(pedestrian.getName()));
            LoggedMenuView(pedestrian);
        })
        .catch(err => { console.log(err) })
}
