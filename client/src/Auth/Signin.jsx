import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Alert, Spin } from 'antd';
import useSignin from '../hooks/useSignin';
import './Signin.css';

const Signin = () => {
    const { loading, error, signinUser } = useSignin();

    const handleLogin = async (values) => {
        await signinUser(values);
    };

    return (
        <div className="signin-container">
            <div className="signin-content">
                <div className="signin-form">
                    <h1 className="signin-title">Sign In</h1>
                    <p className="signin-slogan">Unlock your world.</p>
                    <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your Email Id!' },
                                { type: 'email', message: 'Please provide a valid Email Id!' }
                            ]}
                        >
                            <Input size="large" placeholder="Enter your Email Id" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password size="large" placeholder="Enter your Password" />
                        </Form.Item>

                        {error && <div className="error-message">{error}</div>}

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="signin-button"
                                disabled={loading}
                            >
                                {loading ? <Spin /> : 'Sign In'}
                            </Button>
                        </Form.Item>

                        <div className="signup-link">
                            Don't have an account? <Link to="/signup">Create one</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Signin;
