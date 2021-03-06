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
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Checkbox, Rating, Typography } from "@mui/material";
import Distance from "../Distance";
import Modal from "../../UI/Modal";
import { useState } from "react";
import { bookmarksSlice } from '../../Redux/features/Bookmark/bookmarkSlice';
import { useDispatch } from "react-redux";
import { getVimeoFrameLink } from "../../utils";

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
            // lineHeight: '12px',
            fontSize: '14px',
            // letterSpacing: "1px",
            paddingTop: '5px'

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
    attachments?: any;
};

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

function AreaCard({ id, price, attachments, name, location, tags, google, number = 1, tip, lat, lng, areas }: IResturanCardProps) {

    const classes = useStyles();
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
                query={id}
                setOpen={() => setOpen(!open)}
                areas={areas}
            />
            {google &&
                <Box
                    width="95%"
                    margin="0 0 10px 0"
                    minHeight="200px"
                    sx={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '5px',
                        padding: "10px",
                    }}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        onClick={onCardClick}
                        style={{ cursor: 'pointer' }}>
                        <Box>
                            <div>
                                <div className={classes.AreaNumber}>
                                    <img src={AreaPin} alt="" />
                                    <span>{++number}</span>
                                </div>
                                {
                                    google.place_id! &&
                                    <img src={`https://d1l272ftssh5ud.cloudfront.net/google/images/${google.place_id}.jpg`} alt="" width="160px" height="90px" />
                                }
                                <div>
                                    <img src={GoogleIcon} alt="" />
                                    <Rating sx={{ color: '#4791db', marginTop: '10px' }} size="small" name="read-only" value={google.rating} readOnly />
                                </div>
                            </div>
                        </Box>
                        <div style={{ display: 'flex', flexDirection: 'column' }} className={classes.address}>
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
                        sx={{
                            backgroundColor: '#E9F0F6',
                            mixBlendMode: 'normal',
                            borderRadius: '2px',
                        }}>
                        <div className={classes.actions}>
                            <a href={google.website} target="_blank" rel="noreferrer">
                                <img src={Network} alt="" />
                            </a>
                            <a href={`tel:${google.formatted_phone_number}`}>
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
                        <Checkbox
                            // {...label}
                            icon={<BookmarkBorderIcon />}
                            checkedIcon={<BookmarkIcon />}
                            name={String(id)}
                            onChange={onBook}
                        />
                    </Box>
                    <Box className={classes.Host} marginTop="16px" padding="5px">
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
                        <Box>
                            {
                                attachments && attachments?.map((vid: any, index: number) => {
                                    // console.log(parseVideoURL(vid?.url));
                                    return (
                                        vid.url.includes("vime" || "youtube") ?
                                            <iframe
                                                key={index}
                                                src={getVimeoFrameLink(vid?.url)}
                                                title="lll"
                                                width="100%"
                                                height="300px"
                                                style={{ border: "none" }}></iframe>
                                            :
                                            <img
                                                src={vid?.url}
                                                alt=""
                                                width={"100%"}
                                                height="300px" />
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Box>
            }
        </>
    );
}

export default AreaCard;