//imports
import clear from 'clear';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { RegisterPedestrianView } from './pedestrian/register';
import { LoginPedestrianView } from './pedestrian/login';

//options
const register = chalk.yellow('Register pedestrian');
const login = chalk.blueBright('Login pedestrian');
//---
const exit = 'Exit';

export function MainMenuView(): void {
    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose an option: ",
        choices: [register, login, new inquirer.Separator(), exit]
    }).then(async answers => {
        switch (answers.option) {
            case register:
                RegisterPedestrianView();
                break;
            case login:
                LoginPedestrianView();
                break;
            //-------
            case exit:
                process.exit(0);
            default:
                clear();
                MainMenuView();
                break;
        }
    })
}