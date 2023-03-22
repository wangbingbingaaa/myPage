import React, { useEffect, useState } from 'react';
import style from './btn.module.scss'
const BoxBtn4 = (props) => {
    return (
        <>
            <div className={style.box_btn4}>
                <button className={style.button2} onClick={()=>props.btnOper( props.text)}>
                { props.text}
                </button>
            </div>

        </>
    )
}
export default BoxBtn4