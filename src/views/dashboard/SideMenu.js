import React, { Component } from "react";
import { Layout, Menu } from "antd";
import menus from "../../router/menu";
import { withRouter } from "react-router"; //路由
// import store from '../../redux/store'
import { connect } from "react-redux";
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends Component {
  // state = {
  //     collapsed: false
  // }

  componentDidMount() {
    //订阅
  }

  render() {
    var pathname = this.props.location.pathname;
    var OpenKeys = ["/" + pathname.split("/")[1]];
    var SelectedKeys = [pathname];
    console.log(pathname);
    return (
      <Sider trigger={null} collapsible collapsed={this.props.isCollapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={this.handleClick}
          defaultOpenKeys={OpenKeys}
          // defaultSelectedKeys = {SelectedKeys}  只有组件第一次创建的时候会生效
          selectedKeys={SelectedKeys}
        >
          {this.renderItem(menus)}
        </Menu>
      </Sider>
    );
  }

  handleClick = (obj) => {
    console.log("11111", obj.key);
    this.props.history.push(obj.key);
  };

  renderItem = (menus) => {
    // console.log(menus)
    // 根据当前啊用户的roleType进行判断 是否该渲染?
    var roleType = JSON.parse(sessionStorage.getItem("users")).roleType; //1
    return menus.map((item) => {
      if (item.children) {
        if (item.permission > roleType) {
          return null;
        }
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <item.icon />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              //递归
              this.renderItem(item.children)
            }
          </SubMenu>
        );
      } else {
        if (item.permission > roleType) {
          return null;
        }
        return (
          <Menu.Item key={item.path}>
            <item.icon />
            <span>{item.title}</span>
          </Menu.Item>
        );
      }
    });
  };
}

const mapStateToProps = (state) => {
  return {
    isCollapsed: state.isCollapsed,
  }; //约定isCollapsed 属性传给 SideMenu
};
export default withRouter(connect(mapStateToProps)(SideMenu));

/*
    function connect (){
        return function(){

        }
    }


*/

//withRouter  高阶组件， 获取低阶组件， 生成高阶组件
// "干爹"
