import React, { useEffect, useState } from 'react';
import style from './hello.module.scss'
// import useAnime from './animejs'
const HelloPage1 = (props) => {
    const animVal = {
        rotateZ: 360,
        duration: 8000,
        easing: "linear",
        loop: true

    }
    const animTime ={
        loop: true
    }


    const { animateTargetRef, animationRef } = useAnime({animVal,animTime})

      useEffect(() => {
        setTimeout(() => {
          animationRef.current?.play?.();
        }, 3000);
      }, [animationRef]);


    return (
        <>
            <div className={style.hello1}  ref={animateTargetRef}>
                <h1 className={style.ml8}>
                    <span className={style.lettersContainer}>
                        <span className={`${style.letters} ${style.lettersLeft}`}>Hi</span>
                        <span className={`${style.letters} ${style.bang}`}>!</span>
                    </span>
                    <span className={`${style.circle} ${style.circleWhite}`}></span>
                    <span className={`${style.circle } ${style.circleDark}`}></span>
                    <span className={`${style.circle } ${style.circleContainer}`}>
                        <span className="circle circle-dark-dashed"></span>
                        </span>
                </h1>

            </div>

        </>
    )
}
export default HelloPage1