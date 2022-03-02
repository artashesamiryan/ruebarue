import Tab from '@mui/material/Tab';
// import useWindowSize from "../../hooks/UseWindowSize";
import { useState } from "react";
import { Tabs } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";

export default function LabTabs() {
    const [value, setValue] = useState('one');
    const history = useHistory();
    const location = window.location.pathname.split("/").filter((item: string) => item)[0];
    const { content } = useAppSelector(state => state.content);


    const handleChange = (event: React.SyntheticEvent, value: string) => {
        setValue(value);
    };

    return (
        <div style={{
            position: "sticky",
            zIndex: 555,
            top: "0px",
            maxHeight: "40px",
            backgroundColor: content?.account?.preferences?.color_1,
        }}>

            {
                location === "guide" ?
                    <Tabs
                        value={"three"}
                        onChange={handleChange}
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        sx={{
                            borderBottom: '1px solid #CCCCCC',
                            maxHeight: "40px",
                            position: 'sticky',
                            top: '150px'
                        }}
                    >
                        <Tab sx={{
                            width: '180px',
                            color: 'white',
                            borderRight: '1px solid white',
                            boxSizing: 'border-box',
                            fontSize: "13px",
                            paddingBottom: '15px',
                            minHeight: "40px !important",
                            maxHeight: "40px !important",
                            backgroundColor: value === "three" ? content?.account?.preferences?.color_2 : ""
                        }} value="three" label="AREA GUIDE" onClick={() => history.push('/area-guide')} />
                    </Tabs>
                    :
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="inherit"
                        indicatorColor="primary"
                        aria-label="primary tabs example"
                        sx={{
                            borderBottom: '1px solid #CCCCCC',
                            maxHeight: "40px",
                        }}
                    >
                        <Tab
                            sx={{
                                width: '180px',
                                color: 'white',
                                borderRight: '1px solid white',
                                boxSizing: 'border-box',
                                fontSize: "13px",
                                maxHeight: "40px !important",
                                paddingBottom: '15px',
                                backgroundColor: value === "one" ? content?.account?.preferences?.color_2 : ""
                            }} value="one" label="YOUR RESERVATION" onClick={() => history.push('/your-reservation')} />
                        <Tab sx={{
                            width: '180px',
                            color: 'white',
                            borderRight: '1px solid white',
                            boxSizing: 'border-box',
                            fontSize: "13px",
                            paddingBottom: '15px',
                            backgroundColor: value === "two" ? content?.account?.preferences?.color_2 : ""
                        }} value="two" label="HOME GUIDE" onClick={() => history.push('/home-guide')} />
                        <Tab sx={{
                            width: '180px',
                            color: 'white',
                            borderRight: '1px solid white',
                            boxSizing: 'border-box',
                            fontSize: "13px",
                            paddingBottom: '15px',
                            backgroundColor: value === "three" ? content?.account?.preferences?.color_2 : ""
                        }} value="three" label="AREA GUIDE" onClick={() => history.push('/area-guide')} />
                    </Tabs>

            }
        </div >
    );
}