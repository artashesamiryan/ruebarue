import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";
import Content from "./Content";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import useWindowSize from "../../hooks/UseWindowSize";
import SimpleMap from "../../components/SimpleMap/SimpleMap";
import api from "../../api";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
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

const HomeGuide = () => {

    const classes = useStyles();
    const [contentVisible, setContentVisible] = useState(false);
    const [backLabel, setBackLabel] = useState("")
    const [tabs, setTabs]: any = useState([]);
    const [contents, setContents]: any = useState([]);
    const [orders, setOrders] = useState<number[]>([]);
    const width = useWindowSize();
    const { content } = useAppSelector(state => state.content);

    const location: any = useLocation();

    useEffect(() => {
        getTabs();

        window.addEventListener("click", (e: any) => {
            if (e.target.innerText === "HOME GUIDE") {
                setContentVisible(false)
            }
        })

        console.log(content, "><><><><><><><><>");

    }, [])

    const click = (e: any) => {
        const name = e.target.getAttribute('data-name');
        const back = e.target.getAttribute('data-label');
        setContentVisible(!contentVisible);
        let filterbyType = contents.filter((item: any) => item.type === name);

        setOrders(filterbyType[0].order)
        setBackLabel(back);
    };

    const getTabs = async () => {
        const response = await api.get(`${process.env.REACT_APP_BASE_URL}/rental.json`);
        const TABS = response.data.account.preferences.welcome_tabs;
        const valueArr = response.data.account.welcome_ordering;
        const filteredArr = Object.values(valueArr.reduce((acc: any, cur: any) => Object.assign(acc, { [cur.type]: cur }), {}));
        setContents(filteredArr);
        setTabs(TABS);

    }

    return (
        <Box
            display="flex"
            justifyContent="space-between"
        >

            {
                !contentVisible ?
                    <Box className={classes.Options} sx={{ width: width < 750 ? "100%" : "49%" }}>
                        {
                            tabs.map((item: any, index: number) => {
                                return (
                                    <div
                                        style={{ fontSize: '16px' }}
                                        key={item.label}
                                        onClick={click}
                                        data-label={item.label}
                                        data-name={item.type}>
                                        {item.label}
                                        <ArrowForwardIosIcon fontSize="small" /></div>

                                )
                            })
                        }

                    </Box> :
                    <Box >
                        <Typography
                            display="flex"
                            alignItems="center"
                            textTransform="capitalize"
                            fontFamily="Lato"
                            fontStyle="normal"
                            fontSize="16px"
                            lineHeight="16px"
                            color="#333333"
                            padding="10px 10px"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setContentVisible(false)}
                        >
                            <ArrowBackIosIcon fontSize="small" /> {backLabel}
                        </Typography>
                        <Content
                            orders={orders}
                        // wifi={location.state ? location.state.detail : 'Arrival'} 
                        />
                    </Box>
            }

            {
                width > 750 &&
                <div style={{ position: "relative", width: "49%", height: '100vh' }}>
                    <SimpleMap zoom={11} home={true} w="566px" />
                </div>
            }
        </Box>
    )
};
export default HomeGuide;