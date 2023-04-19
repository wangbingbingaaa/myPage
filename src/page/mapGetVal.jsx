import React, { useState } from 'react';
import { useEffect, useRef } from 'react'
import './map.scss'
import { Button, Modal, Form, Input, Radio, Select, Tooltip,Table,message } from 'antd';
import {
    EnvironmentOutlined,
} from '@ant-design/icons';
const MapGetVal = (props) => {
    const [form] = Form.useForm();
    const formRef = React.useRef(null);
    const [messageApi, contextHolder] = message.useMessage();
   
    const localMap = () => {
        props.localMap(form.getFieldValue())

    }
    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                formRef.current?.setFieldsValue({ note: 'Hi, man!' });
                break;
            case 'female':
                formRef.current?.setFieldsValue({ note: 'Hi, lady!' });
                break;
            case 'other':
                formRef.current?.setFieldsValue({ note: 'Hi there!' });
                break;
            default:
                break;
        }
    };
    const formItemLayout =
    {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        },
    }

    const buttonItemLayout =
    {
        wrapperCol: {
            span: 14,
            offset: 4,
        },
    }
    const columns = [
        {
          title: '经度',
          dataIndex: 'lon',
          key: 'lon',
        },
        {
          title: '维度',
          dataIndex: 'lat',
          key: 'lat',
        },
      ];
      const scroll = {y:220};
      

    return (<>
        <Form
            {...formItemLayout}
            layout='horizontal'
            form={form}
            ref={formRef}
          
            initialValues={{ type: 'point',name:'hello' }}
            style={{
                maxWidth: 800,
            }}
        >
            <Form.Item label="名称" name="name"  rules={[{ required: true, message: '请填写名称!' }]}>
                <Input placeholder="请填写名称" />
            </Form.Item>
            <Form.Item label="类别" name="type"  rules={[{ required: true, message: '请选择类别!' }]}>
                <Radio.Group>
                    <Radio value="point">点</Radio>
                    <Radio value="line">线</Radio>
                    <Radio value="box">多边形</Radio>
                    <Radio value="circle">圆</Radio>
                    <Radio value="react">矩形</Radio>
                    <Tooltip placement="top" title="点击，在地图上取数据">
                        <span className='localMap' onClick={() => localMap()}><EnvironmentOutlined /></span>

                    </Tooltip>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="性别" name="option" ules={[{ required: true, message: '请选择性别!' }]}>
                <Select placeholder="请填选择你的性别" allowClear onChange={onGenderChange}>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                </Select>
            </Form.Item>
           
        </Form>
        <Table dataSource={props.dataSource} columns={columns} 
        size="small"
        style={{margin:'0 40px'}} scroll={scroll}/>;

    </>)


}
export default MapGetVal