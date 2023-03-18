import React, { useEffect, useState } from 'react';
import style from './btn.module.scss'
const BoxBtn2 = (props) => {
    const btnOper = () => {
        props.upBtn('')
    }
    return (
        <>
            <div className={style.box_btn2}>
                <button onClick={btnOper}>
                {props.text}
                </button>

            </div>

        </>
    )
}
export default BoxBtn2