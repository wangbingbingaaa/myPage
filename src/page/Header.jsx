import React, { useEffect, useState } from 'react';
import './main.scss'
import moment from 'moment'
import logo from '../logo.svg';
const Header = (props) => {
    const [timer, setTimer] = useState('')
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setRefresh((r) => r + 1);
            setTimer(moment(new Date().getTime()).format('YYYY年MM月DD日 HH时mm分ss秒'))
        }, 1000)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [refresh])
    const btnOper =()=>{
        props.changeMap()
    }


    return (
        <>
            <div className="header-line">
            <img src={logo} className="AppLogo" alt="logo" />

                <div className='header-text'>
                    XXX-系统
                </div>
                <div className='header-time'>
                    {timer}
                </div>
              
                    {/* <BoxBtn text="切换" upBtn={btnOper}/> */}


            </div>
        </>
    )


}
export default Header