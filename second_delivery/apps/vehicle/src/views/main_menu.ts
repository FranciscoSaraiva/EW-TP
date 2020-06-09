//imports
import clear from 'clear';
import chalk from 'chalk';
import inquirer from 'inquirer';
//local
import { RegisterVehicleView } from './vehicle/register';
import { LoginVehicleView } from './vehicle/login';

//options
const register = chalk.yellow('Register vehicle');
const login = chalk.blueBright('Login vehicle');
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
                RegisterVehicleView();
                break;
            case login:
                LoginVehicleView();
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