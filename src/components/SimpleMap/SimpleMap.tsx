import React from 'react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: any) => (
    <div style={{
        color: 'white',
        background: 'grey',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
        {text}
    </div>
);

interface SompleMapProps {
    center?: any;
    w?: string;
    h?: string;
    zoom: number
}

const SimpleMap = ({ center = { lat: 35.5244754, lng: -82.9820933 }, zoom = 11, w, h = "600px" }: SompleMapProps) => {


    const handleApiLoaded = (map: any, maps: any) => {

        console.log(map, "MAP");
        console.log(maps, "MAPS");
        // use map and maps objects
    };

    return (
        <div style={{ height: h, width: '400px' }}>
            <GoogleMapReact
                defaultCenter={center}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text={'Kreyser Avrora'}
                />
            </GoogleMapReact>
        </div>
    );

}

export default SimpleMap;