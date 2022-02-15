import { Box } from "@mui/system";
import { Rating, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import DetailMap from '../../assets/custom/DetailMap.png';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Network from '../../assets/icons/website.svg';
import Phone from '../../assets/icons/phone.svg';
import LOCATION from '../../assets/icons/directions.svg';
import Ride from '../../assets/icons/ride.svg';
import More from '../../assets/icons/more.svg';
import GoogleIcon from '../../assets/icons/Google.png';
import useWindowSize from "../../hooks/UseWindowSize";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleMap from "../../components/SimpleMap/SimpleMap";
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


    }
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


const AreaDetails = () => {

    const classes = useStyles();
    const width = useWindowSize();
    const { query }: any = useParams();
    const [details, setDetails]: any = useState({});
    const [location, setLocation]: any = useState('');
    const [openingHours, setOpeningHours]: any = useState([]);
    const [reviews, setReviws]: any = useState([]);
    const [googleRating, setGoogleRating] = useState<number>(0)


    useEffect(() => {
        getPlaceDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])


    const getPlaceDetails = async () => {

        try {
            const res = await axios(`${process.env.REACT_APP_BASE_URL}/DB.json`);
            const body = res.data.destination.recommendations;
            const getOne = body.filter((item: any) => item.id === Number(query));
            const googleData = getOne[0].google;
            const locs = googleData.name + googleData.formatted_address + "/" + googleData.geometry.location.lat + "," + googleData.geometry.location.lng;
            const openHours = googleData.opening_hours.weekday_text;
            const rvws = googleData.reviews;
            const googleRtng = googleData.rating;
            setReviws(rvws)
            setOpeningHours(openHours)
            setLocation(locs)
            setDetails(googleData)
            setGoogleRating(googleRtng)

        } catch (error) {
            console.log(error)
        }

    };


    return (
        <Box padding="20px" sx={{ backgroundColor: '#FFFFFF' }}>
            <Typography variant="h5" fontWeight="bolder">{details.name}</Typography>
            <Box display="flex" justifyContent="space-between" >
                <div style={{ width: width < 900 ? "100%" : "65%" }}>
                    <div style={{
                        backgroundImage: `url(https://d1l272ftssh5ud.cloudfront.net/google/images/${details.place_id}.jpg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        width: '100%',
                        maxHeight: '500px',
                        minHeight: '400px'
                    }}></div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        {
                            width < 900 &&
                            <img src={DetailMap} alt="" width={width < 600 ? "100%" : '570px'} style={{ margin: '0 auto' }} />
                        }
                    </div>
                    <br />
                    <br />
                    {/* <Typography fontSize="14px">$$   *   American (Traditional)</Typography> */}

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
                            <a href={`https://www.google.com/maps/search/${location}`} target="_blank" rel="noreferrer">
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

                    <Box>
                        <Typography color="#333333" fontWeight="bolder" variant="h6">Your Host Says</Typography>
                        <Typography color="#333333" width={width < 900 ? "100%" : "50%"} fontSize="14px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut convallis elit.
                            Praesent tempor iaculis quam quis accumsan. Ut ac risus tortor. Mauris pulvinar ipsum porta tortor fringilla,
                            non efficitur eros dapibus.
                        </Typography>
                    </Box>

                    <Box marginTop="10px">
                        <Typography color="#333333" fontWeight="bolder" variant="h6">Hours</Typography>
                        <div className={classes.Weeks}>
                            <ul>
                                {
                                    openingHours.map((item: string, index: number) => {


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
                            <Rating sx={{ color: '#4791db' }} size="small" name="read-only" value={googleRating} readOnly />
                        </div>

                        {
                            reviews.map((item: any, index: number) => {
                                return (
                                    <ReviweItem key={index} name={item.author_name} message={item.text} date={item.date} rating={item.rating} />
                                )
                            })
                        }
                    </Box>

                </div>
                {
                    width > 900 && <div style={{ width: '35%' }}>
                        <Typography fontSize="14px" lineHeight="20px">{details.formatted_address}</Typography>
                        <SimpleMap h="300px" zoom={11} />
                    </div>
                }
            </Box >
        </Box >
    )
};


export default AreaDetails;