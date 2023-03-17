import React, { useEffect, useState } from 'react';
import style from './btn.module.scss'
const BoxBtn = (props) => {
    const btnOper=()=>{
        props.upBtn('')

    }
    return (
        <>
            <div className={style.box_btn}>
                <button type="button" className={`${style.btn} ${style.cube} ${style.cubeHover}`} onClick={btnOper}>
                    <div className={style.bgTop}>
                        <div className={style.bgInner}></div>
                    </div>
                    <div className={style.bgRight}>
                        <div className={style.bgInner}></div>
                    </div>
                    <div className={style.bg}>
                        <div className={style.bgInner}></div>
                    </div>
                    <div className={style.text}>{props.text}</div>
                </button>
            </div>

        </>
    )
}
export default BoxBtn