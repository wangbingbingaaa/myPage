import React, { useEffect, useState, useLayoutEffect } from 'react';
import '../syscss/sysThree.scss'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

const SysPageThree=()=>{
    useLayoutEffect(() => {
        gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
        gsap.to(".containerX", {
            opacity: 1,
            scrollTrigger: {
                trigger: ".containerX",
                scroller: '.sysThreeCon',
                start: "top top",
                end: "300%", // 向下滚动 240% 距离时结束
                scrub: true, // 表示动画可以重复执行改成false表示只执行一次
                //   markers: true, //  绘制开始位置和结束位置的线条
                pin: true, // 动画执行期间，页面不进行滚动，动画执行结束后
            },
        });

        // 第一次动画，橙/蓝颜色切换
        // 蓝色手机覆盖橙色手机，触发实际，.umx-blue  进入 viewport
        gsap.to(".umx-blue", {
            height: "100%",
            ease: "expo-out",
            scrollTrigger: {
                trigger: ".umx-blue",
                scrub: true,
                scroller: '.sysThreeCon',
                //   markers: true,
            },
        });
        gsap.to(".blue-bg", {
            height: "100%",
            ease: "expo-out",
            scrollTrigger: {
                trigger: ".blue-bg",
                scrub: true,
                scroller: '.sysThreeCon',
                //   markers: true,
            },
        });

        // 第二次动画，黑/蓝手机切换
        // 等 blue 蓝色手机动画结束后，其 top 到达 viewport 视窗顶部时，触发下次动画
        gsap.to(".umx-black", {
            height: "100%",
            scrollTrigger: {
                trigger: ".blue-bg",
                start: "top top",
                end: "+1200",
                scrub: true,
                scroller: '.sysThreeCon',
                //   markers: true,
            },
        });
        gsap.to(".black-bg", {
            height: "100%",
            scrollTrigger: {
                scroller: '.sysThreeCon',
                trigger: ".blue-bg",
                start: "top top",
                end: "+1200",
                scrub: true,
                //   markers: true,
            },
        });
    })
    return(
        <>
        <div className="sysThreeCon">
        <div className="containerX">
            <div className="umx-figure">
                <div className="f-mask umx-orange" style={{overflow: 'hidden', height: '100%'}}>
                    <div className="f-box">
                        <figure className="umx-img umx-f1" style={{transform: 'translate(0px, 0px)'}}></figure>
                    </div>
                </div>
                <div className="f-mask umx-blue" style={{display: 'block', overflow: 'hidden', height: '0%'}}>
                    <div className="f-box">
                        <figure className="umx-img umx-f2"></figure>
                    </div>
                </div>
                <div className="f-mask umx-black" style={{display: 'block', overflow: 'hidden', height: '0%'}}>
                    <div className="f-box">
                        <figure className="umx-img umx-f3"></figure>
                    </div>
                </div>
            </div>
            <div className="mask-box">
                <div className="color-bg orange-bg active" style={{height: '100%'}}>
                    <div className="color-txt" style={{transform: 'translate(-50%, 0%)'}}>
                        <strong>橙</strong>
                        <p>大胆和前卫<br />的姿态</p>
                    </div>
                </div>
                <div className="color-bg blue-bg" style={{height: '0%'}}>
                    <div className="color-txt" style={{transform: 'translate(-50%, 0%)'}}>
                        <strong>蓝</strong>
                        <p>挑战和突破<br />的精神</p>
                    </div>
                </div>
                <div className="color-bg black-bg" style={{height: '0px'}}>
                    <div className="color-txt" style={{transform: 'translate(-50%, 0%)'}}>
                        <strong>黑</strong>
                        <p>简洁跳动<br />的语言</p>
                    </div>
                </div>
            </div>
        </div>


        </div>
        
        </>
    )
}
export default SysPageThree