import { Box } from "@mui/system";
import GoogleIcon from '../../assets/icons/Google.png';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Network from '../../assets/icons/website.svg';
import Phone from '../../assets/icons/phone.svg';
import LOCATION from '../../assets/icons/directions.svg';
import Ride from '../../assets/icons/ride.svg';
import More from '../../assets/icons/more.svg';
import ArrowDown from '../../assets/icons/noun_Arrow_1058456.svg'
import AreaPin from '../../assets/icons/day_1.png';


import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Rating } from "@mui/material";

const useStyles = makeStyles({
    actions: {
        display: 'flex',
        "& img": {
            margin: '5px'
        }
    },
    Host: {

        '& span': {
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '16px',
            color: '#333333',

        },
        '& p': {
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: '14px',
            lineHeight: '18px',
            color: '#333333',

        }
    },
    ReadMore: {
        width: '108px',
        height: '34px',
        borderRadius: '3px',
        backgroundColor: 'e9f0f6',
        border: 'none',
        marginTop: '10px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: '14px',
        lineHeight: '14px',
        color: '#397096',
    },
    AreaNumber: {
        width: '110px',
        position: "absolute",
        display: 'flex',
        justifyContent: 'flex-end',
        color: 'white',
        fontSize: '14px',

        "& img": {
            position: "relative",
            margin: '5px'
        },
        "& span": {
            position: "absolute",
            right: "9.5px",
            margin: '5px',
            top: '2px',
            fontSize: '14px',

        }
    }
});

interface IResturanCardProps {
    id: number;
    name: string;
    location: string;
    google: IRecommendationsGoogle;
    number?: number;
    tip?: string;

}

const MobileAreaCard = ({ id, name, location, google, number = 1, tip }: IResturanCardProps) => {

    const classes = useStyles();
    const history = useHistory();
    const [more, setMore] = useState(false);


    return (
        <Box
            width="100%"
            marginTop={"20px"}
            height={more ? "0" : "160px"}
            padding="10px"
            overflow="hidden"
            position="relative"
            sx={{
                backgroundColor: "#FFFFFF",
            }
            }>

            <div style={{ display: "flex", cursor: 'pointer' }} >
                <div>
                    {
                        <div className={classes.AreaNumber}>
                            <img src={AreaPin} alt="" />
                            <span>{++number}</span>
                        </div>
                    }
                    <img src={`https://d1l272ftssh5ud.cloudfront.net/google/images/${google.place_id}.jpg`} alt="" width="100px" height="66px" />
                    <div>
                        <img src={GoogleIcon} alt="" />
                        <Rating sx={{ color: '#4791db' }} size="small" name="read-only" value={google.rating} readOnly />
                    </div>
                </div>


                <div style={{ paddingLeft: '10px', }}>
                    <h3 style={{ fontSize: '2vh' }}>{name}</h3>
                    <p style={{ fontSize: '1.5vh' }}>{location}</p>
                    <br />
                    <span >1.1 mi  *   $$   *   American (Traditional)</span>
                </div>
            </div>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="20px"

                sx={{
                    backgroundColor: '#E9F0F6',
                    mixBlendMode: 'normal',
                    borderRadius: '2px',
                }}>
                <div className={classes.actions}>
                    <img src={Network} alt="" />
                    <img src={Phone} alt="" />
                    <img src={LOCATION} alt="" />
                    <img src={Ride} alt="" />
                    <img src={More} alt="" />
                </div>

                <BookmarkIcon sx={{ color: '#666666' }} />
            </Box>
            <Box className={classes.Host} marginTop="16px" padding="5px">
                {
                    tip &&
                    <span>Your Host Says:</span>
                }
                <p>{tip}</p>

                {
                    // tip.length
                }
                <button className={classes.ReadMore} onClick={() => history.push(`/area/${id}`)}>Read More</button>
            </Box>

            <Box display="flex" justifyContent="center" position="absolute" top="90%" left="0" right="0" >
                <img src={ArrowDown} onClick={() => setMore(!more)} alt="" style={{ cursor: "pointer" }} />
            </Box>
        </Box >
    )
};

export default MobileAreaCard;