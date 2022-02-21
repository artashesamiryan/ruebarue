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
import { useAppSelector } from "../../Redux/hooks";


const useStyles = makeStyles({
    Accordion: {
        margin: '5px',
        border: 'none',
        boxShadow: 'none',
        backgroundColor: 'none',

        "&::before": {
            backgroundColor: 'unset'
        }
    }
});


interface IContentProps {
    orders: number[]
}


const Content = ({ orders }: IContentProps) => {



    const [items, setItems]: any = useState([]);
    const [loading, setLoading]: any = useState(false);
    const [expanded, setExpanded] = useState<number | false>(0);
    const classes = useStyles();
    const { pathType } = useAppSelector(state => state.jsonType);



    useEffect(() => {
        getContent()
    }, []);
    const handleChange =
        (panel: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };


    const getContent = async () => {

        const jsonAddress = pathType.split('/');


        try {
            setLoading(true)
            const res = await api.get(`${process.env.REACT_APP_BASE_URL}/${jsonAddress[1]}.json`);
            const body = res.data.account.welcome_guide;
            const x = body.filter((item: any, index: number) => orders.includes(item.id));
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


                    return (
                        <>
                            {item.body &&
                                <Accordion
                                    defaultExpanded={false}
                                    expanded={expanded === index}
                                    className={classes.Accordion}
                                    sx={{ margin: '5px', border: 'none', boxShadow: 'none' }}
                                    key={item.icon} onChange={handleChange(index)}>
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
                                            fontStyle="normal"
                                            fontSize="16px"
                                            lineHeight="16px"
                                            color="#333333"
                                            sx={{
                                                mixBlendMode: 'normal',
                                                opacity: 0.9
                                            }}>

                                            {item.body}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>}
                        </>
                    )
                })
            }

        </div >
    );
};
export default Content;