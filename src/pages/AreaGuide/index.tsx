import { makeStyles } from '@mui/styles';
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from "react-router-dom";

import useWindowSize from "../../hooks/UseWindowSize";
import Spinner from "../../components/Spinner/Spinner";
import SimpleMap from "../../components/SimpleMap/SimpleMap";
import api from "../../api";



const useStyles = makeStyles({
    Options: {
        "& div": {
            width: '98%',
            background: "#FFFFFF",
            borderRadius: "5px",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            padding: '8px',
            marginTop: "6px",
            cursor: "pointer",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "14px",
            color: "#333333",
        }

    }
});

const AreaGuide = () => {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [filteredAreas, setFilteredAreas] = useState([]);
    const width = useWindowSize();
    const history = useHistory();


    const click = (e: any) => {

        const label = e.target.getAttribute('data-label');
        history.push(`/${label}`)
    };
    useEffect(() => {
        getPlace()
    }, [])

    const getPlace = async () => {

        try {
            setLoading(true)
            const res = await api.get(`${process.env.REACT_APP_BASE_URL}/rental.json`);
            const data = res.data.destination.recommendations;
            const filteredArr = data.reduce((acc: any, current: any) => {
                const x = acc.find((item: any) => item.tab_id === current.tab_id);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            setFilteredAreas(filteredArr);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <Box display={'flex'} width="100%" >

            {
                loading && <Spinner />
            }
            <Box className={classes.Options} sx={{ width: '566px' }}>

                {
                    filteredAreas.map((item: any, index: number) => {

                        return (
                            <div
                                style={{ textTransform: 'capitalize' }}
                                key={index}
                                onClick={click}
                                data-label={item.tab_id}
                                data-name={item.label}
                            >{item.tab_id} <ArrowForwardIosIcon fontSize="small" /></div>
                        )
                    })
                }
            </Box>

            {
                width > 750 &&
                <div style={{ position: "relative" }}>
                    <SimpleMap zoom={11} home={false} />
                </div>
            }
        </Box>
    )
};


export default AreaGuide;