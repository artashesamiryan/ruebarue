import React from 'react';
// import HomeLayout from "../Layouts/HomePage/HomeLayout";
// import AllProductsPage from "../Pages/AllProductsPage/AllProductsPage";
// import CreateAccount from "../Pages/CreateAccount/CreateAccount";
// import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
// import FreeTemplates from "../Pages/FreeTemplates/FreeTemplates";
// import Login from "../Pages/Login/Login";



export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean
}


export const rental: IRoute[] = [
    // { path: '/', component: HomeLayout, exact: true },
    // { path: '/login', component: Login, exact: true },
    // { path: '/new-account', component: CreateAccount, exact: true },
    // { path: '/all-products', component: AllProductsPage, exact: true },
    // { path: '/repassword', component: ForgetPassword, exact: true },
    // { path: '/free-templates', component: FreeTemplates, exact: true },
];

export const guide: IRoute[] = [
    // { path: '/login', component: Login, exact: true },
    // { path: '/new-account', component: CreateAccount, exact: true },
];

export const guestbook: IRoute[] = [
    // { path: '/login', component: Login, exact: true },
    // { path: '/new-account', component: CreateAccount, exact: true },
];