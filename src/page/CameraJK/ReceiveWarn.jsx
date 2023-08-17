import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Space, Table, Select, Modal, Tree, Switch, Badge } from 'antd';
import './css/RoleManage.scss'
const { TextArea } = Input;
const ReceiveWarn = () => {
    let [tableData, setTableData] = useState([]);
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [modalTitle, setModalTitle] = useState('新增角色');

    const columns = [{
        title: '告警编号',
        key: 'index',
        dataIndex: 'index',
    }, {
        title: '告警类型',
        key: 'type',
        dataIndex: 'type',

    }, {
        title: '告警等级',
        key: 'warnGrade',
        dataIndex: 'warnGrade',

    }, {
        title: '告警触发',
        key: 'trigger',
        dataIndex: 'trigger',
    }, {
        title: '处理意见',
        key: 'opinion',
        dataIndex: 'opinion',
    }, {
        title: '处理状态',
        key: 'dealStatus',
        dataIndex: 'dealStatus',
        render: (_, row) => {
            if (row.dealStatus == '完成') {
                return (<Badge status="success" text="完成" />)
            } else {
                return (<Badge color="#faad14" text="待处理" />)
            }
        }
    }, {
        title: '告警时间',
        key: 'creatTime',
        dataIndex: 'creatTime',

    }, {
        title: '操作',
        key: 'oper',
        render: (_, record) => {
            if (record.dealStatus !== '完成') {
                return (
                    <Space size="middle">
                        <a onClick={() => dealRow(record)}>处理</a>
                    </Space>
                )
            } else {
              return(

                    <Space size="middle">
                        <a onClick={() => resultRow(record)}>结果</a>
                        <text style={{color:'red'}}>删除</text>
                    </Space>
              )

            }

        }
        ,

    }]
    useEffect(() => {
        setTableData([{
            index: '00001',
            type: '巡查',
            warnGrade: '中等',
            trigger: '自动触发',
            opinion: '--',
            dealStatus: '完成',
            creatTime: '2023-07-09 08:22:45'
        }, {
            index: '00002',
            type: '特殊情况',
            warnGrade: '低',
            trigger: '自动触发',
            opinion: '--',
            dealStatus: '完成',
            creatTime: '2023-07-09 09:52:31'
        }, {
            index: '00003',
            type: '巡查',
            warnGrade: '中等',
            trigger: '贺磊',
            opinion: '加强巡视',
            dealStatus: '完成',
            creatTime: '2023-07-09 10:03:21'
        }, {
            index: '00004',
            type: '巡查',
            warnGrade: '低',
            trigger: '自动触发',
            opinion: '--',
            dealStatus: '待处理',
            creatTime: '2023-07-09 11:34:41'
        }, {
            index: '00005',
            type: '陌生人闯入',
            warnGrade: '高',
            trigger: '贺磊',
            opinion: '陌生人行为诡异',
            dealStatus: '待处理',
            creatTime: '2023-07-09 12:34:32'
        }

        ])

    }, [])
  

    const deleteRow = () => {
        console.log('345')

    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const dealRow = () => {
        setIsModalOpen(true);
        setModalTitle('告警处理')

    };
   
    const resultRow = (e) => {
        setIsModalOpen(true);
        setModalTitle('结果')


    }
    return (
        <>
            <div className="RoleManage">
                <div className="searchLine">
                    <Form
                        name="roleSearch"
                        layout='inline'
                        initialValues={{
                            remember: true,
                            layout: 'inline',
                        }}

                        autoComplete="off"
                    >
                        <Form.Item
                            label="告警编号"
                            name="username"
                        >
                            <Input placeholder="请输入角色名" />
                        </Form.Item>

                        <Form.Item
                            label="告警等级"
                            name="username"
                        >
                            <Select
                                defaultValue="低"
                                style={{
                                    width: 220,
                                }}
                                options={[
                                    {
                                        value: '高',
                                        label: '高',
                                    }, {
                                        value: '中等',
                                        label: '中等',
                                    }, {
                                        value: '低',
                                        label: '低',
                                    }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="告警类型"
                            name="username"
                        >
                            <Select
                                style={{
                                    width: 220,
                                }}
                                defaultValue="陌生人闯入"
                                options={[
                                    {
                                        value: '陌生人闯入',
                                        label: '陌生人闯入',
                                    }, {
                                        value: '巡查',
                                        label: '巡查',
                                    }, {
                                        value: '特殊情况',
                                        label: '特殊情况',
                                    }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="Submit">
                                确认
                            </Button>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="default" htmlType="button">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className="operRow">
                        <Button type="primary" onClick={() => deleteRow()} danger ghost >
                            批量删除
                        </Button>
                    </div>


                </div>
                <div className="tableCon">
                    <Table rowSelection={{ type: 'checkbox' }} columns={columns} dataSource={tableData} />
                </div>
                <div className="model">
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
                                    label="处理结果"
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
                                    <TextArea placeholder="请输入处理结果" />
                                </Form.Item>
                                
                                
                            </Form>

                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}
export default ReceiveWarn