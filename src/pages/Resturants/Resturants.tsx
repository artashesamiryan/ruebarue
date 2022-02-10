import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ResturanCard from "./ResturanCard";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useWindowSize from "../../hooks/UseWindowSize";
import MobileResturanCard from "./MobileResturanCard";
import { useEffect, useState } from "react";

interface IResturants {
    label: string;
    goBack: (lab: string) => void;
}

const Resturants = ({ label, goBack }: IResturants) => {
    const width = useWindowSize();
    const [restaurants, setResturants] = useState([]);

    useEffect(() => {
        getPlace()
    }, [])

    const getPlace = async () => {
        const res = await axios('DB.json');
        const data = res.data.destination.recommendations;
        const filteredData = data.filter((item: any) => item.tab_id === "restaurants");
        setResturants(filteredData)
    };

    console.log(restaurants)
    return (
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
                    onClick={() => goBack('')}
                >
                    <ArrowBackIosIcon fontSize="small" /> {label}
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
                                    // google_place_id={item.}
                                    />
                                    :
                                    <MobileResturanCard id={item.id} location={item.google.formatted_address} name={item.name} hostSays={item.hostSays} key={item.id} />
                            }
                        </div>
                    )
                })
            }
        </Box>
    )
};
export default Resturants;