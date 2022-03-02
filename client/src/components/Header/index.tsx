// import React from 'react';
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";


const Header = () => {

    const history = useHistory();
    const { content } = useAppSelector(state => state.content);


    return (

        <>
            <header>
                <a href={content?.account?.preferences?.logo_url} target="_blank" rel="noreferrer">

                    <img style={{
                        cursor: 'pointer',
                        marginTop: '10px',
                        maxWidth: "300px",
                        maxHeight: "120px"
                    }} src={content?.account?.preferences?.logo_image_url} alt="Blue water" onClick={() => history.push('/')} />
                </a>
                <h1 style={{
                    marginTop: "20px",
                    marginBottom: "5px",
                    fontSize: "24px",
                }}>{content.name}</h1>
            </header>
        </>
    )
};

export default Header;