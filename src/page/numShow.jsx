import React, { useState } from 'react';
import './main.scss'
import CarShow1 from '../component/card1'
import CarShow2 from '../component/card2'
const NumShow = () => {
   
    return (
        <>
            <div className='num_container'>
               <CarShow1 title="GDP" des="gdp一般指国内生产总值。 国内生产总值（Gross Domestic Product，简称GDP），是一个国家（或地区）所有常住单位在一定时期内生产活动的最终成果。GDP是国民经济核算的核心指标，也是衡量一个国家或地区经济状况和发展水平的重要指标。"/>

            </div>
            <div className='car2_container'>
            <CarShow1 title="GIS" des="GIS一般指地理信息系统。 地理信息系统（Geographic Information System或 Geo－Information system，GIS）有时又称为“地学信息系统”。它是一种特定的十分重要的空间信息系统。"/>
                {/* <CarShow2 title="GDP" des="gdp一般指国内生产总值。 国内生产总值（Gross Domestic Product，简称GDP），是一个国家（或地区）所有常住单位在一定时期内生产活动的最终成果。GDP是国民经济核算的核心指标，也是衡量一个国家或地区经济状况和发展水平的重要指标。"></CarShow2> */}

            </div>

        </>
    )


}
export default NumShow