import { makeStyles } from '@mui/styles';
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from "react-router-dom";

import useWindowSize from "../../hooks/UseWindowSize";
import Spinner from "../../components/Spinner/Spinner";
import SimpleMap from "../../components/SimpleMap/SimpleMap";
import { useAppSelector } from "../../Redux/hooks";

const useStyles = makeStyles({
    Options: {
        "& div": {
            width: '100%',
            background: "#FFFFFF",
            borderRadius: "5px",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            padding: '10px',
            paddingLeft: '10px',
            paddingRight: '3px',
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

const AreaGuide = () => {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [filteredAreas, setFilteredAreas]: any = useState([]);
    const width = useWindowSize();
    const { content } = useAppSelector(state => state.content);
    const history = useHistory()
    const location = window.location.pathname.split("/").filter((item: string) => item)[0];

    useEffect(() => {
        getPlace()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const click = (e: any) => {
        const label = e.target.getAttribute('data-label');
        const name = e.target.getAttribute('data-name');
        history.push(`/${label}`)
        history.push({
            pathname: label,
            state: { detail: name }
        })
    };
    const getPlace = async () => {
        try {
            setLoading(true);
            if (location === "guestbook") {
                setFilteredAreas(content?.rental?.account?.preferences?.tabs)
            } else {
                const data = content?.account?.preferences?.tabs;
                setFilteredAreas(data);
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <Box display={'flex'} justifyContent="space-between">
            {
                loading && <Spinner />
            }
            <Box className={classes.Options} sx={{ width: width < 750 ? "100%" : "59%" }}>
                {
                    filteredAreas.map((item: any, index: number) => {
                        return (
                            <div
                                style={{ textTransform: 'capitalize', boxShadow: "0 1px 12px rgb(0 0 0 / 8%)", border: "1px solid rgba(0,0,0,0.12)" }}
                                key={index}
                                onClick={click}
                                data-label={item.type}
                                data-name={item.label}
                            >
                                {item.label}
                                <ArrowForwardIosIcon sx={{ padding: "none", fontSize: '16px', marginRight: '5px' }} /></div>
                        )
                    })
                }
            </Box>
            {
                width > 750 &&
                <div style={{ position: "relative", width: "40%", height: '90vh' }}>
                    <SimpleMap zoom={11} home={true} w="566px" />
                </div>
            }
        </Box>
    )
};


export default AreaGuide;