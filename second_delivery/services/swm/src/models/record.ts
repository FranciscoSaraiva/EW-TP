import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Crosswalk } from './crosswalk';

@Entity('Record')
export class Record extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'date' })
    private date: Date;

    @Column({ name: 'total_pedestrians' })
    private total_pedestrians: Number;

    @Column({ name: 'total_vehicles' })
    private total_vehicles: Number;

    @ManyToOne(type => Crosswalk)
    @JoinColumn()
    private crosswalk: Crosswalk;

    constructor(date: Date, crosswalk: Crosswalk) {
        super();
        this.date = date;
        this.total_pedestrians = 0;
        this.total_vehicles = 0;
        this.crosswalk = crosswalk;
    }

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public getTotalPedestrians(): Number {
        return this.total_pedestrians;
    }

    public setTotalPedestrians(total_pedestrians: Number): void {
        this.total_pedestrians = total_pedestrians;
    }

    public getTotalVehicles(): Number {
        return this.total_vehicles;
    }

    public setTotalVehicles(total_vehicles: Number): void {
        this.total_vehicles = total_vehicles;
    }

    public getCrosswalk(): Crosswalk {
        return this.crosswalk;
    }

    public setCrosswalk(crosswalk: Crosswalk): void {
        this.crosswalk = crosswalk;
    }

}