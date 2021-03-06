/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../Redux/hooks";

interface IDistanceProps {
    lat2: any;
    lng2: any;
}
const Distance = ({ lat2, lng2 }: IDistanceProps) => {
    const [km, setKm] = useState('');
    const { content } = useAppSelector(state => state.content);
    useEffect(() => {

        calc()
    }, []);

    const degrees_to_radians = (degrees: any) => {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }

    const calc = () => {
        const R = 6371;
        let dLat = degrees_to_radians(lat2 - content?.lat);
        let dLng = degrees_to_radians(lng2 - content?.lng);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degrees_to_radians(content?.lat)) * Math.cos(degrees_to_radians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;
        let m = d * 0.621371;
        let fixed = m.toFixed(1).toString()
        setKm(fixed)
    }

    return (
        <div style={{
            width: '50px',
            height: '30px',
            background: content?.account?.preferences?.color_2,
            borderRadius: '3px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '14px'
        }}>{km} mi</div>
    )
};

export default Distance;