import { Coordinate } from "./coordinate";

export class Route {

    private coordinates: Coordinate[];

    constructor(coordinates: Coordinate[]) {
        this.coordinates = coordinates;
    }

    public getCoordinates(): Coordinate[] {
        return this.coordinates;
    }

}