export class Vehicle {

    private id: Number;

    private brand: String;

    private model: String;

    private license_plate: String;

    private lat: Number;

    private lng: Number;

    constructor(id: Number, brand: String, model: String, license_plate: String, lat: Number, lng: Number) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.license_plate = license_plate;
        this.lat = lat;
        this.lng = lng;
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

    public getLat(): Number {
        return this.lat;
    }

    public setLat(lat: Number): void {
        this.lat = +(lat.toFixed(6));
    }

    public getLng(): Number {
        return this.lng;
    }

    public setLng(lng: Number): void {
        this.lng = +(lng.toFixed(6));
    }

}