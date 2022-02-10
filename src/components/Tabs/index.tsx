import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import YourReservation from "./TabItems/YourReservation/YourReservation";
import HomeGuide from "./TabItems/HomeGuide";
import AreaGuide from "./TabItems/AreaGuide";
import Map from '../../assets/custom/map.png';
import useWindowSize from "../../hooks/UseWindowSize";
import { useState } from "react";

export default function LabTabs() {
    const [value, setValue] = useState('1');
    let width = useWindowSize();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };



    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab sx={{ color: '#212F5B !important' }} label="YOUR RESERVATION" value="1" />
                        <Tab sx={{ color: '#212F5B !important' }} label="HOME GUIDE" value="2" />
                        <Tab sx={{ color: '#212F5B !important' }} label="AREA GUIDE" value="3" />
                    </TabList>

                </Box>


                <TabPanel value="1" sx={{ width: '100%', padding: '0', display: 'flex', justifyContent: 'space-between' }}>
                    <YourReservation />
                    {width < 900 ? '' : <div ><img src={Map} alt="" /></div>}
                </TabPanel>
                <TabPanel value="2" sx={{ width: '100%', padding: '0', display: 'flex', justifyContent: 'space-between' }}>
                    <HomeGuide />
                    {width < 900 ? '' : <div ><img src={Map} alt="" /></div>}
                </TabPanel>
                <TabPanel value="3" sx={{ width: '100%', padding: '0', display: 'flex', justifyContent: 'space-between' }}>
                    <AreaGuide />
                    {width < 900 ? '' : <div ><img src={Map} alt="" /></div>}
                </TabPanel>
            </TabContext>
        </Box>
    );
}