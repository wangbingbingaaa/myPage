import React, { useEffect, useState } from 'react';
import style from './btn.module.scss'
const BoxBtn5 = (props) => {
    const btnOper = () => {
        props.btnOper('')

    }
    return (
        <>
            <div className={style.box_btn5}>
                <button dataText="Awesome" className={style.button}  onClick={btnOper}>
                    <span className={style.actualText}>&nbsp;{props.text}&nbsp;</span>
                    <span className={style.hoverText} aria-hidden="true">&nbsp;{props.text}&nbsp;</span>
                </button>
            </div>

        </>
    )
}
export default BoxBtn5