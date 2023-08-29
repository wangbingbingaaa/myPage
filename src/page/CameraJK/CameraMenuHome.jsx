import React, { useEffect, useState } from 'react';
import './css/jkhome.scss'
import {
    Rbox13, Rbox12,
} from 'react_wxb_ui'
import {
    AlertOutlined,
    RightOutlined,
    VideoCameraOutlined,
    EnvironmentOutlined,
    SkinOutlined,
    PartitionOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';
const CameraMenuHome = () => {
    useEffect(() => {
        initChart1() // 人员流动
        initChart2() // 气温表
        initChart3() // 报警统计
        initChart3() // 报警数量统计
        initChart4() // 报警类型统计
    })
    const initChart1 = () => {
        var chartDom = document.getElementById('onechart');
        let myChart = echarts.getInstanceByDom(chartDom);
        if (myChart == undefined) {
            myChart = echarts.init(chartDom);
        }

       
        var option;
        const colors = ['#EABF40', '#1795AD', '#F23917', '#74A0E5'];
        option = {
            color: colors,
            legend: {
                top: 'top',
                textStyle: {
                    color: '#cccccc'
                }
            },

            series: [
                {
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '50%'],
                    itemStyle: {
                        borderRadius: 6,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },

                    data: [
                        { value: 17, name: '外来人员' },
                        { value: 58, name: '员工' },
                        { value: 2, name: '陌生人' },

                    ]
                }
            ]
        };

        option && myChart.setOption(option);

    }
    const initChart2 = () => {
        var chartDom = document.getElementById('chart2Con');
        let myChart = echarts.getInstanceByDom(chartDom);
        if (myChart == undefined) {
            myChart = echarts.init(chartDom);
        }
        var option;

        option = {
            series: [
                {
                    type: 'gauge',
                    center: ['50%', '66%'],
                    startAngle: 200,
                    endAngle: -20,
                    min: 0,
                    max: 60,
                    splitNumber: 12,
                    itemStyle: {
                        color: '#FFAB91'
                    },
                    progress: {
                        show: true,
                        width: 20
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            width: 20
                        }
                    },
                    axisTick: {
                        distance: -45,
                        splitNumber: 5,
                        lineStyle: {
                            width: 2,
                            color: '#999'
                        }
                    },
                    splitLine: {
                        distance: -32,
                        length: 14,
                        lineStyle: {
                            width: 3,
                            color: '#999'
                        }
                    },
                    axisLabel: {
                        distance: -20,
                        color: '#999',
                        fontSize: 12
                    },
                    anchor: {
                        show: false
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        valueAnimation: true,
                        width: '40%',
                        lineHeight: 40,
                        borderRadius: 8,
                        offsetCenter: [0, '-15%'],
                        fontSize: 20,
                        fontWeight: 'bolder',
                        formatter: '{value} °C',
                        color: 'inherit'
                    },
                    data: [
                        {
                            value: 34
                        }
                    ]
                },
                {
                    type: 'gauge',
                    center: ['50%', '66%'],
                    startAngle: 200,
                    endAngle: -20,
                    min: 0,
                    max: 60,
                    itemStyle: {
                        color: '#FD7347'
                    },
                    progress: {
                        show: true,
                        width: 8
                    },
                    pointer: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    detail: {
                        show: false
                    },
                    data: [
                        {
                            value: 34
                        }
                    ]
                }
            ]

        };
        option && myChart.setOption(option);
    }
    const initChart3 = () => {
        var chartDom = document.getElementById('chart3con');
        let myChart = echarts.getInstanceByDom(chartDom);
        if (myChart == undefined) {
            myChart = echarts.init(chartDom);
        }
        var option;

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },

            legend: {
                data: ['个数', '温度'],
                textStyle: {
                    color: '#cccccc'
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '个数',
                    min: 0,
                    max: 20,
                    interval: 2,
                    axisLabel: {
                        formatter: '{value} 个'
                    }
                },
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [

                {
                    name: '个数',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' ml';
                        }
                    },
                    data: [
                        2, 5, 4, 7, 1, 6, 4, 3, 2, 4, 6, 3, 5, 9, 1, 4, 11, 5, 2
                    ]
                },
                {
                    name: '温度',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' °C';
                        }
                    },
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };

        option && myChart.setOption(option);

    }
    const initChart4 = () => {
        var chartDom = document.getElementById('chart4con');
        let myChart = echarts.getInstanceByDom(chartDom);
        if (myChart == undefined) {
            myChart = echarts.init(chartDom);
        }
        var option;

        option = {

            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 5, name: '陌生人闯入' },
                        { value: 12, name: '巡查' },
                        { value: 22, name: '特殊情况' },
                        { value: 12, name: '警觉' },
                        { value: 8, name: '排查' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        option && myChart.setOption(option);
    }
    return (
        <>
            <div className="muneHome">
                <div className="showReal">
                    <div className="textTitle">
                        园区示意图
                    </div>
                    <div className="center"></div>
                    <div className="pngRight">
                        <Rbox12 style={{ height: '220px', width: '440px' }} color={['#0C5382', '#2986C4']}>
                            <div className="warnNum">
                                <div className="toprow">
                                    <SkinOutlined style={{ paddingRight: '8px', color: '#2986C4' }} />
                                    今日温度
                                </div>
                                <div id="chart2Con">

                                </div>

                            </div>
                        </Rbox12>
                        <div className="line" style={{ height: '10px' }}>

                        </div>
                        <Rbox12 style={{ height: '230px', width: '440px' }} color={['#0C5382', '#2986C4']}>
                            <div className="warnNum">
                                <div className="toprow">
                                    <PartitionOutlined style={{ paddingRight: '8px', color: '#2986C4' }} />
                                    设备统计
                                </div>
                                <div className="shebei">
                                    <div className="item">
                                        设备总数
                                        <div className="piece">
                                            29个

                                        </div>

                                    </div>
                                    <div className="item">
                                        运行设备
                                        <div className="piece">
                                            23个

                                        </div>

                                    </div>
                                    <div className="item">
                                        暂停设备
                                        <div className="piece">
                                            4个

                                        </div>

                                    </div>
                                    <div className="item">
                                        待维修设备
                                        <div className="piece">
                                            2个

                                        </div>

                                    </div>


                                </div>

                            </div>
                        </Rbox12>

                    </div>


                </div>
                <div className="topcard">
                    <div className="item">

                        <Rbox12 style={{ height: '320px', width: '440px' }} color={['#0C5382', '#2986C4']}>
                            <div className="sumNumCon">
                                <div className="toprow">
                                    <RightOutlined style={{ paddingRight: '8px', color: '#2986C4' }} />
                                    人员流动检测
                                  
                                </div>
                                <div className="onechart" id='onechart'>

                                </div>



                            </div>
                        </Rbox12>
                    </div>
                    <div className="item">

                        <Rbox12 style={{ height: '320px', width: '440px' }} color={['#0C5382', '#2986C4']}>
                            <div className="warnNum">
                                <div className="toprow">
                                    <AlertOutlined style={{ paddingRight: '8px', color: '#2986C4' }} />
                                    报警统计
                                </div>
                                <div id="chart3con" className='onechart'>

                                </div>

                            </div>
                        </Rbox12>
                    </div>

                    <div className="item">

                        <Rbox12 style={{ height: '320px', width: '440px' }} color={['#0C5382', '#2986C4']}>
                            <div className="warnNum">
                                <div className="toprow">
                                    <VideoCameraOutlined style={{ paddingRight: '8px', color: '#2986C4' }} />
                                    告警类型统计
                                </div>
                                <div id="chart4con" className='onechart'>

                                </div>

                            </div>
                        </Rbox12>
                    </div>
                </div>


            </div>
        </>
    )
}
export default CameraMenuHome