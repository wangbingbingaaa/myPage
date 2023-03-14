import { useRoutes } from "react-router-dom";
import MainPage from '../page/main'
import React from 'react';
function RouterEle(){
    const element = useRoutes([
        {
            path:'',element:<MainPage/>
        }

    ])
    return (element)

}
export default RouterEle