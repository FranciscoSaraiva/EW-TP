export class Coordinate {

    private lat: Number;

    private lng: Number;

    constructor(lat: Number, lng: Number) {
        this.lat = lat;
        this.lng = lng;
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

}