import React, { useLayoutEffect, useState } from 'react';
import { WOW } from 'wowjs'
import '../../../node_modules/wowjs/css/libs/animate.css'
import '../syscss/sysOne.scss'

import lottie from 'lottie-web'
import img1 from '../../img/boy-4.png'
import img2 from '../../img/boy-2.png'
import img3 from '../../img/girl-3.png'
import img4 from '../../img/robot.png'
import img5 from '../../img/boy-6.png'
import img6 from '../../img/boy-7.png'
import img7 from '../../img/boy-8.png'
import img8 from '../../img/girl-6.png'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
const SysPageOne = () => {
    const imgStyle = {
        backgroundColor: 'aquamarine'
    }
    const [animationDog, setAnimation] = useState('')
    useLayoutEffect(() => {
        
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 200,
            mobile: true,
            live: false,
            scrollContainer: ".contentOne",
            
        })
        wow.init();
        const animation = lottie.loadAnimation({
            container: document.getElementById("animDiv"), // the dom element
            loop: true,
            autoplay: false,
            path: `${process.env.PUBLIC_URL}/json/dog.json`,
            renderer: 'svg',
            name:'dog',
            autoplay:true
        
          });
          setAnimation(animation)
          animation?.addEventListener('complete', () => {
            console.log('111111111111')
            // 操作
          });
          
          animation.addEventListener("DOMLoaded", () => {
            animation.playSegments([0, 24], true);

          });
    }, [])

    const throwPancake =()=>{
        animationDog.playSegments([[27,142],[14,26]],true);
    }

    return (
        <>
            <div className='contentOne'>
                <div className="words">
                    <div className="blue">

                    </div>
                    <div className="lineWords">WXB</div>
                   
                </div>
                <div className='picCenter'>


                    <div className="pictureOver">
                        <div className="imgHover wow rollIn" data-wow-duration="1s">
                            <img src={img1}></img>
                        </div>
                        <div className=" imgHover wow bounceIn" data-wow-duration="1s">
                            <img src={img6}></img>
                        </div>
                        <div className=" wow bounceInUp" data-wow-duration="1s">
                            <img src={img2}></img>
                        </div>
                        <div className=" wow bounceInDown" data-wow-duration="1s">
                            <img src={img3}></img>
                        </div>
                        <div className=" wow bounceInLeft" data-wow-duration="1s">
                            <img src={img4}></img>
                        </div>
                        <div className=" wow bounceInRight" data-wow-duration="1s">
                            <img src={img5}></img>
                        </div>
                        <div className=" wow rollIn" data-wow-duration="1s" data-wow-offset="200">
                            <img src={img6}></img>
                        </div>
                        <div className=" wow slideInDown" data-wow-duration="1s" data-wow-offset="200">
                            <img src={img7}></img>
                        </div>
                        <div className=" wow slideInLeft" data-wow-duration="1s" data-wow-offset="200">
                            <img src={img1}></img>
                        </div>
                        <div className=" wow slideInRight" data-wow-duration="1s" data-wow-offset="20">
                            <img src={img2}></img>
                        </div>
                        <div className=" wow lightSpeedIn" data-wow-duration="1s" data-wow-offset="200">
                            <img src={img3}></img>
                        </div>
                        <div className=" wow pulse" data-wow-duration="1s" data-wow-offset="200">
                            <img src={img4}></img>
                        </div>
                        <div className=" wow bounceInUp" data-wow-duration="1s" data-wow-offset="200">
                            <img src={img5}></img>
                        </div>
                        <div className=" wow bounceInDown" data-wow-duration="1s" data-wow-offset="200">
                            <img src={img6}></img>
                        </div>
                        <div className="  wow bounceInLeft" data-wow-duration="1s" data-wow-offset="200">
                            <img src={img7}></img>
                        </div>
                        <div className=" wow bounceInRight" data-wow-duration="1s" data-wow-offset="200">
                            <img src={img8}></img>
                        </div>


                    </div>
                </div>
                <div className="animDiv" id='animDiv' onClick={()=>throwPancake()}>

                </div>
                
            </div>
           
            {/* <svg width="0" height="0" >
                    <defs>
                        <filter id="dogFilter">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" id="blurFilter" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -15" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>
                    </defs>
                </svg> */}
        </>
    )
}
export default SysPageOne