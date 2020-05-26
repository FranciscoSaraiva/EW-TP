import { Pedestrian } from '../models/pedestrian';
import { GetPedestrians, PostPedestrian, EditPedestrian } from '../service/pedestrian';
import { CreateTable } from './application';
import Table from 'cli-table';
import { MainMenu } from './main_menu';
import clear from 'clear';
import inquirer from 'inquirer';
import chalk from 'chalk';

export async function ListPedestriansView() {
    var pedestrians: Pedestrian[] = await GetPedestrians();
    var pedRows: any[] = [];
    for (let index = 0; index < pedestrians.length; index++) {
        const ped = pedestrians[index];
        pedRows.push([ped.getName(), ped.getCoordX(), ped.getCoordY()])
    }
    var table: Table = CreateTable(['Name', 'Coordinate X', 'Coordinate Y'], pedRows);
    clear();
    console.log(table.toString());
    ListPedestriansViewMenu();
}

function ListPedestriansViewMenu() {
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
                    ListPedestriansViewMenu();
                    break;
                case back:
                    clear();
                    MainMenu();
                    break;
                default:
                    clear();
                    MainMenu();
                    break;
            }
        })
        .catch(err => { console.log(err) })
}

export async function AddPedestrianView() {
    var pedestrian: Pedestrian;
    inquirer.prompt([
        { type: 'input', name: 'name', message: 'Pedestrian name?' },
    ])
        .then(async answer => {
            let name: string = answer.name;
            pedestrian = new Pedestrian(null, name, 0, 0);
            await PostPedestrian(pedestrian);
            clear();
            console.log(chalk.green('Pedestrian created!'));
            console.log(chalk.blue('Pedestrian: ') + chalk.magenta(pedestrian.getName()));
            MainMenu();
        })
        .catch(err => { console.log(err) })
}

export async function EditPedestrianView() {
    var pedestrians: Pedestrian[] = await GetPedestrians();
    var pedestriansList: any[] = [];
    for (let index = 0; index < pedestrians.length; index++) {
        const ped: Pedestrian = pedestrians[index];
        pedestriansList.push(`${ped.getId()}-${ped.getName()}-${ped.getCoordX()}-${ped.getCoordY()}`)
    }

    inquirer.prompt({
        type: "list",
        name: "pedestrian",
        message: "Which pedestrian?",
        choices: pedestriansList
    })
        .then(async answers => {
            let info = answers.pedestrian.split('-');
            let id: Number = info[0];
            let name: String = info[1];
            let coord_x: Number = info[2];
            let coord_y: Number = info[3];

            inquirer.prompt([
                { type: "input", name: 'name', message: 'Name? (leave blank to skip)' },
                { type: "input", name: 'coord_x', message: 'Coordinate X (leave blank to skip)' },
                { type: "input", name: 'coord_y', message: 'Coordinate Y (leave blank to skip)' }
            ])
                .then(async answers => {
                    name = (answers.name == "") ? name : answers.name;
                    coord_x = (answers.coord_x == "") ? coord_x : answers.coord_x;
                    coord_y = (answers.coord_y == "") ? coord_y : answers.coord_y;

                    var pedestrian: Pedestrian = new Pedestrian(id, name, coord_x, coord_y);
                    console.log(pedestrian)
                    await EditPedestrian(pedestrian);
                    clear();
                    console.log(`Edited pedestrian >> ${pedestrian.getName()} [${pedestrian.getCoordX()}/${pedestrian.getCoordY()}] <<`)
                    MainMenu();
                })
                .catch(err => { console.log(err) })
        }).catch(err => { console.log(err) })
}

export async function DeletePedestrianView() {

}