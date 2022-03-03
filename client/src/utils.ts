export const youtube_parser = (url: string): string | boolean => {
    var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    var match = url.match(regExp)
    return match && match[7].length === 11 ? match[7] : false
}

export const getYoutubeFrameLink = (url: string): string | null => {
    const videoId = youtube_parser(url)
    if (videoId === false) {
        return null
    }
    return `https://www.youtube.com/embed/${videoId}`
}

const degrees_to_radians = (degrees: any) => {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

export const calc = (content: any, lat2: any, lng2: any) => {
    const R = 6371;
    let dLat = degrees_to_radians(lat2 - content?.lat);
    let dLng = degrees_to_radians(lng2 - content?.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degrees_to_radians(content?.lat)) * Math.cos(degrees_to_radians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    let m = d * 0.621371;
    let fixed = m.toFixed(1).toString();

    return fixed
}