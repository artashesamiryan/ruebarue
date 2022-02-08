import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import StarIcon from '@mui/icons-material/Star';

import DetailImage from '../../assets/custom/DetailImage.png';
import DetailMap from '../../assets/custom/DetailMap.png';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Network from '../../assets/icons/website.svg';
import Phone from '../../assets/icons/phone.svg';
import LOCATION from '../../assets/icons/directions.svg';
import Ride from '../../assets/icons/ride.svg';
import More from '../../assets/icons/more.svg';
import GoogleIcon from '../../assets/icons/Google.png';

import { rewiews } from '../../content/data';
import useWindowSize from "../../hooks/UseWindowSize";
const useStyles = makeStyles({
    actions: {
        display: 'flex',


        "& img": {
            margin: '5px'
        }
    },
    Weeks: {
        display: 'flex',

        "& ul": {
            listStyle: "none",

        }
    },
    Reviews: {
        marginTop: '10px'
    }
});


interface IReviweItem {
    name: string,
    message?: string,
    date?: string
}
const ReviweItem = ({ name, message, date }: IReviweItem) => {

    return (
        <Box marginTop="10px">
            <Typography color="#333333" fontWeight="bolder" fontSize="18px">{name}</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={GoogleIcon} alt="" />
                <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                <span style={{ fontSize: '12px', color: '#333333' }}> &nbsp;{date}</span>
            </div>
            <Typography>{message}</Typography>

        </Box>
    )
}


const ResturanDetails = () => {

    const classes = useStyles();
    const width = useWindowSize();


    return (
        <Box padding="20px" sx={{ backgroundColor: '#FFFFFF' }}>
            <Typography variant="h5" fontWeight="bolder">Pacific Beach Tuesday Farmers' Market</Typography>
            <Box display="flex" justifyContent="space-between" >
                <div style={{ width: width < 900 ? "100%" : "65%" }}>
                    <img src={DetailImage} alt="" width={width < 900 ? "100%" : "90%"} />
                    <br />
                    <br />
                    <Typography fontSize="14px">$$   *   American (Traditional)</Typography>

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
                            <img src={Network} alt="" />
                            <img src={Phone} alt="" />
                            <img src={LOCATION} alt="" />
                            <img src={Ride} alt="" />
                            <img src={More} alt="" />
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
                                <li>Monday</li>
                                <li>Tuesday</li>
                                <li>Wednesday</li>
                                <li>Thursday</li>
                                <li>Friday</li>
                                <li>Saturday</li>
                                <li>Sunday</li>
                            </ul>
                            <ul style={{ marginLeft: '10px' }}>
                                <li>7:00 AM – 10:00 PM</li>
                                <li>7:00 AM – 10:00 PM</li>
                                <li>7:00 AM – 10:00 PM</li>
                                <li>7:00 AM – 10:00 PM</li>
                                <li>7:00 AM – 10:00 PM</li>
                                <li>7:00 AM – 10:00 PM</li>
                                <li>7:00 AM – 10:00 PM</li>
                            </ul>
                        </div>
                    </Box>

                    <Box className={classes.Reviews}>
                        <Typography color="#333333" fontWeight="bolder" variant="h6">Reviews</Typography>
                        <div>
                            <img src={GoogleIcon} alt="" />
                            <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                            <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                            <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                            <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                            <StarIcon fontSize="small" sx={{ color: '#666666' }} />
                        </div>

                        {
                            rewiews.map((item: any, index: number) => {



                                return (

                                    <ReviweItem key={index} name={item.name} message={item.message} date={item.date} />

                                )
                            })
                        }

                    </Box>

                </div>
                {
                    width > 900 && <div style={{ width: '35%' }}>
                        <Typography>901 Garnet Ave, San Diego, CA 92109, USA</Typography>
                        <img src={DetailMap} alt="" width="100%" />
                    </div>
                }
            </Box >
        </Box >
    )
};


export default ResturanDetails;