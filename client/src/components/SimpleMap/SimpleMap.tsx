import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import HomePin from '../../assets/icons/day_home.png';
import AreaPin from '../../assets/icons/day_1.png';
import { useAppSelector } from "../../Redux/hooks";

const AnyReactComponent = ({ text, num = 1, home }: any) => {
    return (
        <>
            {
                home && text === 'home' ?
                    <img src={HomePin} alt="" />
                    :
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <span style={{ position: 'absolute', marginTop: '3px', color: 'white' }}>{num + 1}</span>
                        <img src={AreaPin} alt="" />
                    </div>
            }
        </>
    )
};


interface ILatLng {
    lat: any;
    lng: any;
}
interface SompleMapProps {
    center?: any;
    w?: string;
    h?: string;
    zoom: number,
    locations?: any,
    home?: boolean,
    link?: string;
}
const SimpleMap = ({ link, home, center = { lat: 32.7865986, lng: -117.2541316 }, zoom = 11, w = "566px", h = "600px", locations }: SompleMapProps) => {
    const { content } = useAppSelector(state => state.content);
    const location = window.location.pathname.split("/").filter((item: string) => item)[0];
    const defaultCenter = {
        lat: location === "guestbook" ? Number(content?.rental.lat) : Number(content.lat),
        lng: location === "guestbook" ? Number(content?.rental.lng) : Number(content.lng),
    };

    console.log(content.lat, "<<<<>>>>>");
    console.log(content.lng, "<<<<>>>>>");

    const [fixed, setFixed]: any = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 250) {
                setFixed(true)
            } else {
                setFixed(false)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <a
            href={`https://www.google.com/maps/search/${link}`}
            target="_blank"
            rel="noreferrer"
            style={{
                height: h,
                width: w,
                position: fixed ? 'sticky' : 'relative',
                left: fixed ? '49.5%' : '',
                top: fixed ? '1%' : '',
            }}>
            <GoogleMapReact
                yesIWantToUseGoogleMapApiInternals
                defaultCenter={defaultCenter}
                defaultZoom={zoom}
            >
                {
                    home &&
                    <AnyReactComponent
                        lat={defaultCenter.lat}
                        lng={defaultCenter.lng}
                        text={'home'}
                        home={home}
                    />
                }
                {
                    locations &&
                    locations.map((item: any, index: number) => {
                        return (
                            <AnyReactComponent
                                key={item.lat}
                                lat={item.lat}
                                lng={item.lng}
                                num={index}
                                text={'pin'}
                            />
                        )
                    })
                }
            </GoogleMapReact>
        </a>
    );

}

export default SimpleMap;