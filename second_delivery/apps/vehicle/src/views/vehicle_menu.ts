import { Vehicle } from '../models/vehicle';
import { GetVehicles, PostVehicle, EditVehicle, DeleteVehicle } from '../service/vehicle';
import { CreateTable } from './application';
import Table from 'cli-table';
import { MainMenu } from './main_menu';
import clear from 'clear';
import inquirer from 'inquirer';
import chalk from 'chalk';

const crosswalks = [
    { name: 'Crosswalk1', coord_x: 41.5608032, coord_y: -8.3936313 },
    { name: 'Crosswalk2', coord_x: 41.5581083, coord_y: -8.3982033 },
    { name: 'Crosswalk3', coord_x: 41.5548887, coord_y: -8.4015591 }
];


export async function ListVehiclesView() {
    var vehicles: Vehicle[] = await GetVehicles();
    var table = VehiclesTable(vehicles);
    clear();
    console.log(table.toString());
    ListVehiclesViewMenu();
}

function VehiclesTable(vehicles: Vehicle[]): Table {
    var vehicleRows: any[] = [];
    for (let index = 0; index < vehicles.length; index++) {
        const vehicle = vehicles[index];
        vehicleRows.push([vehicle.getLicense_plate(), vehicle.getCoordX(), vehicle.getCoordY()])
    }
    var table: Table = CreateTable(['Name', 'Coordinate X', 'Coordinate Y'], vehicleRows);
    return table;
}

function ListVehiclesViewMenu() {
    const simulate_vehicles = chalk.blueBright('Simulate vehicles');
    const back = chalk.red('Back');

    inquirer.prompt({
        type: "list",
        name: "option",
        message: "Choose an option: ",
        choices: [simulate_vehicles, new inquirer.Separator(), back]
    })
        .then(answer => {
            switch (answer.option) {
                case simulate_vehicles:
                    console.log(chalk.bgGreenBright('simulation starting...'))
                    SimulateVehicles();
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

async function SimulateVehicles() {
    var vehicles: Vehicle[] = await GetVehicles();
    setInterval(() => {
        for (let index = 0; index < vehicles.length; index++) {
            var vehicle: Vehicle = vehicles[index];
            let direction = (Math.floor(Math.random() * (2 - 0))) == 1 ? true : false;
            let coord = (Math.floor(Math.random() * (2 - 0))) == 1 ? 'X' : 'Y';
            switch (coord) {
                case 'X':
                    simulateXCoord(vehicle, direction);
                    break;
                case 'Y':
                    simulateYCoord(vehicle, direction);
                    break;
            }
        }
        var table = VehiclesTable(vehicles);
        clear();
        console.log(table.toString());
    }, 5000);
}

async function simulateXCoord(vehicle: Vehicle, direction: Boolean) {
    if (direction)
        vehicle.setCoordX(Number(vehicle.getCoordX()) + 0.0000180); //2 meters
    else
        vehicle.setCoordX(Number(vehicle.getCoordX()) - 0.0000180); //2 meters

    await EditVehicle(vehicle);
}

async function simulateYCoord(vehicle: Vehicle, direction: Boolean) {
    if (direction)
        vehicle.setCoordY(Number(vehicle.getCoordY()) + 0.0000180); //2 meters
    else
        vehicle.setCoordY(Number(vehicle.getCoordY()) - 0.0000180); //2 meters
    await EditVehicle(vehicle);
}


export async function AddVehicleView() {
    var vehicle: Vehicle;
    inquirer.prompt([
        { type: 'input', name: 'brand', message: 'Vehicle brand?' },
        { type: 'input', name: 'model', message: 'Vehicle model?' },
        { type: 'input', name: 'license_plate', message: 'Vehicle license plate?' },
    ])
        .then(async answer => {
            let brand: string = answer.brand;
            let model: string = answer.model;
            let license_plate: string = answer.license_plate;

            vehicle = new Vehicle(null, brand, model, license_plate, 0, 0);
            await PostVehicle(vehicle);
            clear();
            console.log(chalk.green('Vehicle created!'));
            console.log(chalk.blue('Vehicle: ') + chalk.magenta(vehicle.getLicense_plate()));
            MainMenu();
        })
        .catch(err => { console.log(err) })
}

export async function EditVehicleView() {
    var vehicles: Vehicle[] = await GetVehicles();
    var vehiclesList: any[] = [];
    for (let index = 0; index < vehicles.length; index++) {
        const vehicle: Vehicle = vehicles[index];
        vehiclesList.push(`${vehicle.getId()}-${vehicle.getBrand()}-${vehicle.getModel()}-${vehicle.getLicense_plate()}-${vehicle.getCoordX()}-${vehicle.getCoordY()}`)
    }

    inquirer.prompt({
        type: "list",
        name: "vehicle",
        message: "Which vehicle?",
        choices: vehiclesList
    })
        .then(async answers => {
            let info = answers.vehicle.split('-');
            let id: Number = info[0];
            let brand: String = info[1];
            let model: String = info[2];
            let license_plate: String = info[3];
            let coord_x: Number = info[4];
            let coord_y: Number = info[5];

            inquirer.prompt([
                { type: "input", name: 'brand', message: 'Brand? (leave blank to skip)' },
                { type: "input", name: 'model', message: 'Brand? (leave blank to skip)' },
                { type: "input", name: 'license_plate', message: 'Brand? (leave blank to skip)' },
                { type: "input", name: 'coord_x', message: 'Coordinate X (leave blank to skip)' },
                { type: "input", name: 'coord_y', message: 'Coordinate Y (leave blank to skip)' }
            ])
                .then(async answers => {
                    brand = (answers.brand == "") ? brand : answers.brand;
                    model = (answers.model == "") ? model : answers.model;
                    license_plate = (answers.license_plate == "") ? license_plate : answers.license_plate;
                    coord_x = (answers.coord_x == "") ? coord_x : answers.coord_x;
                    coord_y = (answers.coord_y == "") ? coord_y : answers.coord_y;

                    var vehicle: Vehicle = new Vehicle(id, brand, model, license_plate, coord_x, coord_y);
                    console.log(vehicle)
                    await EditVehicle(vehicle);
                    clear();
                    console.log(`Edited vehicle >> ${vehicle.getLicense_plate()} [${vehicle.getCoordX()}/${vehicle.getCoordY()}] <<`)
                    MainMenu();
                })
                .catch(err => { console.log(err) })
        }).catch(err => { console.log(err) })
}

export async function DeleteVehicleView() {
    var vehicles: Vehicle[] = await GetVehicles();
    var vehiclesList: any[] = [];
    for (let index = 0; index < vehicles.length; index++) {
        const vehicle: Vehicle = vehicles[index];
        vehiclesList.push(`${vehicle.getId()}-${vehicle.getLicense_plate()}-${vehicle.getCoordX()}-${vehicle.getCoordY()}`)
    }

    inquirer.prompt({
        type: "list",
        name: "vehicle",
        message: "Which vehicle?",
        choices: vehiclesList
    })
        .then(async answers => {
            let info = answers.vehicle.split('-');
            let id: Number = info[0];
            await DeleteVehicle(id);
            clear();
            console.log(`Delete vehicle with id [${id}]`);
            MainMenu();
        }).catch(err => { console.log(err) })
}