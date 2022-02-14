/* eslint-disable react-hooks/exhaustive-deps */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";


interface IContentProps {
    orders: number[]
}


const Content = ({ orders }: IContentProps) => {

    const [items, setItems]: any = useState([])
    const [loading, setLoading]: any = useState(false)


    useEffect(() => {
        getContent()
    }, [])


    const getContent = async () => {

        try {
            setLoading(true)
            const res = await axios(`http://localhost:3000/DB.json`);
            const body = res.data.account.welcome_guide;
            const x = body.filter((item: any, index: number) => orders.includes(item.id));
            setItems(x);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div>

            {
                loading && <Spinner />
            }

            {
                items.map((item: any, index: number) => {


                    return (
                        <Accordion sx={{ margin: '5px' }} key={index} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    display="flex"
                                    alignItems="center"
                                    fontSize="14px"
                                    fontWeight="bold"
                                    lineHeight="14px"
                                    color="#333333"
                                ><i className={item.icon} style={{
                                    fontFamily: 'guide-icons'
                                }}></i> &nbsp; {item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography
                                    fontStyle="normal"
                                    fontWeight="normal"
                                    fontSize="14px"
                                    lineHeight="18px"
                                    color="#333333"
                                    sx={{
                                        mixBlendMode: 'normal',
                                        opacity: 0.9
                                    }}>

                                    {item.body}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }

        </div >
    );
};
export default Content;