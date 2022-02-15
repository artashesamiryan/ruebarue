import React from 'react'
import GoogleMapReact from 'google-map-react';
import HomePin from '../../assets/icons/day_home.png';
import AreaPin from '../../assets/icons/day_1.png';

const AnyReactComponent = ({ text, num = 1 }: any) => {


    return (
        <>
            {
                text === 'home' ?
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
    center?: ILatLng;
    w?: string;
    h?: string;
    zoom: number,
    locations?: any
}

const SimpleMap = ({ center = { lat: 35.5244754, lng: -82.9820933 }, zoom = 11, w, h = "600px", locations }: SompleMapProps) => {

    return (
        <div style={{ height: h, width: '400px' }}>
            <GoogleMapReact
                defaultCenter={center}
                defaultZoom={zoom}
            >

                <AnyReactComponent
                    lat={center.lat}
                    lng={center.lng}
                    text={'home'}
                />


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
        </div>
    );

}

export default SimpleMap;