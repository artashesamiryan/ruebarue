import { Checkbox, Container, Dialog, IconButton, Rating, Slide, Toolbar, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import GoogleIcon from '../assets/icons/Google.png';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Network from '../assets/icons/website.svg';
import Phone from '../assets/icons/phone.svg';
import LOCATION from '../assets/icons/directions.svg';
import Ride from '../assets/icons/ride.svg';
import More from '../assets/icons/more.svg';
import useWindowSize from "../hooks/UseWindowSize";
import SimpleMap from "../components/SimpleMap/SimpleMap";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles({
    actions: {
        display: 'flex',
        alignItems: 'center',
        "& a": {
            margin: '5px',
            display: 'flex',
            alignItems: 'center',
        }
    },
    Weeks: {
        "& li": {
            listStyle: "none",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "14px",
            lineHeight: "18px",
            color: "#333333"
        }
    },
    Reviews: {
        marginTop: '10px',
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
});


interface IReviweItem {
    name: string,
    message?: string,
    date?: string,
    rating: number;
}
const ReviweItem = ({ name, message, date, rating }: IReviweItem) => {

    return (
        <Box marginTop="10px">
            <Typography color="#333333" fontWeight="bolder" fontSize="18px">{name}</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={GoogleIcon} alt="" />
                <Rating sx={{ color: '#4791db' }} size="small" name="read-only" value={rating} readOnly />
                <span style={{ fontSize: '12px', color: '#333333' }}> &nbsp;{date}</span>
            </div>
            <Typography>{message}</Typography>
        </Box>
    )
}


interface IModalProps {
    open: boolean;
    setOpen: (active: boolean) => void;
    query?: number | string;
    areas?: any;

}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Modal: FC<IModalProps> = ({ open, setOpen, query, areas }) => {
    const classes = useStyles();
    const width = useWindowSize();


    const [details, setDetails]: any = useState({});
    const [openingHours, setOpeningHours]: any = useState([]);
    const [reviews, setReviws]: any = useState([]);
    const [googleRating, setGoogleRating] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState([]);
    const [tip, setTipes] = useState('')
    const [less, setLess] = useState(true)

    const handleClose = () => {
        setOpen(false);

    };
    useEffect(() => {
        getPlaceDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getPlaceDetails = () => {
        try {
            setLoading(true)

            const getOne = areas.filter((item: any) => item.id === Number(query));
            const googleData = getOne[0].google;
            // const locs = googleData.name + googleData.formatted_address + "/" + googleData.geometry.location.lat + "," + googleData.geometry.location.lng;
            setTipes(getOne[0].tip);
            setLess(getOne[0].tip.length > 300 ? true : false)
            const openHours = googleData.opening_hours.weekday_text;
            const rvws = googleData.reviews;
            const googleRtng = googleData.rating;
            setReviws(rvws)
            setOpeningHours(openHours)
            setLocation(getOne)
            setDetails(googleData)
            setGoogleRating(googleRtng)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }

    };

    if (loading) {
        return <p>asdasdasd</p>
    }



    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            sx={{ height: '100vh' }}
        >
            <Container maxWidth="lg">
                <Box width="100%" display="flex" justifyContent="flex-end" sx={{ border: 'none' }}>
                    <Toolbar>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>


                    </Toolbar>
                </Box>
                <Box width="100%" sx={{ backgroundColor: '#FFFFFF' }} justifyContent="space-between" >
                    <Typography variant="h5" fontWeight="bolder">{details.name}</Typography>
                    <Box width="100%" display="flex">
                        <div style={{ width: width < 900 ? "100%" : "65%" }}>
                            <div style={{
                                backgroundImage: `url(https://d1l272ftssh5ud.cloudfront.net/google/images/${details.place_id}.jpg)`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: "contain",
                                backgroundPositionY: '20px',
                                width: '98%',
                                maxHeight: '500px',
                                minHeight: '400px'
                            }}></div>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>

                                {
                                    width < 900 &&
                                    <SimpleMap h="250px" zoom={11} home={false} locations={areas} />
                                }
                            </div>
                            <br />
                            <br />

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                width={width < 900 ? "100%" : "90%"}

                                sx={{
                                    backgroundColor: '#E9F0F6',
                                    mixBlendMode: 'normal',
                                    borderRadius: '2px',
                                }}>
                                <div className={classes.actions}>
                                    <a href={details.website} target="_blank" rel="noreferrer">
                                        <img src={Network} alt="" />
                                    </a>
                                    <a href={`tel:${details.formatted_phone_number}`}>
                                        <img src={Phone} alt="" />
                                    </a>
                                    <a href={`https://www.google.com/maps/search/${details.formatted_address}`} target="_blank" rel="noreferrer">
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
                                    {...label}
                                    icon={<BookmarkBorderIcon />}
                                    checkedIcon={<BookmarkIcon />}
                                />

                            </Box>
                            {
                                tip &&

                                <Box >
                                    <Typography color="#333333" fontWeight="bolder" variant="h6">Your Host Says</Typography>
                                    {
                                        less ?
                                            <Typography color="#333333" width={width < 900 ? "100%" : "80%"} fontSize="14px">
                                                {tip.slice(0, 100)}
                                                <span>...</span>
                                            </Typography >
                                            :

                                            <Typography color="#333333" width={width < 900 ? "100%" : "80%"} fontSize="14px">

                                                {tip}
                                            </Typography>
                                    }

                                    <button className={classes.ReadMore} onClick={() => setLess(!less)}>Read More</button>
                                </Box>
                            }

                            <Box marginTop="10px">
                                <Typography color="#333333" fontWeight="bolder" variant="h6">Hours</Typography>
                                <div className={classes.Weeks}>
                                    <ul>
                                        {
                                            openingHours && openingHours.map((item: string, index: number) => {


                                                return (
                                                    <li key={index}>
                                                        <span>{item}</span>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            </Box>

                            <Box className={classes.Reviews}>
                                <Typography color="#333333" fontWeight="bolder" variant="h6">Reviews</Typography>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img src={GoogleIcon} alt="" />
                                    {/* <Rating sx={{ color: '#4791db' }} size="small" name="read-only" value={googleRating} readOnly /> */}
                                </div>

                                {
                                    reviews && reviews.map((item: any, index: number) => {
                                        return (
                                            <ReviweItem key={index} name={item.author_name} message={item.text} date={item.date} rating={item.rating} />
                                        )
                                    })
                                }
                            </Box>

                        </div>
                        {
                            width > 900 &&
                            <div style={{ width: '595px', height: '300px' }} >
                                <Typography fontSize="14px" lineHeight="20px">{details.formatted_address}</Typography>
                                <SimpleMap link={details.formatted_address} h="300px" zoom={11} home={false} locations={location} />
                            </div>
                        }
                    </Box >
                </Box >
            </Container>
        </Dialog>
    )
};

export default Modal;