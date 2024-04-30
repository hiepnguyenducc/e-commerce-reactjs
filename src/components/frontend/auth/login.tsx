
import { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { AutoComplete, Button, Input, message, Space } from 'antd';
import { Simulate } from "react-dom/test-utils";
import submit = Simulate.submit;
import React from "react";
import { DefaultOptionType } from "antd/es/select";
function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const [options, setOptions] = React.useState<DefaultOptionType[]>([]);
    const handleSearch = (value: string) => {
        setOptions(() => {
            if (!value || value.includes('@')) {
                return [];
            }
            return ['gmail.com', 'mail.tdc.edu.vn', 'qq.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com', 'zoho.com', 'protonmail.com', 'mail.com', 'gmx.com', 'yandex.com']
                .map<DefaultOptionType>((domain) => ({
                    label: `${value}@${domain}`,
                    value: `${value}@${domain}`,
                }));
        });
    };
    const history = useNavigate();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: {},
    })
    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value })
    }

    const handleEmailSelect = (value) => {
        setLogin({ ...loginInput, email: value });
    };
    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };
        messageApi.open({
            type: 'success',
            content: 'Logged In Successfully',
        });
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);

                    if (res.data.role === 'admin') {
                        history('/admin/dashboard')
                    } else {
                        history('/');
                    }
                }
                else if (res.data.staus === 401) {
                    swal("Warning", res.data.message, "warning");
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors })
                }
            });
        });

    }
    return (

        <>
            <Navbar></Navbar>
            <div className="contaner py-5">
                <div className="row justify-content-center">

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login</h4>
                                <div className="card-body">
                                    <form action="" onSubmit={loginSubmit}>
                                        <div className="form-group mb-3">
                                            <AutoComplete
                                                style={{ width: 942 }}
                                                onSearch={handleSearch}
                                                onSelect={handleEmailSelect}
                                                placeholder="Enter Email"
                                                size="large"
                                                options={options}
                                                className="from-control"
                                                allowClear
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="password">Password</label>
                                            <Input.Password size="large" type="password" onChange={handleInput} value={loginInput.password} name="password" placeholder="Enter Password" />
                                        </div>

                                        <div className="form-group mb-3">
                                            <button type="submit" className="btn btn-primary">Login</button>
                                            {contextHolder}

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Login;
