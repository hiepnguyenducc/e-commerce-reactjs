import { FormEvent, useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Input from "antd/es/input/Input";
import { AutoComplete, Button } from "antd";
import React from "react";
import { DefaultOptionType } from "antd/es/select";
function Register() {
    const history = useNavigate();
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
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error_list:[] ,
    });

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const name = target.name;
        const value = target.value;
    
        setRegister({ ...registerInput, [name]: value });
    };
    const handleEmailSelect = (value) => {
        setRegister({ ...registerInput, email: value });
    };
    const RegisterSubmit = (e: FormEvent) => {
        e.preventDefault();

       
        if (registerInput.password !== registerInput.confirmPassword) {
            console.log("Xác nhận mật khẩu không khớp");
            return; 
        }

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        };
        axios.get('/sanctum/csrf-cookie').then(response=>{
            axios.post(`/api/register`, data).then(res => {
              
                if(res.data.status === 200){
                        localStorage.setItem('auth_token',res.data.token);
                        localStorage.setItem('auth_name',res.data.username);
                        swal("Success", res.data.message,'success');
                        history('/')
                }else{
                    setRegister({...registerInput,error_list: res.data.validatioon_errors})
                }
            });
        });
        
    }

  
    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                                <div className="card-body">
                                    <form action="" onSubmit={RegisterSubmit}>
                                        <div className="form-group mb-3">
                                            <label htmlFor="name">Full Name</label>
                                            <Input type="" name="name" onChange={handleInput} value={registerInput.name} placeholder="Enter Name"  allowClear/>
                                            
                                        </div>
                                        <div className="form-group mb-3">
                                        <AutoComplete
                                                style={{ width: 487 }}
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
                                            <Input type="password" name="password" onChange={handleInput} value={registerInput.password}  placeholder="Enter Password" allowClear/>
                                           
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <Input type="password" name="confirmPassword" onChange={handleInput} value={registerInput.confirmPassword} placeholder="Confirm Password" allowClear/>
                                         
                                        </div>
                                        <div className="form-group mb-3">
                                            <Button type="primary" htmlType="submit" >Register</Button>
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

export default Register;
