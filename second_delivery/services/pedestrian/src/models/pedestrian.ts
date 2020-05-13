import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Pedestrian')
export class Pedestrian extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    private id: Number;

    @Column({ name: 'name' })
    private name: String;

    @Column({ name: 'coord_x' })
    private coord_x: Number;

    @Column({ name: 'coord_y' })
    private coord_y: Number;

    constructor(name: String, coord_x: Number, coord_y: Number) {
        super();
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
        this.coord_x = coord_x;
    }

    public getCoordY(): Number {
        return this.coord_y;
    }

    public setCoordY(coord_y: Number): void {
        this.coord_y = coord_y;
    }

}