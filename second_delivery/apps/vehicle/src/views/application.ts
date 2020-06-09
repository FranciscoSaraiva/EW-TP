//imports
import figlet from 'figlet';
import chalk from 'chalk';
import Table from "cli-table";
import boxen, { BorderStyle } from 'boxen';
import { Vehicle } from '../models/vehicle';

export function MoveScreenUp(): void {
    for (let index = 0; index < 100; index++) {
        console.log(index);
    }
}

export function Logo(): void {
    console.log(
        boxen(
            chalk.blueBright(
                figlet.textSync('Vehicle App', { horizontalLayout: 'full' })
            ),
            { padding: 1, borderColor: 'magentaBright', borderStyle: BorderStyle.Double })
    );
}

export function CreateTable(head: string[], rows: any[]): Table {
    var table = new Table({
        head: head
    });
    rows.forEach(row => {
        table.push(row);
    });

    return table;
}

export function VehiclesTable(vehicles: Vehicle[]): Table {
    var vehRows: any[] = [];
    for (let index = 0; index < vehicles.length; index++) {
        const veh = vehicles[index];
        vehRows.push([veh.getLicense_plate(), veh.getLat(), veh.getLng()])
    }
    var table: Table = CreateTable(['Name', 'Coordinate X', 'Coordinate Y'], vehRows);
    return table;
}