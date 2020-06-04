export class Vehicle {

    private id: Number;

    private brand: String;

    private model: String;

    private license_plate: String;

    private coord_x: Number;

    private coord_y: Number;

    constructor(id: Number, brand: String, model: String, license_plate: String, coord_x: Number, coord_y: Number) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.license_plate = license_plate;
        this.coord_x = coord_x;
        this.coord_y = coord_y;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getBrand(): String {
        return this.brand;
    }

    public setBrand(brand: String): void {
        this.brand = brand;
    }

    public getModel(): String {
        return this.model;
    }

    public setModel(model: String): void {
        this.model = model;
    }

    public getLicense_plate(): String {
        return this.license_plate;
    }

    public setLicense_plate(license_plate: String): void {
        this.license_plate = license_plate;
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