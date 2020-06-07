export class Coordinate {

    private coord_x: Number;

    private coord_y: Number;

    constructor(coord_x: Number, coord_y: Number) {
        this.coord_x = coord_x;
        this.coord_y = coord_y;
    }

    public getCoord_x(): Number {
        return this.coord_x;
    }

    public getCoord_y(): Number {
        return this.coord_y;
    }

    public setCoord_x(coord_x: Number): void {
        this.coord_x = coord_x;
    }

    public setCoord_y(coord_y: Number): void {
        this.coord_y = coord_y;
    }

}