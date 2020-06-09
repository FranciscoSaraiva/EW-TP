//imports
import figlet from 'figlet';
import chalk from 'chalk';
import Table from "cli-table";
import boxen, { BorderStyle } from 'boxen';
import { Pedestrian } from '../models/pedestrian';

export function MoveScreenUp(): void {
    for (let index = 0; index < 100; index++) {
        console.log(index);
    }
}

export function Logo(): void {
    console.log(
        boxen(
            chalk.blueBright(
                figlet.textSync('Pedestrian App', { horizontalLayout: 'full' })
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

export function PedestriansTable(pedestrians: Pedestrian[]): Table {
    var pedRows: any[] = [];
    for (let index = 0; index < pedestrians.length; index++) {
        const ped = pedestrians[index];
        pedRows.push([ped.getName(), ped.getLat(), ped.getLng()])
    }
    var table: Table = CreateTable(['Name', 'Coordinate X', 'Coordinate Y'], pedRows);
    return table;
}