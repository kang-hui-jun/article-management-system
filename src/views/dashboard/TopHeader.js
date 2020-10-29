import React, { Component } from "react";
import { Layout, Dropdown, Menu, Avatar } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router";
// import store from '../../redux/store';
import { connect } from "react-redux";
const { Header } = Layout;

class TopHeader extends Component {
  state = {
    collapsed: false,
    path: "",
  };

  // 生成action

  toggle = (isCollapsed) => {
    //发布者
    // store.dispatch(this.actionCreator(isCollapsed));
    this.props.actionCreator(isCollapsed);

    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  exit = () => {
    sessionStorage.setItem("isLogin", false);
    sessionStorage.setItem("users", JSON.stringify({}));
    //重定向
    this.props.history.push("/login");
    // window.location.reload()
  };

  openCamera = () => {
    //window.plus
    var cmr = window.plus.camera.getCamera();
    var res = cmr.supportedImageResolutions[0];
    var fmt = cmr.supportedImageFormats[0];
    // console.log("Resolution: "+res+", Format: "+fmt);
    cmr.captureImage(
      (path) => {
        alert("oldpath: " + path);
        //path是一个相对路径， 无法直接给img src标签使用，
        // path===>绝对路径的转化， convertLocalFileSystemURL
        var absolutePath = window.plus.io.convertLocalFileSystemURL(path);
        alert("newpath: " + absolutePath);
        //this 注意
        this.setState({
          path: absolutePath,
        });
        //upload
      },
      function (error) {
        alert("Capture image failed: " + error.message);
      },
      { resolution: res, format: fmt }
    );
  };

  render() {
    //权限信息，登录用户信息
    var roleName = JSON.parse(sessionStorage.getItem("users")).roleName;
    var username = JSON.parse(sessionStorage.getItem("users")).username;
    const menu = (
      <Menu>
        <Menu.Item>
          <div onClick={this.openCamera}>{roleName}</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={this.exit}>退出</div>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                })} */}
        {this.state.collapsed ? (
          <MenuUnfoldOutlined
            onClick={() => this.toggle(false)}
            className="trigger"
          />
        ) : (
          <MenuFoldOutlined
            onClick={() => this.toggle(true)}
            className="trigger"
          />
        )}

        <div style={{ float: "right", margin: "0px 16px" }}>
          <span style={{ margin: "0px 16px" }}>欢迎{username}回来</span>
          <Dropdown overlay={menu}>
            {this.state.path ? (
              <img
                src={this.state.path}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                alt="alt"
              />
            ) : (
              <Avatar size={"large"} icon={<UserOutlined />} />
            )}
          </Dropdown>
        </div>
      </Header>
    );
  }
}
const mapStateToProps = () => {
  return {};
}; // state映射 成属性用

const mapDispathToProps = {
  actionCreator: (isCollapsed) => {
    //ajax 业务， 动态计算action
    return {
      type: "MySideMenuCollapsed",
      payload: isCollapsed,
    };
  },
}; //方法映射成属性用

export default withRouter(
  connect(mapStateToProps, mapDispathToProps)(TopHeader)
);

/*
 var a = <div>111111</div> jsx
 babel-loader

 import React from 'react'
 var a = React.createElement("div",null,"11111111")

*/
