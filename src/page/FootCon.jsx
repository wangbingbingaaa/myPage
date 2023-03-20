import React, { useEffect, useState } from 'react';
import './main.scss'
import { Button, Modal } from 'antd';

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

    useEffect(() => {
        console.log(btns)

    }, [])

    const handleFootNav = (val) => {
        console.log(val)

    }
    const btnOper = () => {
        console.log('000')
        setIsModalOpen(true);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
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
                            btns.map((item,index) => {
                                return (

                                    <div key={index}>
                                        <i className="item.icon"></i>
                                        <BoxBtn4 text={`${item.name}`} btnOper={btnOper}></BoxBtn4>
                                    </div>
                                )

                            })

                        }

                    </div>
                    <div className="footDialog">
                        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    </div>
                </div>
            </div>


        </>
    )

}

export default FootCon