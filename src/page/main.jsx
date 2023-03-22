import React, { useState } from 'react';
import MapOl from './mapOl';
import Header from './Header'
import Header2 from './Header2'
import ThreeMap from './ThreeMap'
import BoxBtn3 from '../component/boxBtn3'
import NumShow from './numShow'
import FootCon from './FootCon';
import FlyLineTree from './flyLineTree'

import './main.scss'
const MainPage = () => {
    let [mapVal, setMapVal] = useState(true)
    let [threeType, setThreeType] = useState(true)

    const btnOper = () => {
        setMapVal(!mapVal)

    }
    const mapChange = () => {
        setThreeType(!threeType)

    }
    return (
        <>
            <div className='main_container'>
                <div className='topHeader'>
                    {
                        mapVal == true ? <Header /> : <Header2 />
                    }
                    <div className='sysChange'>
                        <BoxBtn3 text="切换系统" upBtn={btnOper} />
                    </div>

                </div>
                <div className='center'>
                    {
                        mapVal == true ?
                            <>
                                {threeType ? <FlyLineTree /> : <ThreeMap />}
                                <NumShow mapChange={mapChange}></NumShow>
                            </>
                            : <MapOl ></MapOl>
                    }


                </div>
                {
                    mapVal == true ?
                        <div className="footCon">
                            <FootCon ></FootCon>
                        </div>
                        : ''
                }

            </div>

        </>
    )


}
export default MainPage