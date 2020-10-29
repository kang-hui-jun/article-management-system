import React, { Component } from "react";
import User from "../usermanage/User";
import Manage from "../rightmanage/Manage";
import Role from "../rightmanage/Role";
import Right from "../rightmanage/Right";
import NotFound from "../error/Error";
import Home from "../home/Home";
import {
  Route, //每个路由组件都需要此组件
  Redirect, // 重定向
  Switch, // 匹配到第一个符合条件路径的组件， 就停止
  // NavLink
} from "react-router-dom";
import "./Dashboard.css";
import List from "../articlemanage/List";
import Preview from "../articlemanage/Preview_hooks";

import { Layout } from "antd";
import TopHeader from "./TopHeader";
import SideMenu from "./SideMenu";
import Create from "../articlemanage/Create";
import Update from "../articlemanage/Update";

import store from "../../mobx/store";
import { autorun } from "mobx";

const { Content } = Layout;

export default class DashBoard extends Component {
  state = {
    isShow: true,
  };

  componentDidMount() {
    // console.log(this.props)

    this.kerwincancel = autorun(() => {
      // console.log(store.get())
      this.setState({
        isShow: store.get("isShow"),
      });
    });
    // window.onscroll
  }

  componentWillUnmount() {
    this.kerwincancel(); //取消观察
  }

  render() {
    var roleType = JSON.parse(sessionStorage.getItem("users")).roleType;
    return (
      <Layout style={{ height: "100%" }}>
        {/* <SideMenu kerwinhitory={this.props.history}></SideMenu> */}
        <SideMenu></SideMenu>
        <Layout className="site-layout">
          {this.state.isShow ? <TopHeader></TopHeader> : null}
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "auto", //超出部分修复
            }}
          >
            <Switch>
              {/* 首页 */}
              <Route path="/home" component={Home} />

              {/* 用户管理-用户列表 */}
              {roleType === 3 ? (
                <Route path="/user-manage/users" component={User} />
              ) : null}

              {/* 文章管理 -列表 ,预览(动态路由组件) */}
              <Route
                path="/article-manage/list"
                render={(props) => <List {...props}></List>}
              />
              <Route path="/article-manage/preview/:myid" component={Preview} />
              <Route path="/article-manage/update/:myid" component={Update} />
              <Route path="/article-manage/create" component={Create} />

              {/* <Route path="/right-manage" component = {Manage}/> */}

              {/* 权限管理- 角色和权限 */}
              {roleType === 3 ? (
                <Route
                  path="/right-manage"
                  render={(props) => (
                    <Manage {...props} name="kerwin">
                      <Switch>
                        <Route path="/right-manage/roles" component={Role} />
                        <Route path="/right-manage/rights" component={Right} />
                        <Redirect
                          from="/right-manage"
                          to="/right-manage/roles"
                        />
                      </Switch>
                    </Manage>
                  )}
                />
              ) : null}
              {/* 重定向 */}
              <Redirect from="/" to="/home" exact />
              <Route path="*" component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
