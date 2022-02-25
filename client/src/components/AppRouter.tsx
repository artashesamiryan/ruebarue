import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import AreaGuide from "../pages/AreaGuide";
import HomeGuide from "../pages/HomeGuide";
import Content from "../pages/HomeGuide/Content";
import YourReservation from "../pages/YourReservation/YourReservation";
import { contentSlice } from "../Redux/features/Content/contentSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import Areas from "./Areas/Areas";
import Spinner from "./Spinner/Spinner";
const AppRouter = () => {

    const { pathId, pathName } = useAppSelector(state => state.jsonType);
    const { content } = useAppSelector(state => state.content);
    const { getContent } = contentSlice.actions
    const dispatch = useAppDispatch();
    const [data, setData]: any = useState({});
    let typeName = window.location.pathname.split("/").filter((item: any) => item);
    let typeId = window.location.pathname.split("/").filter((item: any) => item);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getData();

    }, [])


    const getData = async () => {
        setLoading(true)
        const res = await axios.get(`http://localhost:5000/someurl?name=${typeName[0]}&&id=${typeId[1]}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });

        const body = await res.data;
        console.log(res.data);
        dispatch(getContent(body))

        setData(body)
        setLoading(false)
    };


    if (loading) {
        return (
            <Spinner />
        )
    }


    console.log(content, "*********")

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