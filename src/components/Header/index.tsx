// import React from 'react';
import { useHistory } from "react-router-dom";
import LOGO from '../../assets/Bitmap.png';


const Header = () => {

    const history = useHistory()

    return (

        <>
            <header>
                <img style={{ cursor: 'pointer', marginTop: '10px' }} src={LOGO} alt="Blue water" onClick={() => history.push('/')} />
            </header>
        </>
    )
};

export default Header;