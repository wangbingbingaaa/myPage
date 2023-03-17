import React, { useEffect, useState } from 'react';
import style from './card.module.scss'
const CarShow2 = (props) => {

    return (
        <>
            <div className={style.boxCard2}>
                <div className={style.flipCard}>
                    <div className={style.flipCardInner}>
                        <div className={style.flipCardFront}>
                            <p className={style.title}>{props.title}</p>
                            <p>{props.smallTitle}</p>
                        </div>
                        <div className={style.flipCardBack}>
                            {/* <p className={style.title}>BACK</p> */}
                            <p>{props.des}</p>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}
export default CarShow2