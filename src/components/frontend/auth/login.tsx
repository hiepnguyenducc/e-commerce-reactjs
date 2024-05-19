
import { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { AutoComplete,  message,  } from 'antd';
import '../css/style.css';

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
        error_list: {} as {[key:string]:string},
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

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);

                    if (res.data.role === 'admin') {

                        history('/admin/dashboard')
                      messageApi.open({
                        type: 'success',
                        content: 'Logged In Successfully',
                      });
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

        <form onSubmit={loginSubmit}>
        <div className="row justify-content-center">
          <div className="container margin_30">
            <div className="page_header">
              <div className="breadcrumbs">
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Category</a></li>
                  <li>Page active</li>
                </ul>
              </div>
              <h1>Sign In</h1>
            </div>
          </div>

            <div className="col-xl-6 col-lg-6 col-md-8">
              <div className="box_account ">
                <h3 className="client">Already Client</h3>

                <div className="form_container">
                  <div className="row no-gutters">
                    <div className="col-lg-6 pr-lg-1 fade-in">
                      <a href="#0" className="social_bt facebook">Login with Facebook</a>
                    </div>
                    <div className="col-lg-6 pl-lg-1 fade-inGoogle">
                      <a href="#0" className="social_bt google">Login with Google</a>
                    </div>
                  </div>
                  <div className="divider "><span className="fade-inOr" style={{borderRadius:'50%'}}>Or</span></div>


                  <div className="form-group">

                    <AutoComplete
                      style={{width: '100%', borderRadius: '5px'}}
                      onSearch={handleSearch}
                      onSelect={handleEmailSelect}
                      placeholder="Enter Email"
                      size="large"
                      options={options}
                      className="from-control fade-inEmail"
                      allowClear
                    />
                    {loginInput.error_list && loginInput.error_list.email && (
                      <div className="error" style={{color:'red' }}>
                        <span>{loginInput.error_list.email}</span>
                      </div>
                    )
                    }

                  </div>

                  <div className="form-group">
                    <input type="password" className="form-control fade-inPassword" name="password" id="password_in"
                           onChange={handleInput}
                           value={loginInput.password}
                           placeholder="Password*"
                           style={{backgroundColor: '#fff', height: '39px', borderRadius: '5px'}}/>
                    {loginInput.error_list && loginInput.error_list.password && (
                      <div className="error" style={{color:'red'}}>
                        <span>{loginInput.error_list.password}</span>
                      </div>
                    )
                    }
                  </div>

                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-start fade-inRemember">
                      <label className="container_check">Remember me
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="float-end"><a id="forgot" href="javascript:void(0);">Lost Password?</a></div>
                  </div>
                  <div className="text-center"><input type="submit" value="Log In" className="btn_1 full-width"/>
                  </div>
                  <div id="forgot_pw">
                    <div className="form-group">
                      <input type="email" className="form-control" name="email_forgot" id="email_forgot"
                             placeholder="Type your email"/>
                    </div>
                    <p>A new password will be sent shortly.</p>
                    <div className="text-center"><input type="submit" value="Reset Password" className="btn_1"/></div>
                    {contextHolder}
                  </div>
                </div>
              </div>

          <div className="row">
            <div className="col-md-6 d-none d-lg-block">
              <ul className="list_ok">
                <li>Find Locations</li>
                <li>Quality Location check</li>
                <li>Data Protection</li>
              </ul>
            </div>
            <div className="col-md-6 d-none d-lg-block">
              <ul className="list_ok">
                <li>Secure Payments</li>
                <li>H24 Support</li>
              </ul>
            </div>
          </div>

        </div>
            </div>
        </form>


      </>
)
}

export default Login;
