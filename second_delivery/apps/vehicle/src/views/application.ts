//imports
import figlet from 'figlet';
import chalk from 'chalk';
import Table from "cli-table";
import boxen, { BorderStyle } from 'boxen';

export function MoveScreenUp(): void {
    for (let index = 0; index < 100; index++) {
        console.log(index);
    }
}

export function Logo(): void {
    console.log(
        boxen(
            chalk.blueBright(
                figlet.textSync('Vehicle Sim', { horizontalLayout: 'full' })
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