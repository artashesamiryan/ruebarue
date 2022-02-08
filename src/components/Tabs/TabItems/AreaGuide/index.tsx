import { makeStyles } from '@mui/styles';
import { useState } from "react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Resturants from "../../../../pages/Resturants/Resturants";

interface IAreaGuide {
    labelName?: string
}

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

const AreaGuide = ({ labelName }: IAreaGuide) => {

    const classes = useStyles();
    const [contentVisible, setContentVisible] = useState(false);
    const [label, setLabel] = useState("");

    const click = (e: any) => {
        const name = e.target.getAttribute('data-name');
        setLabel(name)
        setContentVisible(!contentVisible)
    }


    return (
        <>
            {
                label === "restaurants" ?

                    <Resturants label={label} goBack={() => setLabel("")} />
                    :

                    <Box className={classes.Options} width="98%">
                        <div onClick={click} data-name="grocery-pharmacy">Grocery / Pharmacy <ArrowForwardIosIcon fontSize="small" /></div>
                        <div onClick={click} data-name="restaurants">Restaurants <ArrowForwardIosIcon fontSize="small" /></div>
                        <div onClick={click} data-name="things-to-do">Things to Do<ArrowForwardIosIcon fontSize="small" /></div>
                        <div onClick={click} data-name="guest-services">Guest Services <ArrowForwardIosIcon fontSize="small" /></div>
                    </Box>

            }


        </>
    )
};


export default AreaGuide;