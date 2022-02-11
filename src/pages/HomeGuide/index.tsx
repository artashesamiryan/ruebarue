import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";
import Content from "./Content";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import MapImg from "../../assets/custom/map.png";
import axios from "axios";
import { getHomeGuideContent } from "../../utils";
import useWindowSize from "../../hooks/UseWindowSize";

const useStyles = makeStyles({
    Options: {
        "& div": {
            width: '98%',
            background: "#FFFFFF",
            borderRadius: "5px",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center',
            padding: '8px',
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
    const [label, setLabel] = useState("")
    const [tabs, setTabs]: any = useState([]);
    const [contents, setContents]: any = useState([]);
    const [orders, setOrders] = useState<number[]>([]);
    const width = useWindowSize()
    useEffect(() => {
        getTabs();
        getHomeGuideContent()
    }, [])

    const click = (e: any) => {
        const name = e.target.getAttribute('data-name');
        setLabel(name)
        console.log(name)
        setContentVisible(!contentVisible);
        let filterbyType = contents.filter((item: any) => item.type === name);
        setOrders(filterbyType[0].order)
    };

    const getTabs = async () => {
        const response = await axios(`http://localhost:3000/DB.json`);
        const TABS = response.data.account.preferences.welcome_tabs;
        const valueArr = response.data.account.welcome_ordering;
        const filteredArr = Object.values(valueArr.reduce((acc: any, cur: any) => Object.assign(acc, { [cur.type]: cur }), {}));
        setContents(filteredArr);
        setTabs(TABS);
    }



    return (
        <Box display="flex">

            {
                !contentVisible ?
                    <Box className={classes.Options} width="98%">
                        {
                            tabs.map((item: any, index: number) => {
                                return (
                                    <div key={index} onClick={click} data-name={item.type}>{item.label}<ArrowForwardIosIcon fontSize="small" /></div>

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
                            fontSize="18px"
                            lineHeight="16px"
                            color="#333333"
                            padding="10px 10px"
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setContentVisible(false)}
                        >
                            <ArrowBackIosIcon fontSize="small" /> {label}
                        </Typography>
                        <Content orders={orders} />
                    </Box>
            }

            {
                width > 750 &&
                < img src={MapImg} alt="" />
            }
        </Box>
    )
};
export default HomeGuide;