import { Pedestrian } from "../../models/pedestrian";
import { clear } from "console";
import inquirer from "inquirer";
import { GetPedestrians } from "../../service/pedestrian";
import chalk from "chalk";
import { MainMenuView } from "../main_menu";
import { LoggedMenuView } from "./pedestrian_menu";

export async function LoginPedestrianView() {
    clear();
    var pedestrians: Pedestrian[] = await GetPedestrians();
    var pedestrian: Pedestrian;
    inquirer.prompt([
        { type: 'input', name: 'name', message: 'Pedestrian name?' },
    ])
        .then(async answer => {
            let name: string = answer.name;

            for (let index = 0; index < pedestrians.length; index++) {
                let ped = pedestrians[index];
                if (ped.getName() == name) {
                    clear();
                    console.log(chalk.greenBright('Login successful!'));
                    LoggedMenuView(ped);
                    return;
                }
            }
            clear();
            console.log(chalk.redBright('No pedestrian found...'));
            MainMenuView();
            return;
        })
        .catch(err => { console.log(err) })
}