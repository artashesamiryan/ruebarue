interface IRecommendations {
    id: number;
    previous_id: number;
    property_id: number;
    google_place_id: string;
    place_id: number;
    provider_id: number;
    rbr_id: number;
    type: string;
    tab_id: number;
    display_as: string;
    source: string;
    tip: string;
    start_date: string;
    start_time: string;
    lat: string;
    lng: string;
    name: string;
    address: string;
    rank: number;
    rating: number;
    price: number;
    price: number;
    price_str: string;
    photo_url: string;
    external_link: string;
    closed: boolean;
    ta_id: number;
    ta_tags: string[];
    yelp_tags: string[];
    tags: [];
    host: null;
    place: null;
    google: IRecommendationsGoogle;
    tripadivisor: null;
    yelp: null;
    attachments: null;
    theatre_name: string
}
interface IRecommendationsGoogle {
    place_id: string;
    name: string;
    rating: number;
    user_ratings_total: number;
    formatted_address: string;
    formatted_phone_number: string;
    website: string;
    url: string;
    geometry: IGeometry;
    reviews: IReviews[];
    opening_hours: IOpeningHours,
    types: string[];
    vicinity: string;
    utc_offset: number;
    photos: null;
    last_featched_at: string;
    address_components: null;
}
//
interface IGeometry {
    location: ILocation
}
interface ILocation {
    lat: number;
    lng: number
}
interface IReviews {
    rating: number;
    author_name: string;
    text: string;
    time: number
}
//
interface IOpeningHours {
    periods: IPeriodsItem[]
    weekday_text: string[];
}
interface IDayTime {
    day: number;
    time: string;
}
interface IPeriodsItem {
    open: IDaytime;
    close: IDayTime
}
