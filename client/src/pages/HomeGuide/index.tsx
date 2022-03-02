/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/system"
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from "react";
import Content from "./Content";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useWindowSize from "../../hooks/UseWindowSize";
import SimpleMap from "../../components/SimpleMap/SimpleMap";
import { useAppSelector } from "../../Redux/hooks";
import { homeGuideTabs } from '../../Sort-models/home-guide-tabs';

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
    const location = window.location.pathname.split("/").filter((item: string) => item)[0];

    useEffect(() => {
        getTabs();

        window.addEventListener("click", (e: any) => {
            if (e.target.innerText === "HOME GUIDE") {
                setContentVisible(false)
            }
        })
    }, [])

    const click = (e: any) => {
        const name = e.target.getAttribute('data-name');
        const back = e.target.getAttribute('data-label');
        setContentVisible(!contentVisible);
        let filterbyType = contents.filter((item: any) => item.type === name);
        setOrders(filterbyType[0].order)
        setBackLabel(back);
    };

    const getTabs = () => {
        if (location === "guestbook") {
            setContents(content?.rental?.account?.preferences?.tabs)
        } else {
            const data = content?.account?.preferences?.tabs;
            setContents(data);
        }
        const TABS = location === "guestbook" ? content?.rental?.account?.preferences?.welcome_tabs
            :
            content?.account?.preferences?.welcome_tabs

        const valueArr = location === "guestbook" ? content?.rental?.account?.preferences?.welcome_tabs
            :
            content?.account?.welcome_ordering
        setContents(valueArr);

        const sorted: any = [];
        // eslint-disable-next-line array-callback-return
        Object.keys(homeGuideTabs).map((item: any, index) => {

            // eslint-disable-next-line array-callback-return
            TABS?.map((i: any, idx: number) => {
                if (i.type !== item) {
                    sorted.push(homeGuideTabs[item])
                }
            })
        });

        const a = [...new Set(sorted) as any]
        setTabs(a);
    }

    return (
        <Box
            display="flex"
            justifyContent="space-between"
        >
            {
                !contentVisible ?
                    <Box className={classes.Options} sx={{ width: width < 750 ? "100%" : "59%" }}>
                        {
                            tabs?.map((item: any, index: number) => {
                                return (
                                    <div
                                        style={{ fontSize: '16px', boxShadow: "0 1px 12px rgb(0 0 0 / 8%)", border: "1px solid rgba(0,0,0,0.12)" }}
                                        key={item.label}
                                        onClick={click}
                                        data-label={item.label}
                                        data-name={item.type}>
                                        {item.label}
                                        <ArrowForwardIosIcon sx={{ fontSize: '16px', marginRight: '5px' }} /></div>
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
                        />
                    </Box>
            }
            {
                width > 750 &&
                <div style={{ position: "relative", width: "40%", height: '90vh' }}>
                    <SimpleMap zoom={11} home={true} w="566px" />
                </div>
            }
        </Box>
    )
};
export default HomeGuide;