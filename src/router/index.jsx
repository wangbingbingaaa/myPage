import { useRoutes } from "react-router-dom";
import MainPage from '../page/main';
import SmartCity from '../page/smartCity';
import SystemHome from '../page/sys/SystemHome';
import CameraJkHome from '../page/CameraJK/CameraJkHome';
import VideoSaveList from '../page/CameraJK/VideoSaveList';
import CameraMenuHome from '../page/CameraJK/CameraMenuHome';
import UserManage from '../page/CameraJK/UserManage';
import RoleManage from '../page/CameraJK/RoleManage';
import SendWarn from '../page/CameraJK/SendWarn';
import ReceiveWarn from '../page/CameraJK/ReceiveWarn';
import RunMarker from '../page/CameraJK/RunMarker';
import AssistVideo  from '../page/CameraJK/AssistVideo';
import VideoManage from '../page/CameraJK/VideoManage'
import CameraJkLogin  from '../page/CameraJK/CameraJkLogin'
import React from 'react';
function RouterEle(){
    const element = useRoutes([
        {
            path:'GASP',element:<SystemHome/>
        },
        {
            path:'CameraJkLogin',element:<CameraJkLogin/>
        },
        {
            path:'CameraJk',element:<CameraJkHome/>,
            children:[
                {
                    path:"home",
                    element:<CameraMenuHome />
                },{
                    path:"VideoSaveList",
                    element:<VideoSaveList />
                },{
                    path:"VideoManage",
                    element:<VideoManage />
                },{
                    path:"runMarker",
                    element:<RunMarker />
                },{
                    path:"assistVideo",
                    element:<AssistVideo />
                },{
                    path:"receiveWarn",
                    element:<ReceiveWarn />
                },{
                    path:"sendWarn",
                    element:<SendWarn />
                },{
                    path:"roleManage",
                    element:<RoleManage />
                },{
                    path:"userManage",
                    element:<UserManage />
                }
        ]
        },
        {
            path:'/*',element:<MainPage/>
        },
       

    ])
    return (element)

}
export default RouterEle