import { Coordinate } from "../models/coordinate";
import { Route } from "../models/route";

export async function LoadRoutes(route_number: Number) {
    var route: Route;
    route1.forEach(r_coordinate => {
        let coord_x: Number = r_coordinate[1];
        let coord_y: Number = r_coordinate[0];
        var coordinate: Coordinate = new Coordinate(coord_x, coord_y);
    });
}


const route1: any[] = [];
const route2: any[] = [];
const route3: any[] = [];