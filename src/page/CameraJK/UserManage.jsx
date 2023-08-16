import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Space, Table, Tag, Modal, Tree, Switch ,Select,Badge} from 'antd';
import './css/RoleManage.scss'
const UserManage = () => {
    let [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('新增用户');

    const columns = [{
        title: '用户编号',
        key: 'roleIndex',
        dataIndex: 'roleIndex',
    }, {
        title: '用户名称',
        key: 'name',
        dataIndex: 'name',
    }, {
        title: '联系方式',
        key: 'telNum',
        dataIndex: 'telNum',
    }, {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (_, row) => {
            if(row.status == '离线'){
                return(
                    <Badge status="error" text="离线" />
                )

            }else {
                return(
                <Badge status="success" text="在线" />
                )
            }
       },
    }, {
        title: '角色',
        key: 'role',
        dataIndex: 'role',
        render: (_, row) => (
            <>
                {(() => {
                    let color = 'green'
                    if (row.role === '超级管理员') {
                        color = 'volcano'
                    }
                    return (
                        <Tag color={color} key={row.role}>
                            {row.role}
                        </Tag>
                    )
                })()
                }
            </>
        ),

    }, {
        title: '创建时间',
        key: 'creatTime',
        dataIndex: 'creatTime',
    }, {
        title: '创建人',
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

    }]
    useEffect(() => {
        setTableData([{
            roleIndex: '001',
            role: '超级管理员',
            name: '贺磊',
            telNum: '15678739238',
            createName: '--',
            roleFlag: 'admin',
            isUse: '启用',
            creatTime: '2023-03-23 11:02:11',
            boss: '--',
            status:'在线'

        }, {
            roleIndex: '002',
            role: '超级管理员',
            name: '孙铭武',
            telNum: '15678739238',
            createName: '贺磊',
            roleFlag: 'admin',
            isUse: '启用',
            creatTime: '2023-03-23 11:02:11',
            boss: '--',
            status:'离线'

        }, {
            roleIndex: '003',
            role: '管理员',
            name: '张庆',
            telNum: '13788943220',
            createName: '贺磊',
            roleFlag: 'admin',
            isUse: '启用',
            creatTime: '2023-03-23 11:02:11',
            status:'在线'
        }, {
            roleIndex: '004',
            role: '警员',
            name: '王国庆',
            telNum: '13323876529',
            createName: '孙铭武',
            roleFlag: 'admin',
            isUse: '启用',
            creatTime: '2023-03-23 11:02:11',
            boss: '贺磊',
            status:'在线'
        }, {
            roleIndex: '005',
            role: '普通员工',
            name: '张肖',
            telNum: '15877392832',
            createName: '贺磊',
            roleFlag: 'admin',
            isUse: '启用',
            creatTime: '2023-03-23 11:02:11',
            status:'在线'
        }

        ])

    }, [])
    const treeData = [
        {
            title: '主页',
            key: '1',
        }, {
            title: '视频存储记录',
            key: '2',
        }, {
            title: '危险人物行走标记',
            key: '3',
        }, {
            title: '实时协查',
            key: '4',
        }, {
            title: '告警',
            key: '5',
            children: [
                {
                    title: '告警接收',
                    key: '5-1',
                },
                {
                    title: '告警发送',
                    key: '5-2',
                },
            ],
        }, {
            title: '系统设置',
            key: '6',
            children: [
                {
                    title: '用户管理',
                    key: '6-1',
                },
                {
                    title: '用户管理',
                    key: '6-2',
                },
            ],
        },
    ];
    const newRole = () => {
        console.log('123');
        setIsModalOpen(true);
        setModalTitle('新增用户')

    }
    const delteRole = () => {
        console.log('345')

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
        setModalTitle('编辑用户')
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
                            label="用户名称"
                            name="username"
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            label="手机号"
                            name="userNum"
                        >
                            <Input placeholder="请输入手机号" />
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
                    <Modal title={modalTitle} open={isModalOpen}  okText="确认"
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
                                    label="用户名称"
                                    name="username"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <Input placeholder="请输入用户名" />
                                </Form.Item>
                                <Form.Item
                                    label="职务"
                                    name="work"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <Input placeholder="请输入职务" />
                                </Form.Item>
                                <Form.Item
                                    label="联系方式"
                                    name="telNum"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <Input placeholder="请输入手机号" />
                                </Form.Item>
                                <Form.Item
                                    label="性别"
                                    name="sex"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <Switch checkedChildren="女性" unCheckedChildren="男性" defaultChecked />
                                </Form.Item>
                                <Form.Item
                                    label="角色"
                                    name="roleSelect"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <Select
                                        defaultValue="普通员工"
                                        style={{
                                            width: 220,
                                        }}
                                        options={[
                                            {
                                                value: '超级管理员',
                                                label: '超级管理员',
                                            },{
                                                value: '管理员',
                                                label: '管理员',
                                            },{
                                                value: '警员',
                                                label: '警员',
                                            },{
                                                value: '普通员工',
                                                label: '普通员工',
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
export default UserManage