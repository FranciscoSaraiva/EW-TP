import axios from 'axios';
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
    MainMenu();
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