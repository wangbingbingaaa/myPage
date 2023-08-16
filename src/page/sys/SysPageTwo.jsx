
import React, { useEffect, useState, useLayoutEffect } from 'react';
import '../syscss/sysOne.scss'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

const SysPageTwo = () => {

    useLayoutEffect(() => {
        gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
        gsap.fromTo("#motionSVG", { scale: 0.05, }, {
            scale: 0.1,
            scrollTrigger: {
                trigger: "#motionPath",
                scroller: '.contentTwo',
                start: "top center",
                end: "bottom top",
                scrub: true,
                // markers: true,

            },
            ease: "power1.inOut",
            immediateRender: true,
            motionPath: {
                path: "#motionPath",
                align: "#motionPath",
                alignOrigin: [0.5, 0.5],
                autoRotate: 90,
            }
        });
        let getRatio = window.innerHeight / (window.innerHeight + 360);
        gsap.fromTo('.top', {
            backgroundPosition: () => "50% 0px"
        }, {
            backgroundPosition: () => `50% -${window.innerHeight * (1 - getRatio)}px`,
            ease: "none",
            scrollTrigger: {
                trigger: ".top",
                scroller: '.contentTwo',
                start: "top top",
                // endTrigger: ".center_con",
                end: "bottom top",
                scrub: true,
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
                toggleClass: "active",
                // markers: true

            }
        }
        );

        gsap.fromTo('.center_con', {
            backgroundPosition: () => "50% 0px"
        }, {
            backgroundPosition: () => `50% -${window.innerHeight * (1 - getRatio)}px`,
            ease: "none",
            // xPercent:'11',
            scrollTrigger: {
                trigger: ".center_con",
                scroller: '.contentTwo',
                start: "top top",
                // endTrigger: ".downCenter",
                end: "bottom top",
                scrub: true,
                pin: true,
                pinSpacing: false,
                invalidateOnRefresh: true,
                toggleClass: "active",
            }
        }
        );


        ScrollTrigger.create({
            scroller: '.contentTwo',
            trigger: ".downCenter",
            start: "top top",
            end: "bottom top ",
            pin: true,
            pinSpacing: false,
            toggleClass: "active",
            // endTrigger: ".bootom",
        });

        ScrollTrigger.create({
            scroller: '.contentTwo',
            trigger: ".bootom",
            start: "top top",
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
            toggleClass: "active",
            // markers:true
        });

        // gsap.fromTo('.text', {
        //    opacity:0.2,
        //    scale:1,
        //    fontSize:'22px',
        //    color: 'white',
        //    textShadow: '1px 1px 3px black',
        //    textAlign: 'center',
        //    alignItems: 'center',
        //    lineHeight: '600px',
        // }, {
        //     opacity:1,
        //    scale:3,
        // ease: "power1.inOut",
        //     scrollTrigger: {
        //         trigger: ".text",
        //         scroller: '.contentTwo',
        //         start: "top top",
        //         end: "bottom top",
        //         scrub: true,
        //         // markers: true

        //     }
        // }
        // );

        gsap.timeline({
            scrollTrigger: {
                scroller: '.contentTwo',
              trigger: ".grid-container",
              start: "top top",
              end: () => innerHeight * 7,
              scrub: true,
              pin: ".grid",
              anticipatePin: 1
            }
          })
          .set(".gridBlock:not(.centerBlock)", {autoAlpha: 0})
          .to(".gridBlock:not(.centerBlock)", {duration: 0.1, autoAlpha: 1}, 0.001)
          .from(".gridLayer", {
            scale: 3.3333,
            ease: "none",
          });
          
          
          // Images to make it look better, not related to the effect
          const size = Math.max(innerWidth, innerHeight);
          gsap.set('.gridBlock', {backgroundImage: i => `url(https://picsum.photos/${size}/${size}?random=${i})`});
          
          const bigImg = new Image;    
          bigImg.addEventListener("load", function () {
            gsap.to(".centerPiece .gridBlock", {autoAlpha: 1, duration: 0.5});
          });
          
          bigImg.src = `https://picsum.photos/${size}/${size}?random=50`;



        // return () => {
        //     // 清楚代码（可选）
        // }


    }, [])

    return (
        <>
            <div className='contentTwo'>
                <div className="leftCon2">
                    <div style={{height:'20px'}}>

                    </div>
                    <div className="top">
                        <div className="text">大草原</div>

                    </div>
                    <div className="center_con">
                        <div className="text">蓝蓝的天</div>
                    </div>
                    <div className="downCenter">
                        <div className="text">湖泊</div>
                    </div>
                    <div className="bootom">
                        {/* <div className="text">最美的夕阳</div> */}
                    </div>
                    <div className="grid-container">
                        <div className="grid">
                            <div className="gridLayer">
                                <div className="gridBlock"></div>
                            </div>
                            <div className="gridLayer">
                                <div className="gridBlock"></div>
                            </div>
                            <div className="gridLayer">
                                <div className="gridBlock"></div>
                            </div>
                            <div className="gridLayer centerPiece">
                                <div className="gridBlock centerBlock"></div>
                            </div>
                            <div className="gridLayer">
                                <div className="gridBlock"></div>
                            </div>
                            <div className="gridLayer">
                                <div className="gridBlock"></div>
                            </div>
                            <div className="gridLayer">
                                <div className="gridBlock"></div>
                            </div>
                            <div className="gridLayer">
                                <div className="gridBlock"></div>
                            </div>
                            <div className="gridLayer">
                                <div className="gridBlock"></div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='scrollCon'>
                    <svg viewBox="0 0 1009 4002">
                        <path id="motionPath" className="st0" d="M15.395,3.31 C152.773,390.548 92.401,646.162 250.215,727.041 453.479,831.213 835.629,715.412 832.33,924.268 830.006,1071.385 20.339,1040.965 22.58,1206.204 24.517,1348.994 835.125,1320.378 832.275,1445.504 827.175,1669.362 57.235,1623.348 56.673,1760.63 55.674,2004.272 837.157,1936.609 837.205,2053.845 837.283,2246.807 137.92199,2252.96102 137.92199,2952.96102 " />
                        <g id="motionSVG" >
                            <path d="M939.3 261.6c10.4 0 18.8 8.4 18.8 18.8 0 71-19.7 140.2-57 200.2-33.9 54.6-80.6 99.3-136.1 130.6 20.2 17.9 37.6 38.6 51.9 61.7 27.5 44.3 42.1 95.5 42.1 147.9 0 10.4-8.4 18.8-18.8 18.8H688.1c-48.6 0-91-27.1-112.8-67-15.1 49.4-36.4 74.5-63.3 74.5s-48.2-25.1-63.3-74.6c-21.8 39.9-64.2 67.1-112.9 67.1H183.6c-10.4 0-18.8-8.4-18.8-18.8 0-52.5 14.6-103.6 42.1-147.9 14.4-23.1 31.8-43.8 51.9-61.7-55.5-31.3-102.2-76-136.1-130.6-37.3-60-57-129.2-57-200.2 0-10.4 8.4-18.8 18.8-18.8h209.7c74.7 0 138.3 48.5 161.1 115.6 10.1-27.9 22.2-46.2 36.4-54.9-6.4-58.6-56.2-104.3-116.4-104.3-10.4 0-18.8-8.4-18.8-18.8s8.4-18.8 18.8-18.8c58.6 0 109.8 32.8 136 80.9 26.3-48.2 77.4-80.9 136-80.9 10.4 0 18.8 8.4 18.8 18.8s-8.4 18.8-18.8 18.8c-60 0-109.6 45.3-116.4 103.5 14.7 8.3 27.2 26.9 37.6 55.5 22.8-67.1 86.4-115.5 161.1-115.5 0 0.1 209.7 0.1 209.7 0.1z" fill="#663333" p-id="2887"></path><path d="M729.6 299.2H920c-3.1 57.3-20.5 112.8-50.8 161.5-35.3 56.9-86 101.8-146.5 130-9.4 4.4-13.5 15.6-9.1 25 1.3 2.7 3.2 5 5.4 6.8 0.2 0.2 0.4 0.3 0.6 0.5l0.1 0.1c26.3 18.8 48.3 42.3 65.3 69.7 20.5 33 32.7 70.5 35.7 109.2H688.1c-50.1 0-90.9-40.8-90.9-90.9v-69.8-209.7c0-73 59.4-132.4 132.4-132.4z" fill="#FE6865" p-id="2888"></path><path d="M851.5 357.9c3.5 4.9 4.5 11.3 2.5 17-7.1 20.6-16.5 40.5-28 59-35.6 57.3-90 100.7-153.2 122.2-2 0.7-4 1-6.1 1-3.9 0-7.7-1.2-11-3.5-4.9-3.5-7.9-9.2-7.9-15.3V431.7c0-45 36.6-81.6 81.6-81.6H836c6.3-0.1 12 2.9 15.5 7.8z" fill="#663333" p-id="2889"></path><path d="M729.6 387.7h78.7c-4.2 9.1-9 17.9-14.3 26.4-26.2 42.2-64.2 75.8-108.5 96.5v-78.9c0.1-24.3 19.8-44 44.1-44z" fill="#4EC8D8" p-id="2890"></path><path d="M741.8 719.6c5.5 8.8 2.8 20.4-6 25.9-3.1 1.9-6.5 2.8-9.9 2.8-6.3 0-12.4-3.2-16-8.9C699 721.9 685 707 668.2 695c-8.4-6.1-10.4-17.8-4.3-26.3 6-8.4 17.8-10.4 26.2-4.3 20.8 14.9 38.2 33.5 51.7 55.2z" fill="#663333" p-id="2891"></path><path d="M559.5 588.7v1.8c-0.1 64.9-6.7 123.9-18.7 166-12.6 44-25.9 53-28.9 53-2.9 0-16.3-9-28.8-53-3.3-11.4-6.1-24-8.5-37.6h21.5c10.4 0 18.8-8.4 18.8-18.8s-8.4-18.8-18.8-18.8h-26.9c-1.7-14.9-2.9-30.7-3.7-47H512c10.4 0 18.8-8.4 18.8-18.8s-8.4-18.8-18.8-18.8h-47.5c0-2.3-0.1-4.6-0.1-7 0-63.8 6.2-124.2 17.6-170.2 12.5-50.5 26.5-64.2 30-65.3 3.5 1.1 17.5 14.8 30 65.3 11.2 45.7 17.5 105.8 17.5 169.2z" fill="#F9DCB2" p-id="2892"></path><path d="M426.7 431.7v279.5c0 50.1-40.8 90.9-90.9 90.9H203.2c3-38.8 15.2-76.2 35.7-109.2 17.1-27.5 39-50.9 65.3-69.7 0 0 4.8-4.6 6.1-7.4 4.4-9.4 0.3-20.6-9.1-25-60.5-28.2-111.2-73.2-146.5-130-30.3-48.8-47.7-104.3-50.8-161.6h190.4c72.9 0 132.4 59.4 132.4 132.5z" fill="#FE6865" p-id="2893"></path><path d="M375.8 431.7v106.7c0 6.1-2.9 11.8-7.9 15.3-3.2 2.3-7.1 3.5-11 3.5-2 0-4.1-0.3-6.1-1-63.1-21.5-117.5-64.9-153.2-122.2-11.5-18.5-20.9-38.3-28-59-2-5.7-1.1-12.1 2.5-17 3.5-4.9 9.2-7.9 15.3-7.9H294c45.2-0.1 81.8 36.6 81.8 81.6zM360 668.8c6 8.4 4.1 20.2-4.4 26.2-16.7 12-30.8 26.9-41.6 44.4-3.6 5.7-9.7 8.9-16 8.9-3.4 0-6.8-0.9-9.9-2.8-8.8-5.5-11.5-17.1-6-25.9 13.5-21.7 30.9-40.3 51.7-55.2 8.4-6 20.1-4.1 26.2 4.4z" fill="#663333" p-id="2894"></path><path d="M338.2 431.7v78.9c-44.3-20.7-82.2-54.2-108.4-96.5-5.3-8.5-10-17.3-14.3-26.4h78.7c24.3 0 44 19.7 44 44z" fill="#4EC8D8" p-id="2895"></path>
                        </g>
                    </svg>



                </div>



            </div>
        </>
    )
}
export default SysPageTwo