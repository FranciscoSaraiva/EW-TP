import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Record } from './record';

@Entity('Crosswalk')
export class Crosswalk extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'address' })
    private address: String;

    // orientado aos pedestres 
    // 1 verde 0 vermelho para pedestre
    @Column({ name: 'state' })
    private state: Number;

    @Column({ name: 'lat', type: "decimal", precision: 10, scale: 6, default: 0 })
    private lat: Number;

    @Column({ name: 'lng', type: "decimal", precision: 10, scale: 6, default: 0 })
    private lng: Number;

    @OneToMany(type => Record, record => record.getCrosswalk)
    @JoinColumn()
    private records: Record[];

    constructor(address: String, lat: Number, lng: Number, state: Number) {
        super();
        this.lat = lat;
        this.lng = lng;
        this.address = address;
        this.state = state;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getAddress(): String {
        return this.address;
    }

    public setAddress(address: String): void {
        this.address = address;
    }

    public getState(): Number {
        return this.state;
    }

    public setState(state: Number): void {
        this.state = state;
    }

    public getLat(): Number {
        return this.lat;
    }

    public setLat(lat: Number): void {
        this.lat = lat;
    }

    public getLng(): Number {
        return this.lng;
    }

    public setLng(lng: Number): void {
        this.lng = lng;
    }

    public getRegisters(): Record[] {
        return this.records;
    }

    public setRegisters(records: Record[]): void {
        this.records = records;
    }

}