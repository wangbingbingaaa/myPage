
import React, { useEffect, useState } from 'react';
import './css/jkhome.scss';
import { Button, Menu, Dropdown,Descriptions } from 'antd';
import { Avatar, Badge, Space, Popover } from 'antd';
import { NavLink, Outlet } from "react-router-dom"
import { Route, Routes, useNavigate } from 'react-router-dom'
import {

    UserOutlined,
    SecurityScanOutlined,
    HomeOutlined,
    SaveOutlined,
    PushpinOutlined, VideoCameraOutlined,
    AlertOutlined
} from '@ant-design/icons';
const CameraJkHome = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const hide = () => {
      setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };
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
        getItem('概况统计', 'home', <HomeOutlined />),
        getItem('设备管理', 'videoManage', <VideoCameraOutlined />),
        getItem('视频存储记录', 'videoSaveList', <SaveOutlined />),
        getItem('危险人物行走标记', 'runMarker', <PushpinOutlined />),
        getItem('实时协查', 'assistVideo', <SecurityScanOutlined />),
        getItem('告警', 'sub1', <AlertOutlined />, [
            getItem('告警接收', 'receiveWarn'),
            getItem('告警发送', 'sendWarn'),
            getItem('告警设置', 'autoSendWarn'),

        ]),
        getItem('系统设置', 'sub2', <UserOutlined />, [
            getItem('用户管理', 'userManage'),
            getItem('角色管理', 'roleManage'),
        ]),
    ];
    const menuClick = (e) => {
        navigate(e.key)
    }
    const login = () => {
        navigate('./CameraJkLogin')

    }
    const openPop = () => {

    }
    const PopContent =()=>{
        return(
            <>
            <div className="popList">
                <Descriptions bordered column={1} size={'small'}>
                    <Descriptions.Item label="告警编号"><a>00005</a></Descriptions.Item>
                    <Descriptions.Item label="告警类型"> 陌生人闯入</Descriptions.Item>
                    <Descriptions.Item label="告警等级">高</Descriptions.Item>
                    <Descriptions.Item label="告警时间">2023-05-23 11:32:11</Descriptions.Item>
                </Descriptions>

            </div>
            </>
        )
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
                            {/* {showtime()} */}
                            {'2023 年 3月 23日 17:34:56'}

                        </div>
                        <div className="ring">
                            <div className="ringIcon"></div>
                            <Popover
                                content={PopContent}
                                title="最新告警"
                                trigger="click"
                                open={open}
                                onOpenChange={handleOpenChange}
                            >
                                <div className="badge">
                                    <Space size="large">
                                        <Badge count={1}>
                                        </Badge>
                                    </Space>
                                </div>
                            </Popover>

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
                            defaultOpenKeys={['sub1', 'sub2']}
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