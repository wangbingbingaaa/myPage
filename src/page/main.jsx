import React from 'react';
import MapPage from './mapPage';
import Header from './Header'
import ThreeMap from './ThreeMap'
import './main.scss'
const MainPage = () => {
    const changeMap =()=>{
        console.log('000')

    }
    return (
        <>
            <div className='main_container'>
                <div className='topHeader'>
                    <Header changeMap={changeMap}></Header>

                </div>
                <div className='center'>
                    {/* <MapPage ></MapPage> */}
                    <ThreeMap/>

                </div>
                <div className="footCon">

                </div>

            </div>

        </>
    )


}
export default MainPage