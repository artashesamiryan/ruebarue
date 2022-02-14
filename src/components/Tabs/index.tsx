import Tab from '@mui/material/Tab';
// import useWindowSize from "../../hooks/UseWindowSize";
import { useState } from "react";
import { Tabs } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function LabTabs() {
    const [value, setValue] = useState('one');
    const history = useHistory();

    const handleChange = (event: React.SyntheticEvent, value: string) => {
        setValue(value);
    };

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
        >
            <Tab value="one" label="YOUR RESERVATION" onClick={() => history.push('/your-reservation')} />
            <Tab value="two" label="HOME GUIDE" onClick={() => history.push('/home-guide')} />
            <Tab value="three" label="AREA GUIDE" onClick={() => history.push('/area-guide')} />
        </Tabs>
    );
}