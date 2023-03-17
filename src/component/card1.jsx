import React, { useEffect, useState } from 'react';
import style from './card.module.scss'
const CarShow1 = (props) => {

    return (
        <>
            <div className={style.boxCard1}>
                <div className={style.card}>
                    <div className={style.align}>
                        <span className={style.red}></span>
                        <span className={style.yellow}></span>
                        <span className={style.green}></span>
                    </div>

                    <h1>{props.title}</h1>
                    <div className={style.desCon}>
                    {props.des}
                    </div>
                </div>


            </div>

        </>
    )
}
export default CarShow1