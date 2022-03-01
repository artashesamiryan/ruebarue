/* eslint-disable react-hooks/exhaustive-deps */
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
import { useAppSelector } from "../../Redux/hooks";


const Areas = () => {
    const width = useWindowSize();
    const history = useHistory()
    const location = window.location.pathname.split("/").filter((item: string) => item)[0];
    const [areas, setAreas]: any = useState([]);
    const [loading, setloading] = useState(false);
    const { id }: any = useParams();
    const { content } = useAppSelector(state => state.content);


    useEffect(() => {
        getPlace()
    }, [id])

    const getPlace = async () => {
        try {
            setloading(true)

            let data: any = [];
            if (location === "guide") {
                data = content?.recommendations
            } else if (location === "guestbook") {
                data = content?.rental?.destination?.recommendations
            } else {
                data = content?.destination?.recommendations
            }

            // const data = location === "guide" ? content?.recommendations
            //     :
            //     location === "guestbook" ? content?.rental?.destination?.recommendations :
            //         content?.destination?.recommendations

            console.log(data);

            const filteredData = data?.filter((item: any) => item.tab_id === id);

            setAreas(filteredData)
            setloading(false)
        } catch (error) {
            console.log(error)
        }
    };

    if (loading) {
        return <Spinner />
    };

    return (
        <Box display="flex">
            <Box width="566px" height="">
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
                    areas && areas.map((item: any, index: number) => {
                        return (
                            <div key={index}>
                                {
                                    width > 700 ?
                                        <AreaCard
                                            // key={index}
                                            id={item.id}
                                            price={item.price}
                                            number={index}
                                            lat={item.lat}
                                            lng={item.lng}
                                            // location={item.google.formatted_address}
                                            name={item.name}
                                            tip={item.tip}
                                            google={item.google}
                                            tags={item.tags}
                                            areas={areas}
                                        />
                                        :
                                        <MobileAreaCard
                                            // key={item.id}
                                            id={item.id}
                                            price={item.price}
                                            number={index}
                                            lat={item.lat}
                                            lng={item.lng}
                                            // location={item.google.formatted_address}
                                            name={item.name}
                                            tip={item.tip}
                                            google={item.google}
                                            tags={item.tags}
                                            areas={areas}
                                        />
                                }
                            </div>
                        )
                    })
                }
            </Box>
            {
                width > 900 &&
                <SimpleMap zoom={11} home={false} locations={areas} h="100vh" />

            }
        </Box>
    )
};
export default Areas;

