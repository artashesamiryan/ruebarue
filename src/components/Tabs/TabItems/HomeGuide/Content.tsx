import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { homeGuideData } from '../../../../content/data';
import Icon from '../../../../assets/icons/noun_Door_1665892.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const Content = () => {
    return (
        <div>

            {
                homeGuideData.map((item: any, index: number) => {


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
                                ><img src={Icon} alt="" /> &nbsp; {item.title}</Typography>
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
                                    {item.text}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }

        </div>
    );
};
export default Content;