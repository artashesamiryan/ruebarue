import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import Content from "./Content";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

const HomeGuide = () => {

    const classes = useStyles();
    const [contentVisible, setContentVisible] = useState(false);
    const [label, setLabel] = useState("")



    const click = (e: any) => {
        const name = e.target.getAttribute('data-name');
        setLabel(name)
        setContentVisible(!contentVisible)
    }


    return (
        <>

            {
                !contentVisible ?
                    <Box className={classes.Options} width="98%">
                        <div onClick={click} data-name="arrival">Arrival <ArrowForwardIosIcon fontSize="small" /></div>
                        <div onClick={click} data-name="departure">Departure <ArrowForwardIosIcon fontSize="small" /></div>
                        <div onClick={click} data-name="about-our-home">About Our Home <ArrowForwardIosIcon fontSize="small" /></div>
                        <div onClick={click} data-name="rental-rules">Rental Rules <ArrowForwardIosIcon fontSize="small" /></div>
                        <div onClick={click} data-name="safety-information">Safety Information <ArrowForwardIosIcon fontSize="small" /></div>
                        <div onClick={click} data-name="feedback">Feedback <ArrowForwardIosIcon fontSize="small" /></div>
                    </Box> :
                    <Box >
                        <Typography
                            display="flex"
                            alignItems="center"
                            textTransform="capitalize"
                            fontFamily="Lato"
                            fontStyle="normal"
                            fontSize="18px"
                            lineHeight="16px"
                            color="#333333"
                            padding="10px 10px"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setContentVisible(false)}
                        >
                            <ArrowBackIosIcon fontSize="small" /> {label}
                        </Typography>
                        <Content />
                    </Box>
            }
        </>
    )
};
export default HomeGuide;