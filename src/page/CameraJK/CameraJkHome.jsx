
import React, { useEffect, useState } from 'react';
import './css/jkhome.scss';
import { Button, Menu } from 'antd';
import { Avatar, Badge, Space } from 'antd';
import { NavLink,Outlet } from "react-router-dom"
import {Route,Routes,useNavigate} from 'react-router-dom'
import {
  
    UserOutlined,
    SecurityScanOutlined,
    HomeOutlined,
    SaveOutlined,
    PushpinOutlined,VideoCameraOutlined,
    AlertOutlined
} from '@ant-design/icons';
const CameraJkHome = () => {
    const navigate = useNavigate()
    var checkTime = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    var showtime = function () {
        var nowdate = new Date();
        var year = nowdate.getFullYear(),
            month = nowdate.getMonth() + 1,
            date = nowdate.getDate(),
            day = nowdate.getDay(),
            week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            h = nowdate.getHours(),
            m = nowdate.getMinutes(),
            s = nowdate.getSeconds(),
            h = checkTime(h),
            m = checkTime(m),
            s = checkTime(s);
        return year + "年" + month + "月" + date + "日 " + week[day] + " " + h + ":" + m + ":" + s;

    }
    function getItem (label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('主页', 'home', <HomeOutlined />),
        getItem('设备管理', 'videoManage', <VideoCameraOutlined />),
        getItem('视频存储记录', 'videoSaveList', <SaveOutlined />),
        getItem('危险人物行走标记', 'runMarker', <PushpinOutlined />),
        getItem('实时协查', 'assistVideo', <SecurityScanOutlined />),
        getItem('告警', 'sub1', <AlertOutlined />, [
            getItem('告警接收', 'receiveWarn'),
            getItem('告警发送', 'sendWarn'),
          
        ]),
        getItem('系统设置', 'sub2', <UserOutlined  />, [
            getItem('用户管理', 'userManage'),
            getItem('角色管理', 'roleManage'),
        ]),
    ];
    const menuClick =(e)=>{
        console.log(e)
        navigate(e.key)

    }
    const login =()=>{
        navigate('./CameraJkLogin')

    }

    return (
        <>
            <div className="jk">
                <div className="topMenu">
                    <div className="logo">
                        
                    </div>
                    <div className="leftLogoName">
                    海汇智能监视系统

                    </div>
                    <div className="menuRight">
                        <div className="time">
                            {showtime()}

                        </div>
                        <div className="ring">
                            <div className="ringIcon"></div>
                            <div className="badge">
                                <Space size="large">
                                    <Badge count={5}>
                                    </Badge>
                                </Space>
                            </div>
                        </div>
                        <div className="exit">
                           <NavLink to="/CameraJkLogin">退出</NavLink>
                        </div>

                    </div>


                </div>
                <div className="mainCon">


                    <div className="leftMenu">
                        <div className="userTop">
                            <div className="headerPng">

                            </div>
                            <div className="ueserName">
                            贺磊（超级管理员）

                            </div>

                        </div>

                        <Menu
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1','sub2']}
                            mode="inline"
                            theme="dark"
                            items={items}
                            onClick={menuClick}
                        />

                    </div>
                    <div className="rightContent">
                    <Outlet></Outlet>
                    </div>
                </div>

            </div>
        </>
    )


}
export default CameraJkHome