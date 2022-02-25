// import React from 'react';
import { useHistory } from "react-router-dom";
import LOGO from '../../assets/Bitmap.png';


const Header = () => {

    const history = useHistory()

    return (

        <>
            <header>
                <a href="https://www.carolinaretreats.com/" target="_blank" rel="noreferrer">

                    <img style={{
                        cursor: 'pointer',
                        marginTop: '10px',
                        maxWidth: "300px",
                        maxHeight: "120px"
                    }} src={LOGO} alt="Blue water" onClick={() => history.push('/')} />
                </a>
            </header>
        </>
    )
};

export default Header;