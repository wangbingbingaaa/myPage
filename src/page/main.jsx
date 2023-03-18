import React, { useState } from 'react';
import MapOl from './mapOl';
import Header from './Header'
import Header2 from './Header2'
import ThreeMap from './ThreeMap'
import BoxBtn3 from '../component/boxBtn3'
import NumShow from './numShow'
import FootCon from './FootCon';

import './main.scss'
const MainPage = () => {
    let [mapVal,setMapVal] = useState(true)

    const btnOper =()=>{
        setMapVal(!mapVal)
        console.log('000')

    }
    return (
        <>
            <div className='main_container'>
                <div className='topHeader'>
                  
                    {/* <Header changeMap={changeMap}></Header> */}

                    {
                        mapVal == true ?
                        <Header/> : <Header2/>
                    }
                      <div className='sysChange'>
                    <BoxBtn3 text="切换系统" upBtn={btnOper}/>
                    </div>

                </div>
                <div className='center'>
                    {
                        mapVal == true ?
                        <>
                         <ThreeMap/> 
                         <NumShow></NumShow>
                         
                        </>
                       : <MapOl ></MapOl>
                    }
                       

                </div>
                <div className="footCon">
                {
                        mapVal == true ?
                    <FootCon ></FootCon> : ''}

                </div>

            </div>

        </>
    )


}
export default MainPage