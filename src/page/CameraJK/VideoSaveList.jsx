import React, { useEffect, useState } from 'react';
import {
    DatePicker, Input, Form, Button, Space, Table, Descriptions, Modal, Tree, Select,
    Badge, Pagination, Drawer
} from 'antd';
import './css/videoList.scss';
import marker1 from '../../img/jk/marker1.png'
import marker2 from '../../img/jk/marker2.png'
import marker3 from '../../img/jk/marker3.png'
import marker4 from '../../img/jk/marker4.png'
import marker5 from '../../img/jk/marker5.png'
import marker6 from '../../img/jk/marker6.png'
import marker8 from '../../img/jk/marker8.png'
import marker7 from '../../img/jk/marker7.png'
import videoMP4 from '../../img/jk/lalal.mp4'

const { RangePicker } = DatePicker;
const VideoSaveList = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const borderedItems = [
        {
          key: '1',
          label: '设备号',
          children: 's-032',
        },{
            key: '2',
            label: '轮廓编号',
            children: 's-032',
        },{
            key: '3',
            label: '轮廓编号',
            children: 's-032',
        },{
            key: '4',
            label: '轮廓编号',
            children: 's-032',
        },{
            key: '5',
            label: '轮廓编号',
            children: 's-032',

        }

    ]

    const tableData = [{
        CameraNum: 'e-0010',
        status: '无遮挡',
        createName: '张肖',
        priorityCamera: '高',
        peopleNum: '2023030912112334',
        creatTime: '2023-03-23 11:02:11',
        MarkersPng: marker6,
        key: '1'

    }, {
        CameraNum: 's-0090',
        status: '全遮挡',
        MarkersPng: marker1,
        key: '2',
        priorityCamera: '高',
        createName: '张肖',
        peopleNum: '2022030914162331',
        creatTime: '2023-03-23 11:02:11',

    }, {
        MarkersPng: marker2,
        status: '半遮挡',
        key: '3',
        CameraNum: 'w-0022',
        peopleNum: '2022060114122632',
        priorityCamera: '低',

        createName: '孙铭武',
        creatTime: '2023-03-23 11:02:11',
    }, {
        CameraNum: 's-0032',
        MarkersPng: marker4,
        status: '无遮挡',
        priorityCamera: '高',
        peopleNum: '2023065324122424',
        key: '4',

        createName: '王国庆',
        creatTime: '2023-03-23 11:02:11',
    }, {
        CameraNum: 'n-0002',
        peopleNum: '2023014324346224',
        MarkersPng: marker8,
        status: '半遮挡',
        priorityCamera: '中',
        createName: '王国庆',
        creatTime: '2023-03-23 11:02:11',
        key: '5',
    }, {
        CameraNum: 'e-0025',
        status: '无遮挡',
        createName: '张肖',
        priorityCamera: '高',
        peopleNum: '2023035433289114',
        creatTime: '2023-03-23 11:02:11',
        MarkersPng: marker3,
        key: '6',

    }, {
        CameraNum: 's-0490',
        status: '无遮挡',
        MarkersPng: marker7,
        key: '7',
        priorityCamera: '高',
        createName: '孙铭武',
        peopleNum: '2022034284362331',
        creatTime: '2023-03-23 11:02:11',

    }, {
        MarkersPng: marker2,
        status: '半遮挡',
        CameraNum: 'w-0022',
        peopleNum: '20220601114122632',
        priorityCamera: '低',
        key: '8',
        createName: '孙铭武',
        creatTime: '2023-03-23 11:02:11',
    }, {
        CameraNum: 's-0004',
        MarkersPng: marker4,
        status: '无遮挡',
        priorityCamera: '低',
        peopleNum: '202306015324122424',
        key: '9',
        createName: '王国庆',
        creatTime: '2023-03-23 11:02:11',
    }]

    const columns = [{
        title: '编号',
        key: 'index',
        dataIndex: 'index',
        width: '70px',
        render: (text, record, index) => index
    }, {
        title: '设备编号',
        key: 'CameraNum',
        dataIndex: 'CameraNum',

    }, {
        title: '标记轮廓',
        key: 'MarkersPng',
        dataIndex: 'MarkersPng',
        render: (_, { MarkersPng }) => {
            return (
                <img className='tableMarkers' src={MarkersPng}></img>
            )

        }
    }, {
        title: '轮廓编号',
        key: 'peopleNum',
        dataIndex: 'peopleNum',
        width: '200px'
    }, {
        title: '遮挡',
        key: 'status',
        dataIndex: 'status',
        render: (_, row) => {
            if (row.status == '全遮挡') {
                return (
                    <Badge status="error" text="全遮挡" />
                )

            } else if (row.status == '半遮挡') {
                return (
                    <Badge color="#faad14" text="半遮挡" />
                )
            } else {
                return (
                    <Badge status="success" text="无遮挡" />
                )
            }
        },

    }, {
        title: '创建时间',
        key: 'creatTime',
        dataIndex: 'creatTime',

    }, {
        title: '设备优先级',
        key: 'priorityCamera',
        dataIndex: 'priorityCamera',
    }, {
        title: '执勤人',
        key: 'createName',
        dataIndex: 'createName',

    }, {
        title: '操作',
        key: 'oper',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={() => detailRow(record)}>详情</a>
                <a>删除</a>
            </Space>
        ),

    }]
    const containerStyle = {
        position: 'relative',
        overflow: 'hidden',
    };
    const detailRow = (row) => {
        console.log(row)
        showDrawer()

    }
    

    return (
        <>
            <div className="videoList" style={containerStyle}>
                <div className="searchTopRow">
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
                            label="设备编号"
                            name="cameraNum"
                        >
                            <Input placeholder="请输入设备编号" />
                        </Form.Item>
                        <Form.Item
                            label="时间范围"
                            name="timeRange"
                        >
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                        <Form.Item
                            label="遮挡"
                            name="mask"
                        >
                            <Select
                                style={{
                                    width: 120,
                                }}
                                options={[
                                    {
                                        value: '无遮挡',
                                        label: '无遮挡',
                                    },
                                    {
                                        value: '半遮挡',
                                        label: '半遮挡',
                                    },
                                    {
                                        value: '全遮挡',
                                        label: '全遮挡',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="优先级"
                            name="priority"
                        >
                            <Select
                                style={{
                                    width: 120,
                                }}
                                options={[
                                    {
                                        value: '高',
                                        label: '高',
                                    },
                                    {
                                        value: '中',
                                        label: '中',
                                    },
                                    {
                                        value: '低',
                                        label: '低',
                                    },
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
                        <Button type="primary" onClick={() => delteRole()} danger ghost >
                            批量删除
                        </Button>
                    </div>

                </div>
                <div className="videoTable" >
                    <Table rowSelection={{ type: 'checkbox' }} scroll={{ y: 560, }} columns={columns} dataSource={tableData}
                        pagination={{ total: 200 }} />

                </div>
                <Drawer
                    title="编号3详情"
                    placement="right"
                    closable={false}
                    // size={'large'}
                    width={'980px'}
                    onClose={onClose}
                    open={open}
                    getContainer={false}
                >
                    <div className="detailCon">
                        <video id="myPlayer" width="880" height="400px" controls>
                            <source src={videoMP4} type="video/mp4" />
                        </video>
                        <div className="detailDes">
                        <Descriptions bordered>
                            <Descriptions.Item label="设备编号">s-0032</Descriptions.Item>
                            <Descriptions.Item label="设备优先级"> 高 </Descriptions.Item>
                            <Descriptions.Item label="设备管理"> <a>跳转</a> </Descriptions.Item>
                            <Descriptions.Item label="轮廓编号">2023065324122424</Descriptions.Item>
                            <Descriptions.Item label="遮挡">无遮挡</Descriptions.Item>
                            <Descriptions.Item label="执勤人">王国庆</Descriptions.Item>
                            <Descriptions.Item label="创建时间">2023-03-23 11:02:11</Descriptions.Item>
                            <Descriptions.Item label="平均步速">1.51 m/s</Descriptions.Item>
                            <Descriptions.Item label="全遮挡轮廓持续时间">0s</Descriptions.Item>
                            <Descriptions.Item label="行走通道剩余数量">3</Descriptions.Item>
                            <Descriptions.Item label="是否危险">无</Descriptions.Item>
                            <Descriptions.Item label="人脸识别结果">工作人员</Descriptions.Item>
                            <Descriptions.Item label="协查"><a>跳转</a></Descriptions.Item>
                        </Descriptions>

                        </div>
                    </div>
                </Drawer>

            </div>

        </>
    )
}
export default VideoSaveList