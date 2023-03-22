import React, { useEffect, useState } from 'react';
import './main.scss'
import { Button, Modal } from 'antd';
import Pagesvg from './footShow/pagesvg'
import PageCss from './footShow/pageCss'
import Paged3 from './footShow/paged3'
import Pagecanvas from './footShow/pagecanvas'
import Pageechart from './footShow/paged3Bar'

import BoxBtn4 from '../component/boxBtn4';
const FootCon = () => {
    const [btns, setBtns] = useState([{
        name: 'SVG'
    }, {
        name: 'D3'
    }, {
        name: 'Echart'
    }, {
        name: 'Canvas'
    }, {
        name: 'Css'
    }, {
        name: '3D'
    }])
    const [activeNav, setActiveNav] = useState('')
    const [visibleNavDetail, setVisibleNavDetail] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {


    }, [])
    const btnOper = (e) => {
        setActiveNav(e)
        setIsModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="foot-container">
                <div className="footer-div">
                    <div className="nav-line">
                        {
                            btns.map((item, index) => {
                                return (

                                    <div key={index}>
                                        <BoxBtn4 text={`${item.name}`} btnOper={btnOper}></BoxBtn4>
                                    </div>
                                )

                            })

                        }

                    </div>
                    <div className="footDialog">
                        <Modal width="900px" title={activeNav} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            {(() => {
                                switch (activeNav) {
                                    case ('SVG'):
                                        return (<Pagesvg></Pagesvg>)
                                        break
                                    case ('Css'):
                                        return (<PageCss></PageCss>)
                                        break
                                    case ('D3'):
                                        return (<Paged3></Paged3>)
                                        break
                                    case ('Canvas'):
                                        return (<Pagecanvas></Pagecanvas>)
                                        break
                                    case ('Echart'):
                                        return (<Pageechart></Pageechart>)
                                        break
                                    default:
                                        return (<></>)
                                }

                            })()

                            }

                        </Modal>
                    </div>
                </div>
            </div>


        </>
    )

}

export default FootCon