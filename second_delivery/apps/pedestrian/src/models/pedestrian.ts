export class Pedestrian {
    private id: Number;

    private name: String;

    private coord_x: Number;

    private coord_y: Number;


    constructor(id: Number, name: String, coord_x: Number, coord_y: Number) {
        this.id = (id != null) ? id : undefined;
        this.coord_x = coord_x;
        this.coord_y = coord_y;
        this.name = name;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getName(): String {
        return this.name;
    }

    public setName(name: String): void {
        this.name = name;
    }

    public getCoordX(): Number {
        return this.coord_x;
    }

    public setCoordX(coord_x: Number): void {
        this.coord_x = +(coord_x.toFixed(6));
    }

    public getCoordY(): Number {
        return this.coord_y;
    }

    public setCoordY(coord_y: Number): void {
        this.coord_y = +(coord_y.toFixed(6));
    }

}