import { useRoutes } from "react-router-dom";
import MainPage from '../page/main'
import SmartCity from '../page/smartCity'
import SystemHome from '../page/sys/SystemHome'
import React from 'react';
function RouterEle(){
    const element = useRoutes([
        {
            path:'GASP',element:<SystemHome/>
        },
        {
            path:'/*',element:<MainPage/>
        },
       

    ])
    return (element)

}
export default RouterEle