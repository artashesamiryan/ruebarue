import { Container } from "@mui/material";
import React, { FC } from "react";




const AppLayout: FC = ({ children }) => {

    return (
        <Container maxWidth="lg" >
            {children}
        </Container>
    );
};


export default AppLayout;