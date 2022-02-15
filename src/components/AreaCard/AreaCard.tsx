import { Box } from "@mui/system";
import GoogleIcon from '../../assets/icons/Google.png';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Network from '../../assets/icons/website.svg';
import Phone from '../../assets/icons/phone.svg';
import LOCATION from '../../assets/icons/directions.svg';
import AreaPin from '../../assets/icons/day_1.png';
import Ride from '../../assets/icons/ride.svg';
import More from '../../assets/icons/more.svg';
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";
import { Rating } from "@mui/material";

const useStyles = makeStyles({
    address: {
        minWidth: '200px',
        paddingLeft: '10px',
        paddingRight: '10px',
        "& span": {
            colore: "#333333",
            lineHeight: '20px',
            letterSpacing: "1px",
            fontWeight: 'bold'
        },
        "& p": {
            colore: "#333333",
            lineHeight: '14px',
            fontSize: '14px',
            letterSpacing: "1px",
            paddingTop: '20px'

        },
    },
    button: {
        minWidth: '40px',
        height: '30px',
        borderRadius: '3px',
        border: 'none',
        backgroundColor: '#20305B',
        color: '#FFFFFF',

    },
    actions: {
        display: 'flex',
        alignItems: 'center',

        "& a": {
            margin: '5px',
            display: 'flex',
            alignItems: 'center',

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
        color: '#397096',
    },
    AreaNumber: {
        width: '100px',
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
    location: string,
    google: IRecommendationsGoogle;
    number?: number,
    tip?: ""
}

const AreaCard = ({ id, name, location, google, number = 1, tip }: IResturanCardProps) => {

    const classes = useStyles();
    const history = useHistory();

    return (
        <Box
            width="95%"
            margin="10px auto"
            minHeight="200px"
            sx={{
                backgroundColor: '#FFFFFF',
                borderRadius: '5px',
                padding: "23px",

            }}>

            <Box display="flex" justifyContent="space-between">
                <Box>
                    <div>
                        {
                            // number &&
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
                </Box>

                <div style={{ display: 'flex', flexDirection: 'column' }} className={classes.address}>
                    <span style={{ fontSize: '20px' }}>{name}</span>
                    <p>{location}</p>
                    {/* <p>1.1 mi  *   $$   *   American (Traditional)</p> */}
                </div>

                <button className={classes.button}>1.1 mi</button>
            </Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"

                sx={{
                    backgroundColor: '#E9F0F6',
                    mixBlendMode: 'normal',
                    borderRadius: '2px',
                }}>
                <div className={classes.actions}>
                    <a href={google.website} target="_blank" rel="noreferrer">
                        <img src={Network} alt="" />
                    </a>
                    <a href={`tel:${google.formatted_phone_number}`} >
                        <img src={Phone} alt="" />
                    </a>
                    <a href={`https://www.google.com/maps/search/${google.name} ${google.formatted_address}/ ${google.geometry.location.lat},${google.geometry.location.lng}`} rel="noreferrer" target="_blank">
                        <img src={LOCATION} alt="" />
                    </a>
                    <a href="/">
                        <img src={Ride} alt="" />
                    </a>
                    <a href="/">
                        <img src={More} alt="" />
                    </a>
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
                    tip &&
                    <button className={classes.ReadMore} onClick={() => history.push(`/area/${id}`)}>Read More</button>
                }

            </Box>
        </Box >
    )
};

export default AreaCard;