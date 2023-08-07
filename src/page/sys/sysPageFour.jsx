import React, { useEffect, useState, useLayoutEffect } from 'react';
import '../syscss/sysFour.scss'
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const SysPageFour = () => {

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

        /* Main navigation */
        let panelsContainer = document.querySelector("#panels-container");

        /* Panels */
        const panels = gsap.utils.toArray("#panels-container .panel");
        console.log(panels.length)

        gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: "#panels-container",
                scroller: '.trunPage',
                pin: true,
                start: "top top",
                scrub: 1,
                // markers:true,
                snap: {
                    snapTo: 1 / (panels.length - 1),
                    inertia: false,
                    duration: { min: 0.1, max: 0.1 }
                },
                end: () => "+=" + (panelsContainer.offsetWidth - innerWidth)
            }
        });
        // gsap.to('.trunPage', {
        //     scrollTrigger: {
        //         trigger: ".trunPage",
        //         scroller: '.trunPage',
        //         pin: true,
        //         start: "top top",
        //         scrub: 1,
        //         markers: true,

        //         end: 'down top'
        //     }
        // });
    })

    return (<>
        <div className="trunPage">
            <section id="intro" className="full-screen pt-5 blue">
                <h1>A cool title</h1>

                <div id="clouds-layer-1" className="clouds"></div>
                <div id="clouds-layer-2" className="clouds"></div>
            </section>
            <section id="panels">
                <div id="panels-container" style={{ width: '500%' }}>
                    <article id="panel-1" className="panel full-screen red">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <img src="" alt="" />
                                </div>
                                <div className="col-6 d-flex flex-column">

                                    <h2>Panel 1</h2>

                                    <p className="step-description">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article id="panel-2" className="panel full-screen orange">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">

                                    <img src="" alt="" />

                                </div>
                                <div className="col-6 d-flex flex-column">

                                    <h2>Panel 2</h2>

                                    <p className="step-description">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.
                                    </p>


                                </div>
                            </div>
                        </div>
                    </article>
                    <article id="panel-3" className="panel full-screen purple">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">

                                    <img src="" alt="" />

                                </div>
                                <div className="col-6 d-flex flex-column">

                                    <h2>Panel 3</h2>

                                    <p className="step-description">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.
                                    </p>


                                </div>
                            </div>
                        </div>
                    </article>
                    <article id="panel-4" className="panel full-screen green">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">

                                    <img src="" alt="" />

                                </div>
                                <div className="col-6 d-flex flex-column">

                                    <h2>Panel 4</h2>

                                    <p className="step-description">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.
                                    </p>


                                </div>
                            </div>
                        </div>
                    </article>
                    <article id="panel-5" className="panel full-screen gray">
                        <div className="container">
                            <div className="row">
                                <div className="col-6">

                                    <img src="" alt="" />

                                </div>
                                <div className="col-6 d-flex flex-column">

                                    <h2>Panel 5</h2>

                                    <p className="step-description">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Including versions of Lorem Ipsum.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            {/* <section id="map" className="full-screen"></section> */}

        </div>


    </>)

}
export default SysPageFour