import { Pedestrian } from '../models/pedestrian';
import { GetPedestrians, PostPedestrian } from '../service/pedestrian';
import { CreateTable } from './application';
import Table from 'cli-table';
import { MainMenu } from './main_menu';
import clear from 'clear';
import inquirer from 'inquirer';
import chalk from 'chalk';

export async function ListPedestrians() {
    var pedestrians: Pedestrian[] = await GetPedestrians();
    var pedRows: any[] = [];
    for (let index = 0; index < pedestrians.length; index++) {
        const ped = pedestrians[index];
        pedRows.push([ped.getName(), ped.getCoordX(), ped.getCoordY()])
    }
    var table: Table = CreateTable(['Name', 'Coordinate X', 'Coordinate Y'], pedRows);
    clear();
    console.log(table.toString());
    ListPedestriansMenu();
}

function ListPedestriansMenu() {
    const simulate_pedestrians = chalk.blueBright('Simulate pedestrians');
    const back = chalk.red('Back');

    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose an option: ",
        choices: [simulate_pedestrians, new inquirer.Separator(), back]
    })
        .then(answer => {
            switch (answer.option) {
                case simulate_pedestrians:
                    console.log('simulating placeholder...')
                    ListPedestriansMenu();
                    break;
                case back:
                    clear();
                    MainMenu();
                default:
                    clear();
                    MainMenu();
                    break;
            }
        })
        .catch(err => { console.log(err) })
}

export async function AddPedestrian() {
    var pedestrian: Pedestrian;
    inquirer.prompt([
        { type: 'input', name: 'name', message: 'Pedestrian name?' },
    ])
        .then(async answer => {
            let name: string = answer.name;
            pedestrian = new Pedestrian(name, 0, 0);
            //await PostPedestrian(pedestrian);
            clear();
            console.log(chalk.green('Pedestrian created!'));
            console.log(chalk.blue('Pedestrian: ') + chalk.magenta(pedestrian.getName()));
            MainMenu();
        })
        .catch(err => { console.log(err) })
}

export async function EditPedestrian() {

}

export async function DeletePedestrian() {

}