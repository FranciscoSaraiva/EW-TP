//imports
import clear from 'clear';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { ListPedestrians, AddPedestrian } from './pedestrian_menu';


//options
const list_pedestrians = chalk.blueBright('Check pedestrians');
const add_pedestrian = chalk.blueBright('Add pedestrian');
//---
const exit = chalk.red('Exit');

export function MainMenu(): void {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose an option: ",
        choices: [list_pedestrians, add_pedestrian, new inquirer.Separator(), exit]
    })
        .then(answers => {
            switch (answers.option) {
                case list_pedestrians:
                    ListPedestrians();
                    break;
                case add_pedestrian:
                    AddPedestrian();
                    break;
                case exit:
                    process.exit(0);
                default:
                    clear();
                    MainMenu();
                    break;
            }
        })
}