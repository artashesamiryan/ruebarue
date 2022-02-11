import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ResturanDetails from "../pages/Resturants/ResturanDetail";
import AreaGuide from "../pages/AreaGuide";
import HomeGuide from "../pages/HomeGuide";
import YourReservation from "../pages/YourReservation/YourReservation";
import Resturants from "../pages/Resturants/Resturants";


const AppRouter = () => {

    return (
        <Switch>
            <Route path="/" component={YourReservation} exact />
            <Route path="/your-reservation" component={YourReservation} exact />
            <Route path="/home-guide" component={HomeGuide} exact />
            <Route path="/area-guide" component={AreaGuide} exact />
            <Route path="/restaurants" component={Resturants} />
            <Route path="/restaurant/:id" component={ResturanDetails} />
            <Redirect to="/" />
        </Switch>
    )
};

export default AppRouter;