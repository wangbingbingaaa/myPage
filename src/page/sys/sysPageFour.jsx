import React, { useEffect, useState, useLayoutEffect } from 'react';
import '../syscss/sysFour.scss'
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';


const SysPageFour =()=>{

    useLayoutEffect(() => {
        gsap.registerPlugin(MotionPathPlugin);

    })


    return (<>
    <div className="motionPath">
        <svg width='800px' height='800px'>
        <path id="svg_1" d="m92.2857,163.99998l77.7143,-0.99998l68,181l51,-186l79,-2l68,186l62,-190l81,0l-98,299l-93,1l-53,-190l-61,187l-90,1l-91.71431,-286.00002z" opacity="NaN" stroke="#000" fill="#fff"/>
        </svg>

    </div>


    </>)

}
export default SysPageFour