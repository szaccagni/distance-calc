export function calculateDistance(coordniates1, coordniates2) {
    const coord1 = coordniates1.split(',').map(el => el.trim())
    const coord2 = coordniates2.split(',').map(el => el.trim())

    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;
    
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    const earthRadius = 6371; // in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance.toFixed(4)
}