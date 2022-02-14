import { makeStyles } from '@mui/styles';
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from "react-router-dom";

import useWindowSize from "../../hooks/UseWindowSize";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";
import SimpleMap from "../../components/SimpleMap/SimpleMap";



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
    const [contentVisible, setContentVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [backLabel, setBackLabel] = useState("");
    const [areas, setAreas] = useState([]);
    const width = useWindowSize();
    const history = useHistory();


    const click = (e: any) => {

        const label = e.target.getAttribute('data-label');
        const name = e.target.getAttribute('data-type');

        setBackLabel(name)
        setContentVisible(!contentVisible);
        history.push(`/${label}`)
    };
    useEffect(() => {
        getTabs()
    }, [])
    const getTabs = async () => {

        try {
            setLoading(true);
            const response = await axios("DB.json");
            const body = response.data.account.preferences.tabs;
            setAreas(body)
            setLoading(false);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Box display={'flex'} width="100%">

            {
                loading && <Spinner />
            }
            <Box className={classes.Options} width="98%">

                {
                    areas.map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                                onClick={click}
                                data-label={item.type}
                                data-name={item.label}
                            >{item.label} <ArrowForwardIosIcon fontSize="small" /></div>
                        )
                    })
                }
            </Box>

            {
                width > 750 &&
                <SimpleMap zoom={11} />
            }
        </Box>
    )
};


export default AreaGuide;