import React, { useEffect, useState } from 'react';
import './main.scss'
import CarShow1 from '../component/card1'
import BoxBtn5 from '../component/boxBtn5'
import CarShow2 from '../component/card2'
import HelloPage1 from '../component/helloPage'
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import {
    Rbox10, Rheader4, Rheader3, Rheader2, Rheader1, Rline7, Rline6, Rline5, Rline4, Rline3, Rline2, Rline1,
    Rbox13, Rbox12, Rbox11, Rbox9, Rbox8, Rbox7, Rbox6, Rbox5, Rbox4, Rbox3, Rbox2, Rbox1, Rbox14, Rbox15
} from 'react_wxb_ui'

const NumShow = (props) => {
    const btnOper = () => {
        props.mapChange()
    }
    useEffect(() => {
        initChart1()
        initChart2()
    })
    const initChart1 = () => {
        var chartDom = document.getElementById('onechart');
        var myChart = echarts.init(chartDom);
        var option;
        const colors = ['#EABF40', '#1795AD', '#F23917', '#74A0E5'];
        option = {
            color: colors,
            legend: {
                top: 'bottom',
                textStyle: {
                    color: '#cccccc'
                }
            },

            series: [
                {
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [40, 130],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        { value: 40, name: 'rose 1' },
                        { value: 38, name: 'rose 2' },
                        { value: 32, name: 'rose 3' },
                        { value: 30, name: 'rose 4' },
                        { value: 28, name: 'rose 5' },
                        { value: 26, name: 'rose 6' },
                        { value: 22, name: 'rose 7' },
                        { value: 18, name: 'rose 8' }
                    ]
                }
            ]
        };

        option && myChart.setOption(option);

    }
    const initChart2 = () => {
        var chartDom = document.getElementById('twochart');
        var myChart = echarts.init(chartDom);
        var option;

        const colors = ['#EABF40', '#1795AD', '#F23917'];
        option = {
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                right: '20%'
            },

            legend: {
                data: ['Evaporation', 'Precipitation', 'Temperature'],
                textStyle: {
                    color: '#cccccc'
                }
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#cccccc'
                        }
                    },
                    // prettier-ignore
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Evaporation',
                    position: 'right',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: 'Precipitation',
                    position: 'right',
                    alignTicks: true,
                    offset: 80,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    type: 'value',
                    name: '温度',
                    position: 'left',
                    alignTicks: true,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colors[2]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [
                {
                    name: 'Evaporation',
                    type: 'bar',
                    data: [
                        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                    ]
                },
                {
                    name: 'Precipitation',
                    type: 'bar',
                    yAxisIndex: 1,
                    data: [
                        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                    ]
                },
                {
                    name: 'Temperature',
                    type: 'line',
                    yAxisIndex: 2,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };

        option && myChart.setOption(option);

    }


    return (
        <>
            <div className='num_container'>
                <CarShow1 title="three.js" des="three.js，一个WebGL引擎，基于JavaScript，可直接运行GPU驱动游戏与图形驱动应用于浏览器。其库提供大量特性与API以绘制3D场景于浏览器。" />

            </div>
            <div className='car2_container'>
                <CarShow1 title="D3" des="D3 遵循现有的 Web 标准,可以不需要其他任何框架独立运行在现代浏览器中,它结合强大的可视化组件来驱动 DOM 操作。" />
                {/* <CarShow2 title="GDP" des="gdp一般指国内生产总值。 国内生产总值（Gross Domestic Product，简称GDP），是一个国家（或地区）所有常住单位在一定时期内生产活动的最终成果。GDP是国民经济核算的核心指标，也是衡量一个国家或地区经济状况和发展水平的重要指标。"></CarShow2> */}
                {/* <HelloPage1></HelloPage1> */}
            </div>
            <div className='center_btn'>
                <BoxBtn5 text="change" btnOper={btnOper}></BoxBtn5>
            </div>

            <div className='num_r_con'>
                <Rbox12 style={{ height: '50%' }} color={['#1A9BB4', '#1A9BB4']}>
                    <div className="chart-top" id='onechart'>
                    </div>
                </Rbox12>
                <div style={{ height: '16px' }}></div>

                <Rbox12 style={{ height: '50%' }} color={['#1A9BB4', '#1A9BB4']}>
                    <div className="chart-down" id='twochart'>

                    </div>
                </Rbox12>



            </div>

        </>
    )


}
export default NumShow