import React, { useEffect, useState } from 'react';
import './css/jkhome.scss'
import {
    Rbox13, Rbox12,
} from 'react_wxb_ui'
import {
    AlertOutlined,
    BookOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
const CameraMenuHome = () => {
    return (
        <>
            <div className="muneHome">
                <div className="topcard">
                    <div className="item">

                        <Rbox12 style={{ height: '320px', width: '440px' }} color={['#0C5382', '#2986C4']}>
                            <div className="sumNumCon">
                                <div className="toprow">
                                    <BookOutlined style={{ paddingRight: '12px' }} />
                                    概况
                                    {/* 报警次数
                                    总出入人数
                                    陌生人数
                                    员工人数
                                    巡查次数 */}
                                </div>
                                <div className="desrow">
                                    <div className="leftLable"></div>
                                    <div className="rightValue"></div>

                                </div>
                                <div className="desrow">
                                    <div className="leftLable"></div>
                                    <div className="rightValue"></div>

                                </div>
                                <div className="desrow">
                                    <div className="leftLable"></div>
                                    <div className="rightValue"></div>

                                </div>
                                <div className="desrow">
                                    <div className="leftLable"></div>
                                    <div className="rightValue"></div>

                                </div>
                                <div className="desrow">
                                    <div className="leftLable"></div>
                                    <div className="rightValue"></div>

                                </div>
                               

                            </div>
                        </Rbox12>
                    </div>
                    <div className="item">

                        <Rbox12 style={{ height: '320px', width: '440px' }} color={['#0C5382', '#2986C4']}>
                            <div className="warnNum">
                                <div className="toprow">
                                    <AlertOutlined style={{ paddingRight: '12px' }} />
                                    报警统计
                                    根据时间统计报警
                                </div>

                            </div>
                        </Rbox12>
                    </div>

                    <div className="item">

                        <Rbox12 style={{ height: '320px', width: '440px' }} color={['#0C5382', '#2986C4']}>
                            <div className="warnNum">
                                <div className="toprow">
                                    <VideoCameraOutlined style={{ paddingRight: '12px' }} />
                                    出入统计
                                    根据时间统计人数
                                </div>

                            </div>
                        </Rbox12>
                    </div>
                </div>
                <div className="showReal">
                    <div className="textTitle">
                        园区示意图
                    </div>
                    <div className="center"></div>


                </div>

            </div>
        </>
    )
}
export default CameraMenuHome