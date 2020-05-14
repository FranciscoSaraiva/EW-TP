import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Record } from './record';

@Entity('Crosswalk')
export class Crosswalk extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'address' })
    private address: String;

    @Column({ name: 'state' })
    private state: String;

    @Column({ name: 'coord_x' })
    private coord_x: Number;

    @Column({ name: 'coord_y' })
    private coord_y: Number;

    @OneToMany(type => Record, record => record.getCrosswalk)
    @JoinColumn()
    private records: Record[];

    constructor(address: String, coord_x: Number, coord_y: Number, state: String) {
        super();
        this.coord_x = coord_x;
        this.coord_y = coord_y;
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

    public getState(): String {
        return this.state;
    }

    public setState(state: String): void {
        this.state = state;
    }

    public getCoordX(): Number {
        return this.coord_x;
    }

    public setCoordX(coord_x: Number): void {
        this.coord_x = coord_x;
    }

    public getCoordY(): Number {
        return this.coord_y;
    }

    public setCoordY(coord_y: Number): void {
        this.coord_y = coord_y;
    }

    public getRegisters(): Record[] {
        return this.records;
    }

    public setRegisters(records: Record[]): void {
        this.records = records;
    }

}