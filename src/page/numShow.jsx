import React, { useState } from 'react';
import './main.scss'
import CarShow1 from '../component/card1'
import BoxBtn5 from '../component/boxBtn5'
import CarShow2 from '../component/card2'
import HelloPage1 from '../component/helloPage'
const NumShow = (props) => {
    const btnOper =()=>{
        props.mapChange()

    }
   
    return (
        <>
            <div className='num_container'>
               <CarShow1 title="three.js" des="three.js，一个WebGL引擎，基于JavaScript，可直接运行GPU驱动游戏与图形驱动应用于浏览器。其库提供大量特性与API以绘制3D场景于浏览器。"/>

            </div>
            <div className='car2_container'>
            <CarShow1 title="D3" des="D3 遵循现有的 Web 标准,可以不需要其他任何框架独立运行在现代浏览器中,它结合强大的可视化组件来驱动 DOM 操作。"/>
                {/* <CarShow2 title="GDP" des="gdp一般指国内生产总值。 国内生产总值（Gross Domestic Product，简称GDP），是一个国家（或地区）所有常住单位在一定时期内生产活动的最终成果。GDP是国民经济核算的核心指标，也是衡量一个国家或地区经济状况和发展水平的重要指标。"></CarShow2> */}
                {/* <HelloPage1></HelloPage1> */}
            </div>
            <div className='center_btn'>
                <BoxBtn5 text="change"  btnOper={btnOper}></BoxBtn5>
            </div>

        </>
    )


}
export default NumShow