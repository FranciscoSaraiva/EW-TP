import { Pedestrian } from "../../models/pedestrian";
import inquirer from "inquirer";
import { EditPedestrian, GetPedestrians } from "../../service/pedestrian";
import { clear } from "console";
import { LoggedMenuView } from "./pedestrian_menu";

export async function EditPedestrianView(pedestrian: Pedestrian) {
    var pedestrians: Pedestrian[] = await GetPedestrians();

    let id: Number = pedestrian.getId();
    let name: String = pedestrian.getName();
    let lat: Number = pedestrian.getLat();
    let lng: Number = pedestrian.getLng();

    inquirer.prompt([
        { type: "input", name: 'name', message: 'Name? (leave blank to skip)' },
        { type: "input", name: 'lat', message: 'Coordinate X (leave blank to skip)' },
        { type: "input", name: 'lng', message: 'Coordinate Y (leave blank to skip)' }
    ])
        .then(async answers => {
            name = (answers.name == "") ? name : answers.name;
            lat = (answers.lat == "") ? lat : answers.lat;
            lng = (answers.lng == "") ? lng : answers.lng;

            var pedestrian: Pedestrian = new Pedestrian(id, name, lat, lng);
            console.log(pedestrian)
            await EditPedestrian(pedestrian);
            clear();
            console.log(`Edited pedestrian >> ${pedestrian.getName()} [${pedestrian.getLat()}/${pedestrian.getLng()}] <<`)
            LoggedMenuView(pedestrian);
        })
        .catch(err => { console.log(err) })
}