import { Vehicle } from "../../models/vehicle";
import { route_uminho_clock } from "../../routes/route_uminho_clock";
import { Coordinate } from "../../models/coordinate";
import { Route } from "../../models/route";
import inquirer from "inquirer";
import { EditVehicle, CheckCoordinate } from "../../service/vehicle";
import { clear } from "console";
import { VehicleDetailsView } from "../vehicle/details";
import chalk from "chalk";
import { LoggedMenuView } from "../vehicle/vehicle_menu";
import { route_uminho_counterclock } from "../../routes/route_uminho_counterclock";

export async function SimulateView(vehicle: Vehicle) {
    let routes: Route[] = await GetRoutes();
    let route_choices: any[] = [];
    for (let index = 0; index < routes.length; index++) {
        let route_name = routes[index].getName();
        route_choices.push(route_name);
    }

    inquirer.prompt({
        type: "list",
        name: "route",
        message: "Which option?: ",
        choices: route_choices
    })
        .then(async answers => {
            let route: Route = routes.filter(route => { return route.getName() == answers.route })[0];
            SimulateRouteInit(vehicle, route);
        })
        .catch(err => console.log(err))
}

async function GetRoutes(): Promise<Route[]> {
    var routes: Route[] = [];

    var coordinates_clock: Coordinate[] = [];
    route_uminho_clock.forEach(coord => {
        let lat: Number = Number(coord.split(',')[1]);
        let lng: Number = Number(coord.split(',')[0]);
        let coordinate: Coordinate = new Coordinate(lat, lng);
        coordinates_clock.push(coordinate);
    });
    let routeUminhoClock = new Route("Around Uminho Route Clockwise", coordinates_clock);
    routes.push(routeUminhoClock);

    var coordinates_counter: Coordinate[] = [];
    route_uminho_counterclock.forEach(coord => {
        let lat: Number = Number(coord.split(',')[1]);
        let lng: Number = Number(coord.split(',')[0]);
        let coordinate: Coordinate = new Coordinate(lat, lng);
        coordinates_counter.push(coordinate);
    });
    let routeUminhoCounterClock = new Route("Around Uminho Route Counter Clock", coordinates_counter);
    routes.push(routeUminhoCounterClock);

    return routes;
}

async function SimulateRouteInit(vehicle: Vehicle, route: Route) {
    let counter = 0;
    let max = route.getCoordinates().length;
    var interval = setInterval(async () => {
        if (counter == max) {
            clear();
            console.log(chalk.greenBright('Route simulation has ended!'))
            LoggedMenuView(vehicle);
            clearInterval(interval);
            return;
        }

        //if crosswalk is red
        //do something
        //if crosswalk is green
        let coordinate: Coordinate = route.getCoordinates()[counter];
        let lat: Number = coordinate.getLat();
        let lng: Number = coordinate.getLng();

        //var veh_edit: Vehicle = await EditVehicle(vehicle);
        let data = await CheckCoordinate(lat, lng, vehicle.getLicense_plate());
        if (data.status == -1) {
            clear();
            VehicleDetailsView(vehicle);
            console.log(chalk.redBright('STOP'));
            if (data.pedestrianInRange)
                console.log(chalk.red('THERE ARE PEDESTRIANS IN RANGE \n (!!) SLOW DOWN (!!)'))
        } else if (data.status == 0) {
            vehicle.setLat(lat);
            vehicle.setLng(lng);
            clear();
            VehicleDetailsView(vehicle);
            counter++;
            console.log(chalk.greenBright('Driving...!'));
            if (data.pedestrianInRange)
                console.log(chalk.red('THERE ARE PEDESTRIANS IN RANGE \n (!!) SLOW DOWN (!!)'))
        } else {
            return;
        }

    }, 2000);
}
