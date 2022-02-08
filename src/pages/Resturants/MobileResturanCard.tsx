import { Box } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';
import GoogleIcon from '../../assets/icons/Google.png';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Network from '../../assets/icons/website.svg';
import Phone from '../../assets/icons/phone.svg';
import LOCATION from '../../assets/icons/directions.svg';
import Ride from '../../assets/icons/ride.svg';
import More from '../../assets/icons/more.svg';
import ArrowDown from '../../assets/icons/noun_Arrow_1058456.svg'

import DetailImg from '../../assets/custom/zion-national-park.png';

import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";
import { useState } from "react";

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
    }
});

interface IResturanCardProps {
    id: number;
    name: string;
    location: string,
    hostSays: string,

}

const MobileResturanCard = ({ id, name, location, hostSays }: IResturanCardProps) => {

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
                    <img src={DetailImg} alt="" width="150px" />
                    <div>
                        <img src={GoogleIcon} alt="" />
                        <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                        <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                        <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                        <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                        <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                    </div>
                </div>


                <div style={{ paddingLeft: '10px' }}>
                    <h3 style={{ fontSize: '2vh' }}>{name}</h3>
                    <p style={{ fontSize: '1.5vh' }}>{location}</p>
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
                <span>Your Host Says:</span>
                <p>{hostSays}</p>
                <button className={classes.ReadMore} onClick={() => history.push(`/restaurant/${id}`)}>Read More</button>
            </Box>

            <Box display="flex" justifyContent="center" position="absolute" top="90%" left="0" right="0" >
                <img src={ArrowDown} onClick={() => setMore(!more)} alt="" style={{ cursor: "pointer" }} />
            </Box>
        </Box >
    )
};

export default MobileResturanCard;