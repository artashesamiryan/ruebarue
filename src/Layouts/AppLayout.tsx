/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppRouter from "../components/AppRouter";
import Header from "../components/Header";
import LabTabs from "../components/Tabs";



const AppLayout: FC = () => {

    const history = useHistory();

    useEffect(() => {
        history.push('')
    }, [])


    return (
        <Container maxWidth="lg" >
            <Header />
            <LabTabs />
            <AppRouter />
        </Container>
    );
};


export default AppLayout;