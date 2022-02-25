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
