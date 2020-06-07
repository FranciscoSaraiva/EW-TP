import { Pedestrian } from '../../models/pedestrian';
import { GetPedestrians, EditPedestrian, DeletePedestrian } from '../../service/pedestrian';
import { CreateTable } from '../application';
import Table from 'cli-table';
import { MainMenuView } from '../main_menu';
import clear from 'clear';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { PedestrianDetailsView } from './details';
import { EditPedestrianView } from './edit_pedestrian';

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

/**
 * Presentation
 */

export async function ListPedestriansView() {
    var pedestrians: Pedestrian[] = await GetPedestrians();
    var table = PedestriansTable(pedestrians);
    clear();
    console.log(table.toString());
    ListPedestriansViewMenu();
}

function PedestriansTable(pedestrians: Pedestrian[]): Table {
    var pedRows: any[] = [];
    for (let index = 0; index < pedestrians.length; index++) {
        const ped = pedestrians[index];
        pedRows.push([ped.getName(), ped.getCoordX(), ped.getCoordY()])
    }
    var table: Table = CreateTable(['Name', 'Coordinate X', 'Coordinate Y'], pedRows);
    return table;
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
                    console.log(chalk.bgGreenBright('simulation starting...'))
                    SimulatePedestrians();
                    break;
                case back:
                    clear();
                    MainMenuView();
                    break;
                default:
                    clear();
                    MainMenuView();
                    break;
            }
        })
        .catch(err => { console.log(err) })
}


/**
 * Simulation
 */

async function SimulatePedestrians() {
    var pedestrians: Pedestrian[] = await GetPedestrians();
    setInterval(() => {
        for (let index = 0; index < pedestrians.length; index++) {
            var ped: Pedestrian = pedestrians[index];
            let direction = (Math.floor(Math.random() * (2 - 0))) == 1 ? true : false;
            let coord = (Math.floor(Math.random() * (2 - 0))) == 1 ? 'X' : 'Y';
            switch (coord) {
                case 'X':
                    simulateXCoord(ped, direction);
                    break;
                case 'Y':
                    simulateYCoord(ped, direction);
                    break;
            }
        }
        var table = PedestriansTable(pedestrians);
        clear();
        console.log(table.toString());
    }, 5000);
}

async function simulateXCoord(pedestrian: Pedestrian, direction: Boolean) {
    if (direction)
        pedestrian.setCoordX(Number(pedestrian.getCoordX()) + 0.0000180); //2 meters
    else
        pedestrian.setCoordX(Number(pedestrian.getCoordX()) - 0.0000180); //2 meters

    await EditPedestrian(pedestrian);
}

async function simulateYCoord(pedestrian: Pedestrian, direction: Boolean) {
    if (direction)
        pedestrian.setCoordY(Number(pedestrian.getCoordY()) + 0.0000180); //2 meters
    else
        pedestrian.setCoordY(Number(pedestrian.getCoordY()) - 0.0000180); //2 meters
    await EditPedestrian(pedestrian);
}
