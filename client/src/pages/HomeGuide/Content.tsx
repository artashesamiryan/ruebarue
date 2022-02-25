/* eslint-disable react-hooks/exhaustive-deps */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { makeStyles } from '@mui/styles';
import api from "../../api";
// import { useAppSelector } from "../../Redux/hooks";
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
}


const Content = ({ orders }: IContentProps) => {



    const [items, setItems]: any = useState([]);
    const [loading, setLoading]: any = useState(false);
    const [expanded, setExpanded] = useState<number | false>(0);
    const classes = useStyles();
    const { content } = useAppSelector(state => state.content);

    useEffect(() => {
        getContent()
    }, []);
    const handleChange =
        (panel: number, tit: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };


    const getContent = async () => {
        try {
            setLoading(true)
            const res = await api.get(`${process.env.REACT_APP_BASE_URL}/rental.json`);
            const body = content.welcome_guide;

            console.log(body, "??????");


            const x = body.filter((item: any, index: number) => {
                console.log(item, "items");

                return orders.includes(item.parent_id)
            });
            console.log(x, "XXXXXXXS");

            setItems(x);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div style={{ width: '566px' }}>

            {
                loading && <Spinner />
            }

            {
                items.map((item: any, index: number) => {

                    console.log(item.body)

                    return (
                        <div key={index}>
                            {(item.body !== "" || item.attachments !== null) &&
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
                                            fontFamily: 'guide-icons'
                                        }}></i> &nbsp; {item.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        <Typography
                                        // fontStyle="normal"
                                        // fontSize="16px"
                                        // variant="body1"
                                        // lineHeight="16px"
                                        // color="#333333"
                                        // sx={{
                                        //     mixBlendMode: 'normal',
                                        //     opacity: 0.9
                                        // }}
                                        >

                                            {String(item.body)}
                                        </Typography>

                                        {item.attachments &&
                                            <Box>
                                                {
                                                    item.attachments[0].url.includes("youtube") ?
                                                        <iframe
                                                            src={getYoutubeFrameLink(item.attachments[0].url) as string}
                                                            title="asdasd"
                                                            width={"350px"}
                                                            height={"300px"}></iframe> :
                                                        <img src={item.attachments[0].url} alt="" width="300px" />
                                                }
                                                {/* <img src={item.attachments[0].url} alt="" width="300px" /> */}
                                            </Box>
                                        }

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