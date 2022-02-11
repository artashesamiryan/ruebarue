import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ResturanCard from "./ResturanCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useWindowSize from "../../hooks/UseWindowSize";
import MobileResturanCard from "./MobileResturanCard";
import { useEffect, useState } from "react";
import MapImg from "../../assets/custom/map.png"
import { useHistory } from "react-router-dom";



const Resturants = () => {
    const width = useWindowSize();
    const history = useHistory()
    const [restaurants, setResturants] = useState([]);
    const [label, setLabel] = useState('')

    useEffect(() => {
        getPlace()
    }, [])

    const getPlace = async () => {
        const res = await axios('DB.json');
        const data = res.data.destination.recommendations;
        const filteredData = data.filter((item: any) => item.tab_id === "restaurants");
        setResturants(filteredData)
    };

    return (
        <Box display="flex">
            <Box width="96%" height="" sx={{ overflowY: width > 900 ? 'scroll' : 'none' }}>
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
                        <ArrowBackIosIcon fontSize="small" /> Restaurants
                    </Typography>
                </Box>
                {
                    restaurants.map((item: any, index: number) => {

                        return (
                            <div key={index}>
                                {
                                    width > 700 ?
                                        <ResturanCard
                                            key={item.id}
                                            id={item.id}
                                            location={item.google.formatted_address}
                                            name={item.name}
                                            google={item.google}
                                        />
                                        :
                                        <MobileResturanCard
                                            key={item.id}
                                            id={item.id}
                                            location={item.google.formatted_address}
                                            name={item.name}
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
                <img src={MapImg} alt="" height={"500px"} />

            }
        </Box>
    )
};
export default Resturants;