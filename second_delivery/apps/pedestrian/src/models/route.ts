import { Coordinate } from "./coordinate";

export class Route {

    private name: String;
    private coordinates: Coordinate[];

    constructor(name: String, coordinates: Coordinate[]) {
        this.name = name;
        this.coordinates = coordinates;
    }

    public getName(): String {
        return this.name;
    }

    public getCoordinates(): Coordinate[] {
        return this.coordinates;
    }

}