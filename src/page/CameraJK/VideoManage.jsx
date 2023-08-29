import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Space, Table, Tag, Modal, Tree, Switch, Select, Badge } from 'antd';
import './css/RoleManage.scss'
const VideoManage = () => {
    let [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('新增设备');

    const columns = [{
        title: '设备编号',
        key: 'index',
        dataIndex: 'index',
    }, {
        title: '设备型号',
        key: 'name',
        dataIndex: 'name',
    }, {
        title: '所处位置',
        key: 'direction',
        dataIndex: 'direction',
    }, {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (_, row) => {
            if (row.status == '离线') {
                return (
                    <Badge status="error" text="离线" />
                )

            } else {
                return (
                    <Badge status="success" text="在线" />
                )
            }
        },
    }, {
        title: '优先级',
        key: 'priority',
        dataIndex: 'priority',
        render: (_, row) => (
            <>
                {(() => {
                    let color = 'green'
                    if (row.priority === '高') {
                        color = 'volcano'
                    }
                    return (
                        <Tag color={color} key={row.priority}>
                            {row.priority}
                        </Tag>
                    )
                })()
                }
            </>
        ),

    }, {
        title: '启用时间',
        key: 'creatTime',
        dataIndex: 'creatTime',
    }, {
        title: '负责人',
        key: 'createName',
        dataIndex: 'createName',

    }, {
        title: '操作',
        key: 'oper',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => roleEdit(record)}>编辑</a>
                <a>删除</a>
            </Space>
        ),
    }
    ]
    useEffect(() => {
        setTableData([{
            key: '1',
            index: 'e-0034',
            name: 'sy19478948',
            direction: '工厂2号-西入口',
            createName: '李小船',
            priority: '高',
            isUse: '启用',
            creatTime: '2023-01-03 09:22:09',
            status: '在线'
        }, {
            key: '2',
            index: 's-0004',
            name: 'sy135325333',
            direction: '工厂1号-南出口',
            createName: '王大力',
            priority: '高',
            isUse: '启用',
            creatTime: '2022-08-42 09:02:53',
            status: '在线'

        }, {
            key: '3',
            index: 'n-0011',
            name: 'sy1945311',
            direction: '工厂1号-东',
            createName: '李红',
            priority: '低',
            isUse: '启用',
            creatTime: '2023-01-03 09:22:09',
            status: '在线'
        }, {
            key: '4',
            index: 'w-0034',
            name: 'sy19478948',
            direction: '工厂2号-北',
            createName: '李小船',
            priority: '中等',
            isUse: '启用',
            creatTime: '2022-04-34 10:43:07',
            status: '在线'
        }, {
            key: '5',
            index: 'e-0034',
            name: 'sy19478948',
            direction: '工厂1号-西',
            createName: '王明',
            priority: '低',
            isUse: '启用',
            creatTime: '2022-05-29 09:22:27',
            status: '在线'
        }

        ])

    }, [])

    const newRole = () => {
        setIsModalOpen(true);
        setModalTitle('新增设备')

    }
    const delteRole = () => {

    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };
    const roleEdit = (e) => {
        setIsModalOpen(true);
        setModalTitle('编辑设备')
    }
    return (
        <>
            <div className="RoleManage">
                <div className="searchLine">
                    <Form
                        name="roleSearch"
                        layout='inline'
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}

                        initialValues={{
                            remember: true,
                            layout: 'inline',
                        }}

                        autoComplete="off"
                    >
                        <Form.Item
                            label="设备编号"
                            name="username"
                        >
                            <Input placeholder="请输入设备编号" />
                        </Form.Item>
                        <Form.Item
                            label="设备型号"
                            name="userNum"
                        >
                            <Input placeholder="请输入设备型号" />
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
                        <Button type="primary" onClick={() => newRole()} ghost style={{ marginRight: '16px' }}>
                            新增
                        </Button>
                        <Button type="primary" onClick={() => delteRole()} danger ghost >
                            批量删除
                        </Button>
                    </div>


                </div>
                <div className="tableCon">
                    <Table rowSelection={{ type: 'checkbox' }} columns={columns} dataSource={tableData} />;
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
                                    label="设备编号"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder="请输入设备编号" />
                                </Form.Item>
                                <Form.Item
                                    label="设备型号"
                                    name="work"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder="请输入设备型号" />
                                </Form.Item>
                                <Form.Item
                                    label="负责人"
                                    name="telNum"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder="请输入负责人" />
                                </Form.Item>
                                <Form.Item
                                    label="所处位置"
                                    name="telNum"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input placeholder="请输入所处位置" />
                                </Form.Item>
                                <Form.Item
                                    label="状态"
                                    name="sex"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Switch checkedChildren="在线" unCheckedChildren="离线" defaultChecked />
                                </Form.Item>
                                <Form.Item
                                    label="优先级"
                                    name="roleSelect"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
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
                            </Form>

                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}
export default VideoManage