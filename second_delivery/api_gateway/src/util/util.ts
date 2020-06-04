interface coords {
    coord_x: Number,
    coord_y: Number
}

export function calculate_distance(coordA_x: Number, coordA_y: Number, coordB_x: Number, coordB_y: Number) {

    if ((coordA_x == coordB_x) && (coordA_y == coordB_y)) {
        return 0;
    }
    else {
        var radlat1: Number = Math.PI * Number(coordA_y) / 180;
        var radlat2: Number = Math.PI * Number(coordB_y) / 180;
        var theta: Number = Number(coordA_x) - Number(coordA_y);
        var radtheta: Number = Math.PI * Number(theta) / 180;
        var dist = Math.sin(Number(radlat1)) * Math.sin(Number(radlat2)) + Math.cos(Number(radlat1)) * Math.cos(Number(radlat2)) * Math.cos(Number(radtheta));
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        return dist * 1609.344;
    }
}