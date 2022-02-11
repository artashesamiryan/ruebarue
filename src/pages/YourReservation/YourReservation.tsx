import * as React from 'react';
import Box from '@mui/material/Box';
import Img from '../../assets/custom/Bitmap 7.png';

import { makeStyles } from '@mui/styles';
import { Typography } from "@mui/material";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useWindowSize from "../../hooks/UseWindowSize";

const useStyles = makeStyles({
    Left: {
        width: '98%',
        display: 'flex',
        flexDirection: 'column',
        "& img": {
            width: '100%',
            height: '361px'
        }
    },

    ImgRibbon: {
        width: '100%',
        height: '84px',
        background: `#000000`,
        opacity: 0.6,
        mixBlendMode: 'normal',
        position: 'absolute',
        bottom: '10px',
    },
    Checks: {
        width: '100%',
        marginTop: '20px',
        "& div": {
            width: '48%',
            background: "#FFFFFF",
            height: '90px',
            padding: "10px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }
    },
    CheckIn: {
        width: '150px',
        height: '34px',
        background: '#20305B',
        borderRadius: '5px',
        border: 'none',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '14px',
        color: '#FFFFFF',
    },
    Options: {
        "& div": {
            width: '100%',
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
            // margin: '10px'
        }
    }
});

const YourReservation = () => {
    const classes = useStyles();
    const width = useWindowSize();

    return (
        <Box
            width={'100%'}>
            <div className={classes.Left}>
                <div style={{ position: 'relative' }}>
                    <img src={Img} alt="" />
                    <div style={{ position: 'absolute', bottom: '15px', zIndex: 1, padding: " 0 15px" }}>
                        <Typography color={'white'} variant="body1">
                            7 Nights
                        </Typography>
                        <Typography color={'white'} variant="h6" sx={{ fontWeight: 'bold', lineHeight: '25px' }}>
                            B5335 Bayside Breeze Guestbook
                        </Typography>
                        <Typography color={'white'}>
                            San Diego, CA
                        </Typography>
                    </div>
                    <div className={classes.ImgRibbon}></div>
                </div>
                <Box display="flex" justifyContent="space-between" className={classes.Checks}>
                    <div style={{ borderLeft: "2px solid #21305B", borderRadius: '2px 5px 5px 2px' }}>
                        <Typography fontSize={width < 700 ? "1.5vh" : "15px"} lineHeight={"20px"} color="#666666">Check In</Typography>
                        <Typography fontSize={width < 700 ? "1.8vh" : "20px"} lineHeight={"30px"} variant="h6" sx={{ fontWeight: 'bold' }}>Sat, Dec 11, 2021</Typography>
                        <Typography fontSize={width < 700 ? "1.5vh" : "15px"} lineHeight={"20px"} color="#666666" >4:00 PM</Typography>
                    </div>
                    <div style={{ borderRight: "2px solid #21305B", borderRadius: '5px 2px 2px 5px' }}>
                        <Typography fontSize={width < 700 ? "1.5vh" : "15px"} lineHeight={"20px"} color="#666666">Check Out</Typography>
                        <Typography fontSize={width < 700 ? "1.8vh" : "20px"} lineHeight={"30px"} variant="h6" sx={{ fontWeight: 'bold' }}>Sat, Dec 11, 2021</Typography>
                        <Typography fontSize={width < 700 ? "1.5vh" : "15px"} lineHeight={"20px"} color="#666666" >10:00 AM</Typography>
                    </div>


                </Box>
                <Box display="flex" justifyContent="center" padding="10px 0">
                    <button className={classes.CheckIn}>Check In</button>
                </Box>

                <Box className={classes.Options}>
                    <div>Address and Access <ArrowForwardIosIcon fontSize="small" /></div>
                    <div>WiFi <ArrowForwardIosIcon fontSize="small" /></div>
                    <br />
                    <div>Book Again <ArrowForwardIosIcon fontSize="small" /></div>
                    <div>Visit Our Website <ArrowForwardIosIcon fontSize="small" /></div>
                </Box>
            </div>


        </Box>
    );
};


export default YourReservation;