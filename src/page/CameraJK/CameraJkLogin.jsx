import React, { useEffect, useState } from 'react';
import './css/jkhome.scss';
import {
    Form, Input, Checkbox, Button,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
const CameraJkLogin = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (<>
        <div className="login">

            <div className="center">
               
                <div className="title">
                <div className="logo">
                    
                    </div>
                    海汇智能监视系统

                </div>
                <div className="cardLogin">
                    <div className="form">
                        <Form
                        size="large"
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入你的用户名!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入你的密码!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                   登录
                                </Button>
                             
                            </Form.Item>
                        </Form>

                    </div>

                </div>
                <div className="cirlce1 describe">

                </div>
                <div className="cirlce2 describe">

                </div>
                <div className="cirlce3 describe">

                </div>

            </div>

        </div>
    </>)
}
export default CameraJkLogin