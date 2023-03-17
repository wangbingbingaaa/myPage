import React, { useState } from 'react';
import MapPage from './mapPage';
import Header from './Header'
import ThreeMap from './ThreeMap'
import './main.scss'
const MainPage = () => {
    let [mapVal,setMapVal] = useState(false)
    const changeMap =()=>{
        setMapVal(!mapVal)
        console.log('000')

    }
    return (
        <>
            <div className='main_container'>
                <div className='topHeader'>
                    <Header changeMap={changeMap}></Header>

                </div>
                <div className='center'>
                    {
                        mapVal == true ?
                        <ThreeMap/> : <MapPage ></MapPage>
                    }
                   

                </div>
                <div className="footCon">

                </div>

            </div>

        </>
    )


}
export default MainPage