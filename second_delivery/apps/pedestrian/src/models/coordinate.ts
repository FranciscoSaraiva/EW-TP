export class Coordinate {

    private coord_x: Number;

    private coord_y: Number;

    constructor(coord_x: Number, coord_y: Number) {

    }

    public getCoord_x(): Number {
        return this.coord_x;
    }

    public setCoord_x(coord_x: Number): void {
        this.coord_x = coord_x;
    }

}