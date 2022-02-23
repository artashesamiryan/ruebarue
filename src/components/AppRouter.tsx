import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AreaGuide from "../pages/AreaGuide";
import HomeGuide from "../pages/HomeGuide";
import Content from "../pages/HomeGuide/Content";
import YourReservation from "../pages/YourReservation/YourReservation";
import Areas from "./Areas/Areas";
const AppRouter = () => {

    return (
        <Switch>
            <Route path={`/`} component={YourReservation} exact />
            <Route path={`/your-reservation`} component={YourReservation} exact />
            <Route path={`/home-guide`} component={HomeGuide} exact />
            <Route path={`/home-guide`} component={Content} exact />
            <Route path={`/area-guide`} component={AreaGuide} exact />
            <Route path={`/:id`} component={Areas} exact />
            {/* <Route path="/area/:query" component={AreaDetails} exact /> */}
            {/* <Redirect to="/" /> */}
        </Switch>
    )
};

export default AppRouter;