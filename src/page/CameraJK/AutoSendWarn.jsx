
import React, { useEffect, useState } from 'react';
import { Input, Space, Button, Tabs, Table, Select, Modal, Tree, Rate, Form } from 'antd';
import './css/RoleManage.scss'
const AutoSendWarn = () => {
    let [tabValue, setTabValue] = useState('1');
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [modalTitle, setModalTitle] = useState('新增类型');

    let [isModalOpenGrade, setIsModalOpenGrade] = useState(false);
    let [modalTitleGrade, setModalTitleGrade] = useState('新增等级');
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const openAdd =()=>{
        setIsModalOpen(true);

    }
    const openAddGrade =()=>{
        setIsModalOpenGrade(true)
    }

    const tabList = [{
        label: '告警类型',
        key: '1',
    }, {
        label: '告警等级',
        key: '2',

    }];

    const columns = [{
        title: '编号',
        key: 'index',
        dataIndex: 'index',
    }, {
        title: '告警类型名称',
        key: 'type',
        dataIndex: 'type',
    }, {
        title: '操作',
        key: 'oper',
        render: (_, record) => {
              return(
                    <Space size="middle">
                        <span style={{color:'red'}}>删除</span>
                    </Space>
              )
        }
    }]
    const columnsGrade =[{
        title: '编号',
        key: 'index',
        dataIndex: 'index',
    }, {
        title: '告警等级',
        key: 'grade',
        dataIndex: 'grade',
    }, {
        title: '具体表现',
        key: 'real',
        render: (_, record) => {
              return(
                <Rate defaultValue={record.real} />
              )
        }
    }, {
        title: '操作',
        key: 'oper',
        render: (_, record) => {
              return(
                    <Space size="middle">
                        <span style={{color:'red'}}>删除</span>
                    </Space>
              )
        }
    }]

    const tableData =[{
        index:'1',
        type:'排查',
        key:'1',


    },{
        index:'2',
        type:'警觉',
        key:'2',
    },{
        index:'3',
        type:'陌生人闯入',
        key:'3',

    },{
        index:'4',
        type:'巡查',
        key:'4',


    }]
    const tableDataGrade =[{
        index:'1',
        grade:'低',
        real:'1'
    },{
        index:'2',
        grade:'中',
        real:'3'
    },{
        index:'3',
        grade:'高',
        real:'5'
    },{
        index:'4',
        grade:'一般',
        real:'2'

    }]

    const onChange = (key) => {

        setTabValue(key)
    };
    const getTabConDetail =()=>{
        if(tabValue == '1'){
            return(
                <div className="warnType">
                       <Button type="primary" className='operAdd' onClick={openAdd}>新增</Button>
                     <Table rowSelection={{ type: 'checkbox' }} columns={columns} dataSource={tableData} />

                </div>
            )

        } else if(tabValue == '2'){
            return(
            <div className="warnGrade">
                 <Button type="primary" className='operAdd' onClick={openAddGrade}>新增</Button>
                    <Table rowSelection={{ type: 'checkbox' }} columns={columnsGrade} dataSource={tableDataGrade} />

            </div>
            )



        } else{
            return(
                <div className="warnFn">
                    3
    
                </div>
                )

        }

    }
    return (
        <>
            <div className="autoSendWarn">
                <div className="tabRow">
                    <Tabs
                        defaultActiveKey="1"
                        size={'large'}
                        items={tabList}
                        onChange={onChange}
                    />
                </div>
                <div className="tabCon">
                    {
                       getTabConDetail()
                    }

                </div>
                <Modal title={modalTitle} open={isModalOpen} okText="确认"
                        cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                        <div className="madalCon">
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
                                    label="告警类型"
                                    name="username"
                                    showCount
                                    maxLength={200}
                                    autoSize={{
                                        minRows: 6,
                                        maxRows: 16,
                                      }}
                                   
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                
                                
                            </Form>

                        </div>
                    </Modal>

                    <Modal title={modalTitleGrade} open={isModalOpenGrade} okText="确认"
                        cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
                        <div className="madalCon">
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
                                    label="告警等级名称"
                                    name="username"
                                    showCount
                                    maxLength={200}
                                    autoSize={{
                                        minRows: 6,
                                        maxRows: 16,
                                      }}
                                   
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="具体表现"
                                    name="username"
                                    showCount
                                    maxLength={200}
                                    autoSize={{
                                        minRows: 6,
                                        maxRows: 16,
                                      }}
                                   
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                     <Rate defaultValue={3} />
                                </Form.Item>
                                
                                
                            </Form>

                        </div>
                    </Modal>
            </div>

        </>
    )
}
export default AutoSendWarn