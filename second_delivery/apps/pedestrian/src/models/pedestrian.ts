export class Pedestrian {

    private id: Number;

    private name: String;

    private lat: Number;

    private lng: Number;

    constructor(id: Number, name: String, lat: Number, lng: Number) {
        this.id = (id != null) ? id : undefined;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
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