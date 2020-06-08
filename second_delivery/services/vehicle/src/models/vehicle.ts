import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Vehicle')
export class Vehicle extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'brand' })
    private brand: String;

    @Column({ name: 'model' })
    private model: String;

    @Column({ name: 'license_plate' })
    private license_plate: String;

    @Column({ name: 'lat', type: "decimal", precision: 10, scale: 6 })
    private lat: Number;

    @Column({ name: 'lng', type: "decimal", precision: 10, scale: 6 })
    private lng: Number;

    constructor(brand: String, model: String, license_plate: String, lat: Number, lng: Number) {
        super();
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