import React, { useEffect, useState } from 'react';

import { Input, Form, Button, Space, Table, Tag, Modal, Switch ,Select,Badge} from 'antd';
const { TextArea } = Input;
import touxiang from '../../img/jk/22.png'
const AssistVideo = () => {
    let [showTrack, setShowTrack] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const lockTrack = () => {
        setShowTrack(!showTrack)
    }

    const lockWarn = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const tupian = {
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '90px',
            width: '90px',
           
    }
    return (
        <>
            <div className="viedoLook">
                <div className="cardShow mianRow">
                    <div className="leftVideo">
                        <div className="logo">
                            正门
                        </div>
                        <div className="operBtn">
                            <div className="text" onClick={() => lockTrack()}>
                                锁定追踪

                            </div>
                            <div className="text" onClick={() => lockWarn()}>
                                发送告警
                            </div>
                            <div className="text" style={{color:'red'}}>
                                紧急告警

                            </div>
                        </div>
                    </div>
                    <div className="rightVideo">
                        <div className="logo">
                            侧门
                        </div>
                        <div className="operBtn">
                            <div className="text">
                                锁定追踪

                            </div>
                            <div className="text">
                                发送告警

                            </div>
                            <div className="text"  style={{color:'red'}}>
                                紧急告警

                            </div>
                        </div>
                    </div>
                </div>
                {
                    showTrack ? <div className="cardShow fzrow">
                        <div className="item inner1">
                        </div>
                        <div className="item inner2">
                        </div>
                        <div className="item inner3">
                        </div>

                    </div>
                        :
                        <></>
                }

                <Modal title="发送告警" open={isModalOpen} okText="确认"
                    cancelText="取消"
                    onOk={handleOk} onCancel={handleCancel}>
                    <div className="modalCon">
                        <div style={{textAlign:'center'}}>
                            <img style={tupian} src={touxiang}></img>

                        </div>
                    <Form
                                name="editForm"
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 500,
                                }}
                                initialValues={{
                                    remember: true,
                                    layout: 'inline',
                                }}

                                autoComplete="off"
                            >
                                <Form.Item
                                    label="轮廓编号"
                                    name="username"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <Input placeholder="请输入轮廓编号" />
                                </Form.Item>
                                
                                <Form.Item
                                    label="通知范围"
                                    name="telNum"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                   <Select
                                        defaultValue="所有人"
                                       
                                        options={[
                                            {
                                                value: '所有人',
                                                label: '所有人',
                                            },{
                                                value: '管理员',
                                                label: '管理员',
                                            },{
                                                value: '门卫',
                                                label: '门卫',
                                            }
                                        ]}
                                        />
                                </Form.Item>
                               
                               
                                <Form.Item
                                    label="告警等级"
                                    name="roleSelect"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <Select
                                        defaultValue="低"
                                       
                                        options={[
                                            {
                                                value: '高',
                                                label: '高',
                                            },{
                                                value: '中等',
                                                label: '中等',
                                            },{
                                                value: '低',
                                                label: '低',
                                            }
                                        ]}
                                        />
                                        
                                </Form.Item>
                                <Form.Item
                                    label="告警类型"
                                    name="gaojingtype"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <Select
                                        defaultValue="陌生人闯入"
                                        options={[
                                            {
                                                value: '陌生人闯入',
                                                label: '陌生人闯入',
                                            },{
                                                value: '巡查',
                                                label: '巡查',
                                            },{
                                                value: '特殊情况',
                                                label: '特殊情况',
                                            }
                                        ]}
                                        />
                                        
                                </Form.Item>
                                <Form.Item
                                    label="处理意见"
                                    name="telNum"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <TextArea placeholder="请输入处理意见"  autoSize={{
          minRows: 2,
          maxRows: 6,
        }} />
                                </Form.Item>
                            </Form>
                        
                    </div>
                </Modal>
            </div>
        </>
    )
}
export default AssistVideo