import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Space, Table, Tag, Modal,Tree,Switch,Badge} from 'antd';
import './css/RoleManage.scss'
const RoleManage = () => {
    let [tableData, setTableData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('新增角色');

    const columns = [{
        title: '角色编号',
        key: 'roleIndex',
        dataIndex: 'roleIndex',
    }, {
        title: '角色名称',
        key: 'roleName',
        dataIndex: 'roleName',

    }, {
        title: '是否启用',
        key: 'isUse',
        dataIndex: 'isUse',
        render: () => <Badge status="success" text="启用" />,

    }, {
        title: '创建时间',
        key: 'creatTime',
        dataIndex: 'creatTime',
    }, {
        title: '授权人',
        key: 'boss',
        dataIndex: 'boss',

    }, {
        title: '操作',
        key: 'oper',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={()=>roleEdit(record)}>编辑</a>
                <a>删除</a>
            </Space>
        ),

    }]
    useEffect(() => {
        setTableData([{
            roleIndex: '001',
            roleName: '超级管理员',
            roleFlag: 'admin',
            isUse: '启用',
            creatTime: '2023-03-23 11:02:11',
            boss: '--',
            key:'1',

        }, {
            roleIndex: '002',
            roleName: '管理员',
            roleFlag: 'admin',
            isUse: '启用',
            creatTime: '2023-03-23 11:02:11',
            boss: '贺磊',
            key:'2',
        }, {
            roleIndex: '003',
            roleName: '警员',
            roleFlag: 'admin',
            isUse: '启用',
            creatTime: '2023-03-23 11:02:11',
            boss: '贺磊',
            key:'3',
        }, {
            roleIndex: '004',
            roleName: '普通员工',
            roleFlag: 'admin',
            isUse: '启用',
            creatTime: '2023-03-23 11:02:11',
            boss: '孙铭武',
            key:'4',

        }

        ])

    }, [])
    const treeData = [
        {
          title: '主页',
          key: '1',
        },{
            title: '视频存储记录',
            key: '2',
        },{
            title: '危险人物行走标记',
            key: '3',
        },{
            title: '实时协查',
            key: '4',
        },{
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
        },{
            title: '系统设置',
            key: '6',
          children: [
            {
              title: '用户管理',
              key: '6-1',
            },
            {
                title: '角色管理',
                key: '6-2',
            },
          ],
        },
      ];
    const newRole = () => {
        console.log('123');
        setIsModalOpen(true);
        setModalTitle('新增角色')

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
    const roleEdit =(e)=>{
        console.log(e)
        setIsModalOpen(true);
        setModalTitle('编辑角色')

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
                            label="角色名称"
                            name="username"
                        >
                            <Input placeholder="请输入角色名" />
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
                    <Table  rowSelection={{ type: 'checkbox' }} columns={columns} dataSource={tableData} />
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
                                    label="角色名称"
                                    name="username"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                    <Input placeholder="请输入角色名" />
                                </Form.Item>
                                <Form.Item
                                    label="权限管理"
                                    name="power"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                   <Tree
                                    checkable
                                    defaultExpandedKeys={['5-1', '5-2','6-1','6-2']}
                                    defaultCheckedKeys={['5-1', '5-2','6-1','6-2']}
                                    onSelect={onSelect}
                                    onCheck={onCheck}
                                    treeData={treeData}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="是否开启"
                                    name="isOpen"
                                    rules={[
                                        {
                                          required: true,
                                        },
                                      ]}
                                >
                                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
                                </Form.Item>
                            </Form>

                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}
export default RoleManage