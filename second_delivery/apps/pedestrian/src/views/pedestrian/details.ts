import { Pedestrian } from "../../models/pedestrian";
import boxen, { BorderStyle } from "boxen";
import chalk from "chalk";

export function PedestrianDetailsView(pedestrian: Pedestrian) {
    console.log(boxen(
        chalk.blue('ID: ') + pedestrian.getId() + '\n' +
        chalk.blue('Name: ') + pedestrian.getName() + '\n' +
        chalk.blue('Coord X: ') + pedestrian.getLat() + '\n' +
        chalk.blue('Coord Y: ') + pedestrian.getLng(),
        { padding: 1, margin: 1, borderStyle: BorderStyle.Double, borderColor: "blue" }));
}