import React, { useEffect, useState } from 'react';
import { WOW } from 'wowjs'
import '../../../node_modules/wowjs/css/libs/animate.css'
import '../syscss/home.scss'
import SysPageOne from './sysPageOne'
import SysPageTwo from './SysPageTwo'
import SysPageThree from './sysPageThree'

import {
    HomeOutlined,
    DesktopOutlined,
    CarOutlined,
    CoffeeOutlined,
  } from '@ant-design/icons';
  import { gsap } from 'gsap';
import SysPageFour from './sysPageFour';
 

const SystemHome = () => {
    let [activeNav, setActiveNav] = useState('1')
    useEffect(() => {
        move('2', '150px', '#81d4fa')
      }, [])

    const move = (id, position, color)=> {
        let width = document.body.clientWidth
        var tl = gsap.timeline();
        let pos = width/4 * Number(id) - width/8
        setActiveNav(id)
        tl.to("#bgBubble", {duration: 0.15, bottom: "-30px", ease: "ease-out"}, 0)
          .to("#bubble1", {duration: 0.1, y: "220%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to("#bubble2", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to("#bubble3", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to("#bubble4", {duration: 0.1, y: "120%", boxShadow: 'none', ease: "ease-out",}, 0)
          .to(".icon", {duration: 0.05, opacity: 0, ease: "ease-out",}, 0)
          .to("#bgBubble", {duration: 0.2, left: pos, ease: "ease-in-out"}, 0.1)
          .to("#bgBubble", {duration: 0.15, bottom: "-50px", ease: "ease-out"}, '-=0.2')
          .to(`#bubble${id}`, {duration: 0.15, y: "0%", opacity: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', ease: "ease-out"}, '-=0.1')
          .to(`#bubble${id}> span`, {duration: 0.15, y: "0%", opacity: 0.7, ease: "ease-out"}, '-=0.1')
          .to("#navbarContainer", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
          .to("#bg", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
          .to("#bgBubble", {duration: 0.3, backgroundColor: color, ease: "ease-in-out"}, 0)
      }

    return (
        <>
            <div className='sysHome'>
                    
                <div id="navbarContainer">
                <div className="centerCon">
                       <div className="detialCon">
                       {(() => {
                                switch (activeNav) {
                                    case ('1'):
                                        return (<SysPageOne></SysPageOne>)
                                        break
                                    case ('2'):
                                        return (<SysPageTwo></SysPageTwo>)
                                        break
                                    case ('3'):
                                        return (<SysPageThree></SysPageThree>)
                                        break
                                    case ('4'):
                                        return (<SysPageFour></SysPageFour>)
                                        break
                                        return (<></>)
                                }

                            })()

                            }

                       </div>
                    </div>
                    <div id="navbar">
                        <div id="bubbleWrapper">
                            <div id="bubble1" className="bubble"><span className="icon"><HomeOutlined /></span></div>
                            <div id="bubble2" className="bubble"><span className="icon"><CarOutlined /></span></div>
                            <div id="bubble3" className="bubble"><span className="icon"><DesktopOutlined /></span></div>
                            <div id="bubble4" className="bubble"><span className="icon"><CoffeeOutlined /></span></div>
                        </div>
                        <div id="menuWrapper">
                            <div id="menu1" className="menuElement" onClick={()=>move('1', '50px', '#ffcc80')}><HomeOutlined /></div>
                            <div id="menu2" className="menuElement" onClick={()=>move('2', '150px', '#81d4fa')}><CarOutlined /></div>
                            <div id="menu3" className="menuElement" onClick={()=>move('3', '250px', '#c5e1a5')}><DesktopOutlined /></div>
                            <div id="menu4" className="menuElement" onClick={()=>move('4', '350px', 'antiquewhite')}><CoffeeOutlined /></div>
                        </div>
                    </div>
                    <div id="bgWrapper">
                        <div id="bg"></div>
                        <div id="bgBubble"></div>
                    </div>
                </div>

                <svg width="0" height="0" >
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" id="blurFilter" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>
                    </defs>
                </svg>

            </div>
        </>
    )
}
export default SystemHome