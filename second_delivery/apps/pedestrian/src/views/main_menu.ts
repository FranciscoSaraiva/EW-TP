//imports
import clear from 'clear';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { ListPedestriansView, AddPedestrianView, EditPedestrianView, DeletePedestrianView } from './pedestrian_menu';


//options
const list_pedestrians = chalk.yellow('Check pedestrians');
const add_pedestrian = chalk.blueBright('Add pedestrian');
const edit_pedestrian = chalk.magenta('Edit pedestrian');
const delete_pedestrian = chalk.redBright('Delete pedestrian');
//---
const exit = 'Exit';

export function MainMenu(): void {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose an option: ",
        choices: [list_pedestrians, add_pedestrian, edit_pedestrian, delete_pedestrian, new inquirer.Separator(), exit]
    })
        .then(async answers => {
            switch (answers.option) {
                case list_pedestrians:
                    ListPedestriansView();
                    break;
                case add_pedestrian:
                    AddPedestrianView();
                    break;
                case edit_pedestrian:
                    EditPedestrianView();
                    break;
                case delete_pedestrian:
                    DeletePedestrianView();
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