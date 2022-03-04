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
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import { Checkbox, Rating, Typography } from "@mui/material";
import Distance from "../Distance";
import Modal from "../../UI/Modal";
import { useDispatch } from "react-redux";
import { bookmarksSlice } from "../../Redux/features/Bookmark/bookmarkSlice";

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
            margin: '5px',
            marginRight: '10px'
        },
        "& span": {
            position: "absolute",
            right: "14.5px",
            margin: '5px',
            top: '2px',
            fontSize: '14px',

        }
    }
});

interface IResturanCardProps {
    id: number;
    price: number;
    name: string;
    location?: string,
    google: IRecommendationsGoogle | any;
    number?: number,
    tip?: string;
    lat?: any;
    lng?: any;
    areas: any;
    tags?: string[];
    attachments: any;
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const MobileAreaCard = ({ id, attachments, price, name, location, tags, google, number = 1, tip, lat, lng, areas }: IResturanCardProps) => {

    const classes = useStyles();
    const [more, setMore] = useState(false);
    const [open, setOpen] = useState(false);
    const [less, setLess] = useState(true);
    const dispatch = useDispatch();

    const onCardClick = () => {
        setOpen(true);
    };
    const { setBookmarksId } = bookmarksSlice.actions;
    const onBook = (e: any) => {
        dispatch(setBookmarksId([id]));
    }
    return (
        <>
            <Modal
                open={open}
                setOpen={() => setOpen(!open)}
                areas={areas} query={id}
            />
            {
                google &&
                <Box
                    width="100%"
                    marginTop={"20px"}
                    height={more ? "0" : "200px"}
                    padding="10px"
                    overflow="hidden"
                    position="relative"
                    sx={{
                        backgroundColor: "#FFFFFF",
                    }
                    }>

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        style={{ display: "flex" }} onClick={() => setOpen(true)} >
                        <Box>
                            {
                                <div className={classes.AreaNumber}>
                                    <img src={AreaPin} alt="" />
                                    <span>{++number}</span>
                                </div>
                            }
                            <img src={`https://d1l272ftssh5ud.cloudfront.net/google/images/${google.place_id}.jpg`} alt="" width="100px" height="66px" />
                            <div>
                                <img src={GoogleIcon} alt="" />
                                <Rating sx={{ color: '#4791db', marginTop: '10px' }} size="small" name="read-only" value={google.rating} readOnly />
                            </div>
                        </Box>




                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '18px' }}>{name}</span>
                            <p style={{ fontSize: '14px' }}>{google.formatted_address}</p>
                            {price !== 0 ? <p>{price} $$</p> : ""}
                            {tags && tags.length > 0 &&
                                <p>
                                    {tags.join(' ')}
                                </p>}
                            <p></p>

                        </div>
                        <Box>
                            <Distance lat2={lat} lng2={lng} />
                        </Box>
                    </Box>


                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        marginTop="5px"

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

                        <Checkbox
                            {...label}
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                        />
                    </Box>
                    <Box className={classes.Host} marginTop="20px" padding="5px">
                        {tip &&
                            <Box>
                                <Typography color="#333333" fontWeight="bolder" variant="h6">Your Host Says</Typography>
                                {tip.length > 300 && less ?
                                    <Typography color="#333333" fontSize="14px">
                                        {tip.slice(0, 100)}
                                        <span>...</span>
                                    </Typography>
                                    :
                                    <Typography color="#333333" fontSize="14px">
                                        {tip}
                                    </Typography>}
                                {
                                    tip.length > 300 && <button className={classes.ReadMore} onClick={() => setLess(!less)}>
                                        Read
                                        {
                                            less ? " More" : " Less"
                                        }
                                    </button>
                                }
                            </Box>}
                    </Box>

                    <Box display="flex" justifyContent="center" position="absolute" top="90%" left="0" right="0" >
                        <img src={ArrowDown} onClick={() => setMore(!more)} alt="" style={{ cursor: "pointer" }} />
                    </Box>
                </Box >
            }
        </>
    )
};

export default MobileAreaCard;