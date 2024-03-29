import React, { useEffect, useState } from 'react';
import {Route,Routes,useNavigate} from 'react-router-dom'
import './main.scss'
import { Button, Modal } from 'antd';
import Pagesvg from './footShow/pagesvg'
import PageCss from './footShow/pageCss'
import Paged3 from './footShow/paged3'
import Pagecanvas from './footShow/pagecanvas'
import Pageechart from './footShow/paged3Bar'
import BoxBtn4 from '../component/boxBtn4';

const FootCon = (props) => {
    const navigate = useNavigate()
    const [btns, setBtns] = useState([{
        name: 'SVG'
    }, {
        name: 'D3'
    }, {
        name: 'GASP'
    }, {
        name: 'Canvas'
    }, {
        name: 'Echart'
    }, {
        name: 'UI'
    }, {
        name: '3D'
   
    }])
    const [activeNav, setActiveNav] = useState('')
    const [visibleNavDetail, setVisibleNavDetail] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

    }, [])
    
    const btnOper = (e) => {
        console.log(e)
        if (e === 'Echart'){
            window.open("https://wangbingbingaaa.github.io/vue3_myPage");
        }else if (e === '3D'){
            window.open("https://wangbingbingaaa.github.io/vue3_myPage/#/3d");
        }else if (e === 'UI'){
            window.open("https://wangbingbingaaa.github.io/vue3_myPage/#/ui");
        }else if (e === 'GASP'){
            //路由跳转
            navigate('/GASP')
        }else {
            setActiveNav(e)
            setIsModalOpen(true);
        }
     
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