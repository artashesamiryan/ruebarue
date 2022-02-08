import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from "../pages/Home";
import ResturanDetails from "../pages/Resturants/ResturanDetail";


const AppRouter = () => {

    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/restaurant/:id" component={ResturanDetails} />
            <Redirect to="/" />
        </Switch>
    )
};

export default AppRouter;