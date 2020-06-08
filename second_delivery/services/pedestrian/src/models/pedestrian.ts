import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Double } from 'typeorm';

@Entity('Pedestrian')
export class Pedestrian extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'name' })
    private name: String;

    @Column({ name: 'lat', type: "decimal", precision: 10, scale: 6, default: 0 })
    private lat: Number;

    @Column({ name: 'lng', type: "decimal", precision: 10, scale: 6, default: 0 })
    private lng: Number;

    constructor(name: String, lat: Number, lng: Number) {
        super();
        this.lat = lat;
        this.lng = lng;
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