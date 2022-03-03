/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useWindowSize from "../../hooks/UseWindowSize";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import AreaCard from "../../components/AreaCard/AreaCard";
import MobileAreaCard from "../../components/AreaCard/MobileAreaCard";
import SimpleMap from "../SimpleMap/SimpleMap";
import { useAppSelector } from "../../Redux/hooks";
import { calc } from "../../utils";
// import { v4 as uuid_v4 } from 'uuid'


const Areas = () => {
    const width = useWindowSize();
    const history = useHistory()
    const location = window.location.pathname.split("/").filter((item: string) => item)[0];
    const [areas, setAreas]: any = useState([]);
    const [loading, setloading] = useState(false);
    const { id }: any = useParams();
    const { content } = useAppSelector(state => state.content);
    const { state }: any = useLocation();
    const [obj, setObj]: any = useState({})

    useEffect(() => {
        getPlace()
    }, [id])

    const getPlace = () => {
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

            const filteredData = data?.filter((item: any) => item.tab_id === id);
            const checkEssentialType = filteredData?.map((item: any, index: number) => {
                let tempProps = JSON.parse(JSON.stringify(item));
                if (!item.hasOwnProperty("essential_type")) {
                    tempProps["essential_type"] = "a"

                    setObj((prev: any) => {


                        return {
                            ...prev,
                            [tempProps["essential_type"]]: []
                        }
                    })
                }
                else if (item.hasOwnProperty("essential_type")) {
                    tempProps["essential_type"] = item.essential_type;
                    setObj((prev: any) => {

                        return {
                            ...prev,
                            [item.essential_type]: []
                        }
                    })

                }
                return tempProps
            });


            const sorted = checkEssentialType?.sort((a: any, b: any) => {
                console.log(calc(content, a.lat, a.lng), "a");
                console.log(calc(content, b.lat, b.lng), "b");

                if (a.essential_type > b.essential_type) return 1;
                if (a.essential_type < b.essential_type) return -1;
                return 0
            });



            setAreas(sorted)
            setloading(false)
        } catch (error) {
            console.log(error)
        }
    };
    console.log(obj, "<<<");

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
                        onClick={() => history.push('/area-guide')}
                    >
                        <ArrowBackIosIcon fontSize="small" onClick={() => history.goBack()} />
                        {state?.detail}
                    </Typography>
                </Box>


                {
                    areas && areas.map((item: any, index: number) => {
                        return (
                            <div key={item.name}>
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
                <SimpleMap zoom={11} home={false} locations={areas} h="90vh" />

            }
        </Box>
    )
};
export default Areas;

