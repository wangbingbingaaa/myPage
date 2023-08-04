import Spline from '@splinetool/react-spline';
import React, { useEffect, useState } from 'react';
import { WOW } from 'wowjs'
import '../../node_modules/wowjs/css/libs/animate.css'
const SmartCity =(props)=>{
    
    useEffect(() => {
        var wow = new WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: true,
          live: false 
        })
        wow.init();
    }, [])
  
    return(
        <>
        <div  style={{ width:'100vw',height:'100vh' }}>
            <div className='header'>
                <div className=''>

                </div>


            </div>
            <div className="wow fadeInRight" data-wow-duration="1s" style={{fontSize:'30px',color:'white',height:'1000px',width:'100%'}} >
                <Spline scene="https://prod.spline.design/IC0luUOD6jtA1HLc/scene.splinecode" />
            </div>
                
        </div>
        </>
    )
}
export default SmartCity