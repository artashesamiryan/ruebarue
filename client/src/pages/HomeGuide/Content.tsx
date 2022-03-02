/* eslint-disable react-hooks/exhaustive-deps */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import { useAppSelector } from "../../Redux/hooks";
import { getYoutubeFrameLink } from "../../utils";

const useStyles = makeStyles({
    Accordion: {
        margin: '5px 0',
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'none',
        "&::before": {
            backgroundColor: 'unset'
        }
    }
});

interface IContentProps {
    orders: number[];
};
const Content = ({ orders }: IContentProps) => {

    const [items, setItems]: any = useState([]);
    const [loading, setLoading]: any = useState(false);
    const [expanded, setExpanded] = useState<number | false>(0);
    const classes = useStyles();
    const { content } = useAppSelector(state => state.content);
    const location = window.location.pathname.split("/").filter((item: string) => item)[0];
    useEffect(() => {
        getContent();
    }, []);
    const handleChange =
        (panel: number, tit: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };


    const getContent = () => {
        try {
            setLoading(true)
            const body = location === "guestbook" ? content?.rental?.account?.welcome_guide : content?.account?.welcome_guide;
            const initialTabs = location === "guestbook" ? content?.rental?.welcome_guide : content?.welcome_guide;
            const allSubTabs = initialTabs.concat(body);

            const x = allSubTabs?.filter((item: any, index: number) => {
                return orders.includes(item.parent_id) || orders.includes(item.id) as any;
            });

            const clearEmptys = x.filter((item: any) => item.body !== "");
            let pp = clearEmptys.filter((ele: any, ind: number) => ind === clearEmptys.findIndex((elem: any) => elem.title === ele.title))

            setItems(pp);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    };



    return (
        <div style={{ width: '566px' }}>
            {loading && <Spinner />}
            {
                items.map((item: any, index: number) => {


                    return (
                        <div key={index}>
                            {
                                <Accordion
                                    defaultExpanded={false}
                                    expanded={expanded === index}
                                    className={classes.Accordion}
                                    sx={{ margin: '5px', border: 'none', boxShadow: 'none' }}
                                    onChange={handleChange(index, item.title)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        sx={{ border: 'none', boxShadow: 'none' }}
                                        id="panel1a-header"
                                        className={classes.Accordion}
                                    >
                                        <Typography
                                            display="flex"
                                            alignItems="center"
                                            fontSize="16px"
                                            fontWeight="bold"
                                            lineHeight="14px"
                                            color="#333333"
                                        ><i className={item.icon} style={{
                                            fontFamily: 'guide-icons',
                                            color: content?.account?.preferences?.color_2,
                                        }}></i> &nbsp; {item.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        <Typography
                                            fontStyle="normal"
                                            fontSize="16px"
                                            variant="body1"
                                            lineHeight="16px"
                                            color="#333333"
                                            sx={{
                                                mixBlendMode: 'normal',
                                                opacity: 0.9
                                            }}
                                        >

                                            {String(item.body)}
                                        </Typography>
                                        <Box>
                                            {
                                                item?.attachments?.map((item: any, index: number) => {

                                                    const a = item.url.includes("youtube") ?
                                                        <iframe
                                                            key={index}
                                                            src={getYoutubeFrameLink(item.url) as string}
                                                            title="asdasd"
                                                            width={"100%"}
                                                            height={"300px"}></iframe> :
                                                        <img src={item.url} key={item.url} alt="" width="300px" />

                                                    return a
                                                })
                                            }

                                        </Box>
                                    </AccordionDetails>
                                </Accordion>}
                        </div>
                    )
                })
            }
        </div >
    );
};
export default Content;