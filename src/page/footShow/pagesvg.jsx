import React, { useEffect, useState } from 'react';
import {
    Rbox10, Rheader4, Rheader3, Rheader2, Rheader1, Rline7, Rline6, Rline5, Rline4, Rline3, Rline2, Rline1,
    Rbox13, Rbox12, Rbox11, Rbox9, Rbox8, Rbox7, Rbox6, Rbox5, Rbox4, Rbox3, Rbox2, Rbox1, Rbox14, Rbox15
} from 'react_wxb_ui'
const Pagesvg = (props) => {
    const [initData, setInitData] = useState(true)
    useEffect(() => {
        console.log('ooppossjj---')
        return () => {
            setInitData(false)
        }

    }, [])
    return (
        <>
            <div style={{ margin: '0 20px' }}>
                介绍：以下是本人写的 npm 插件 地址 https://www.npmjs.com/package/react_wxb_ui 也有Vue版本<br />
                为什么写这个插件？该插件是应用svg编写，可根据传的值不同展示不同的颜色，里面的路径的值都不是固定的，由宽高决定。
            </div>
            {
                initData ? <>
                    <Rheader4 style={{ height: '80px' }} color={['#0C5382', '#2986C4']}></Rheader4>
                    <div style={{ height: '50px' }}></div>
                    <Rheader3 style={{ height: '80px' }}></Rheader3>
                    <div style={{ height: '50px' }}></div>
                    <Rheader2 style={{ height: '80px' }}></Rheader2>
                    <div style={{ height: '50px' }}></div>
                    <Rheader1 style={{ height: '80px' }}></Rheader1>
                    <div style={{ height: '50px' }}></div>
                    <Rline7 style={{ height: '40px' }}></Rline7>
                    <div style={{ height: '50px' }}></div>
                    <Rline6 style={{ height: '140px' }}></Rline6>
                    <div style={{ height: '50px' }}></div>
                    <Rline5 style={{ height: '40px' }}></Rline5>
                    <div style={{ height: '50px' }}></div>
                    <Rline4 style={{ height: '40px' }}></Rline4>
                    <div style={{ height: '50px' }}></div>
                    <Rline3 style={{ height: '40px' }}></Rline3>
                    <div style={{ height: '50px' }}></div>
                    <Rline2 style={{ height: '40px' }}></Rline2>
                    <div style={{ height: '50px' }}></div>
                    <Rline1 style={{ height: '40px' }}></Rline1>
                    <div style={{ height: '50px' }}></div>
                    <Rbox15 style={{ height: '120px' }}>Rbox15</Rbox15>
                    <div style={{ height: '50px' }}></div>
                    <Rbox14 style={{ height: '120px' }}>Rbox14</Rbox14>
                    <div style={{ height: '50px' }}></div>
                    <Rbox13 style={{ height: '120px' }}>Rbox13</Rbox13>
                    <div style={{ height: '50px' }}></div>
                    <Rbox12 style={{ height: '120px' }}>Rbox12</Rbox12>
                    <div style={{ height: '50px' }}></div>
                    <Rbox11 style={{ height: '120px' }}>Rbox11</Rbox11>
                    <div style={{ height: '50px' }}></div>
                    <Rbox10 style={{ height: '120px' }}>Rbox10</Rbox10>
                    <div style={{ height: '50px' }}></div>
                    <Rbox9 style={{ height: '120px' }}>Rbox9</Rbox9>
                    <div style={{ height: '50px' }}></div>
                    <Rbox8 style={{ height: '120px' }}>Rbox8</Rbox8>
                    <div style={{ height: '50px' }}></div>
                    <Rbox7 style={{ height: '120px' }}>Rbox7</Rbox7>
                    <div style={{ height: '50px' }}></div>
                    <Rbox6 style={{ height: '120px' }}>Rbox6</Rbox6>
                    <div style={{ height: '50px' }}></div>
                    <Rbox5 style={{ height: '120px' }}>Rbox5</Rbox5>
                    <div style={{ height: '50px' }}></div>
                    <Rbox4 style={{ height: '120px' }}>Rbox4</Rbox4>
                    <div style={{ height: '50px' }}></div>
                    <Rbox3 style={{ height: '120px' }}>Rbox3</Rbox3>
                    <div style={{ height: '50px' }}></div>
                    <Rbox2 style={{ height: '120px' }}>Rbox2</Rbox2>
                    <div style={{ height: '50px' }}></div>
                    <Rbox1 style={{ height: '120px' }}>Rbox1</Rbox1>
                </> : <></>
            }
        </>
    )

}
export default Pagesvg