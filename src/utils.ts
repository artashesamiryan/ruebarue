import { useAppSelector } from './Redux/hooks';
import api from "./api";

export const HttpGet = async (url: any) => {
    const { pathType } = useAppSelector(state => state.jsonType);

    const l = window.location.pathname;
    const typeName = l.split('/');

    return api.get(url)
};
