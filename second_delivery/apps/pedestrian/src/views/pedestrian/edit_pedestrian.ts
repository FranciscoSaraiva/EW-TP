import { Pedestrian } from "../../models/pedestrian";
import inquirer from "inquirer";
import { EditPedestrian, GetPedestrians } from "../../service/pedestrian";
import { clear } from "console";
import { LoggedMenuView } from "./pedestrian_menu";

export async function EditPedestrianView(pedestrian: Pedestrian) {
    var pedestrians: Pedestrian[] = await GetPedestrians();

    let id: Number = pedestrian.getId();
    let name: String = pedestrian.getName();
    let coord_x: Number = pedestrian.getCoordX();
    let coord_y: Number = pedestrian.getCoordY();

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
            LoggedMenuView(pedestrian);
        })
        .catch(err => { console.log(err) })
}