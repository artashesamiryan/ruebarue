import { makeStyles } from '@mui/styles';
import { useState } from "react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from "react-router-dom";

import MapImg from "../../assets/custom/map.png";
import useWindowSize from "../../hooks/UseWindowSize";



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
    const width = useWindowSize();
    const history = useHistory()
    const click = (e: any) => {
        const name = e.target.getAttribute('data-name');
        setContentVisible(!contentVisible);
        history.push(`/${name}`)
    }


    return (
        <Box display={'flex'}>
            <Box className={classes.Options} width="98%">
                <div onClick={click} data-name="grocery-pharmacy">Grocery / Pharmacy <ArrowForwardIosIcon fontSize="small" /></div>
                <div onClick={click} data-name="restaurants">Restaurants <ArrowForwardIosIcon fontSize="small" /></div>
                <div onClick={click} data-name="things-to-do">Things to Do<ArrowForwardIosIcon fontSize="small" /></div>
                <div onClick={click} data-name="guest-services">Guest Services <ArrowForwardIosIcon fontSize="small" /></div>
            </Box>

            {
                width > 750 &&
                < img src={MapImg} alt="" />
            }
        </Box>
    )
};


export default AreaGuide;