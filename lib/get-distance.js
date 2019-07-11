export default (from, to) => {
    if (!from || !to) return 0;
    const R = 6378137;
    const radLat1 = rad(parseFloat(from.lat, 10));
    const radLat2 = rad(parseFloat(to.lat, 10));
    const radLng1 = rad(parseFloat(from.lon, 10));
    const radLng2 = rad(parseFloat(to.lon, 10));
    const a = radLat1 - radLat2;
    const b = radLng1 - radLng2;
    const s = 2 * R * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.pow(Math.sin(b /2), 2)));
    return Math.round(s * 10000) / 10000 / 1852;
}

const rad = coor => coor * Math.PI / 180.0;
