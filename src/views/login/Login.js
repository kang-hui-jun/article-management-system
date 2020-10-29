import React, { Component } from "react";
import Particles from "react-particles-js";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import axios from "axios";
export default class Login extends Component {
  componentDidMount() {
    // console.log(window.innerHeight)
  }

  onFinish = (values) => {
    console.log("Received values of form: ", values);
    //ajax .存在用户名密码， 登录成功

    axios
      .get(
        `/users?username=${values.username}&password=${values.password}&roleState=true`
      )
      .then((res) => {
        // console.log(res.data)
        if (res.data.length > 0) {
          // localStorage.setItem("isLogin",true)
          // localStorage.setItem("users",JSON.stringify(res.data[0])) //只能存字符串
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("users", JSON.stringify(res.data[0])); //只能存字符串
          this.props.history.push("/");
        } else {
          //失败弹出
          // console.log("用户名密码不匹配")
          message.error("用户名密码不匹配");
        }
      });

    // get获取
    // axios.get("/list/1").then(res=>{
    //     console.log(res.data)
    // })

    // post 添加
    // axios.post("/list",{
    //     text:"ddd"
    // }).then(res=>{
    //     console.log(res.data)
    // })

    // put 更新
    // axios.put("/list/2",{
    //     text:"修改了"
    // }).then(res=>{
    //     console.log(res.data)
    // })

    // delete 删除
    // axios.delete("/list/2").then(res=>{
    //     console.log(res.data)
    // })
  };

  render() {
    return (
      <div style={{ background: "rgb(35, 39, 65)", height: "100%" }}>
        <Form
          name="normal_login"
          className="login-form"
          // initialValues={{ username: "111111" }} // 初始值
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入你的用户名" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入你的密码" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <Particles
          height={window.innerHeight - 5 + "px"}
          params={{
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false,
                  mode: "repulse",
                },
                onclick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 800,
                  line_linked: {
                    opacity: 1,
                  },
                },
                bubble: {
                  distance: 800,
                  size: 80,
                  duration: 2,
                  opacity: 0.8,
                  speed: 3,
                },
                repulse: {
                  distance: 400,
                  duration: 0.4,
                },
                push: {
                  particles_nb: 4,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
          }}
        />
      </div>
    );
  }
}
