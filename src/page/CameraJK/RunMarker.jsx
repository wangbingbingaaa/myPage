import React, { useEffect, useState } from 'react';
import './css/videoList.scss'
import shexiang4 from '../../img/jk/shexiang4.png'
import shexiang2 from '../../img/jk/shexiang2.png'
import beixuan from '../../img/jk/beixuan.png'
import beixuan22 from '../../img/jk/22.png'
import xingzou from '../../img/jk/xingzou1.mp4'
import {
    Descriptions, Modal, Tree, Select

} from 'antd';
const RunMarker = () => {
    const shexiang1data = [{
        lable: '设备编号',
        value: 'e-0034'
    }]
    const desList = [{
id:'1',
        lable: '轮廓编号',
        value: '20230315843'
    }, {
id:'2',

        lable: '遮挡',
        value: '全遮挡'
    }, {
id:'3',

        lable: '平均步速',
        value: '2.1 m/s'
    }, {
id:'4',

        lable: '入口抓取日期',
        value: '2023-03-23'
    }, {
id:'5',

        lable: '具体时间',
        value: '11:12:09'
    }, {
id:'6',

        lable: '风险',
        value: '高'
    }, {
id:'7',

        lable: '人脸识别结果',
        value: '查无此人'
    }, {
id:'8',

        lable: '是否报警',
        value: '已报警'

    }]
    const openVideo =()=>{

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
    const handleValue =(value)=>{
        if(value === '已报警' || value === '高'){
            return(
                <span className='danger'>{value}</span>
            )
        }else {
            return(
                <span>{value}</span>
            )
        }

    }
    return (
        <>

            <div className="runMark">
                <div className="cardShow catchVideo">
                    <div className="headFlag">
                        <div className="outlinePng">
                        <img src={beixuan22} className="outlinePng"></img>
                        </div>
                        <div className="desOutline">
                            {
                                desList.map(ele => {
                                    return (
                                        <div className="row" key={ ele.id }>
                                            <div className="left">
                                                {ele.lable}:
                                            </div>
                                            <div className="right">
                                                {
                                                   handleValue(ele.value)
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="runParam">
                        <div className="list">
                            <div className="carmLeft">
                                <img src={shexiang4} className='bg'></img>

                            </div>
                            <div className="carmRight">
                                <Descriptions bordered column={2} size={'small'}>
                                    <Descriptions.Item label="设备编号">s-0032</Descriptions.Item>
                                    <Descriptions.Item label="设备优先级"> 高 </Descriptions.Item>
                                    <Descriptions.Item label="遮挡">全遮挡</Descriptions.Item>
                                    <Descriptions.Item label="创建时间">2023-03-23 11:32:11</Descriptions.Item>
                                    <Descriptions.Item label="平均步速">1.91 m/s</Descriptions.Item>
                                    <Descriptions.Item label="全遮挡轮廓持续时间">10s</Descriptions.Item>
                                    <Descriptions.Item label="播放视频"><a onClick={showModal}> 播放</a></Descriptions.Item>
                                </Descriptions>

                            </div>

                        </div>
                        <div className="list">
                            <div className="carmLeft">
                                <img src={shexiang2} className='bg'></img>

                            </div>
                            <div className="carmRight">
                                <Descriptions bordered column={2} size={'small'}>
                                    <Descriptions.Item label="设备编号">n-0011</Descriptions.Item>
                                    <Descriptions.Item label="设备优先级">中等 </Descriptions.Item>
                                    <Descriptions.Item label="遮挡">全遮挡</Descriptions.Item>
                                    <Descriptions.Item label="创建时间">2023-03-23 12:02:43</Descriptions.Item>
                                    <Descriptions.Item label="平均步速">2.1 m/s</Descriptions.Item>
                                    <Descriptions.Item label="全遮挡轮廓持续时间">17s</Descriptions.Item>
                                    <Descriptions.Item label="播放视频"><a>播放</a></Descriptions.Item>
                                </Descriptions>

                            </div>

                        </div>

                    </div>


                </div>
                <div className="cardShow catchVideo">
                    <div className="headFlag">
                        <div className="outlinePng">
                            <img src={beixuan} className="outlinePng"></img>
                        </div>
                        <div className="desOutline">
                            {
                                desList.map(ele => {
                                    return (
                                        <div className="row" key={ ele.id }>
                                            <div className="left">
                                                {ele.lable}:
                                            </div>
                                            <div className="right">
                                                {ele.value}
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="runParam">
                        <div className="list">
                            <div className="carmLeft">
                                <img src={shexiang4} className='bg'></img>

                            </div>
                            <div className="carmRight">
                                <Descriptions bordered column={2} size={'small'}>
                                    <Descriptions.Item label="设备编号">s-0032</Descriptions.Item>
                                    <Descriptions.Item label="设备优先级"> 高 </Descriptions.Item>
                                    <Descriptions.Item label="遮挡">全遮挡</Descriptions.Item>
                                    <Descriptions.Item label="创建时间">2023-05-23 11:42:01</Descriptions.Item>
                                    <Descriptions.Item label="平均步速">1.51 m/s</Descriptions.Item>
                                    <Descriptions.Item label="全遮挡轮廓持续时间">4s</Descriptions.Item>
                                </Descriptions>

                            </div>

                        </div>
                        <div className="list">
                            <div className="carmLeft">
                                <img src={shexiang2} className='bg'></img>

                            </div>
                            <div className="carmRight">
                                <Descriptions bordered column={2} size={'small'}>
                                    <Descriptions.Item label="设备编号">s-0032</Descriptions.Item>
                                    <Descriptions.Item label="设备优先级">中等 </Descriptions.Item>
                                    <Descriptions.Item label="遮挡">全遮挡</Descriptions.Item>
                                    <Descriptions.Item label="创建时间">2023-05-23 12:02:43</Descriptions.Item>
                                    <Descriptions.Item label="平均步速">2.1 m/s</Descriptions.Item>
                                    <Descriptions.Item label="全遮挡轮廓持续时间">17s</Descriptions.Item>
                                </Descriptions>

                            </div>

                        </div>

                    </div>


                </div>
                <Modal title="播放视频" width='1000px' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className="play">
                    <video id="myPlayer" width="880" height="400px" controls>
                            <source src={xingzou} type="video/mp4" />
                        </video>
                    </div>
                  
                </Modal>


            </div>
        </>
    )
}
export default RunMarker