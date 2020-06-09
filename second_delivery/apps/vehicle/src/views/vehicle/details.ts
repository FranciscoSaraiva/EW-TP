import { Vehicle } from "../../models/vehicle";
import boxen, { BorderStyle } from "boxen";
import chalk from "chalk";

export function VehicleDetailsView(vehicle: Vehicle) {
    console.log(boxen(
        chalk.blue('ID: ') + vehicle.getId() + '\n' +
        chalk.blue('Brand: ') + vehicle.getBrand() + '\n' +
        chalk.blue('Model: ') + vehicle.getModel() + '\n' +
        chalk.blue('License Plate: ') + vehicle.getLicense_plate() + '\n' +
        chalk.blue('Coord X: ') + vehicle.getLat() + '\n' +
        chalk.blue('Coord Y: ') + vehicle.getLng(),
        { padding: 1, margin: 1, borderStyle: BorderStyle.Double, borderColor: "blue" }));
}