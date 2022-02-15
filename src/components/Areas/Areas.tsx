/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useWindowSize from "../../hooks/UseWindowSize";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import AreaCard from "../../components/AreaCard/AreaCard";
import MobileAreaCard from "../../components/AreaCard/MobileAreaCard";
import SimpleMap from "../SimpleMap/SimpleMap";



const Areas = () => {
    const width = useWindowSize();
    const history = useHistory()
    const [areas, setAreas] = useState([]);
    const [loading, setloading] = useState(false);

    const { id }: any = useParams();

    useEffect(() => {
        getPlace()
    }, [])

    const getPlace = async () => {

        try {
            setloading(true)
            const res = await axios('http://localhost:3000/DB.json');
            const data = res.data.destination.recommendations;
            const filteredData = data.filter((item: any) => item.tab_id === id);
            const filteredArr = data.reduce((acc: any, current: any) => {
                const x = acc.find((item: any) => item.tab_id === current.tab_id);
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, []);
            console.log(filteredArr, "++++++++");
            setloading(false)
            setAreas(filteredData)
        } catch (error) {
            console.log(error)
        }
    };

    if (loading) {
        return <Spinner />
    }

    return (
        <Box display="flex">
            <Box width="566px" height="" sx={{ overflowY: width > 900 ? 'scroll' : 'none' }}>
                <Box >
                    <Typography
                        display="flex"
                        alignItems="center"
                        textTransform="capitalize"
                        fontFamily="Lato"
                        fontStyle="normal"
                        fontSize="1.2rem"
                        lineHeight="16px"
                        color="#333333"
                        padding="10px 10px"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => history.goBack()}
                    >
                        <ArrowBackIosIcon fontSize="small" /> {id}
                    </Typography>
                </Box>


                {
                    areas.length === 0 ?
                        <h3>Areas epmty</h3> :
                        areas.map((item: any, index: number) => {

                            return (
                                <div key={index}>
                                    {
                                        width > 700 ?
                                            <AreaCard
                                                key={item.id}
                                                id={item.id}
                                                number={index}
                                                location={item.google.formatted_address}
                                                name={item.name}
                                                tip={item.tip}
                                                google={item.google}
                                            />
                                            :
                                            <MobileAreaCard
                                                key={item.id}
                                                id={item.id}
                                                number={index}
                                                location={item.google.formatted_address}
                                                name={item.name}
                                                tip={item.tip}
                                                google={item.google}
                                            />
                                    }
                                </div>
                            )
                        })
                }
            </Box>
            {
                width > 900 &&
                <SimpleMap zoom={11} locations={areas} />

            }
        </Box>
    )
};
export default Areas;


// try {
//     var lat1 = location1.lat,
//         lng1 = location1.lng,
//         lat2 = location2.lat || location2.location.lat(),
//         lng2 = location2.lng || location2.location.lng();
//     var R = 6371, // Radius of the earth in km
//         dLat = this.deg2rad(lat2-lat1),  // deg2rad below
//         dLon = this.deg2rad(lng2-lng1), 
//         a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
//         d = R * c; // Distance in km
    
//     var m = d * 0.621371;
//     return m;
// } catch(e){
//     return null;
// }
