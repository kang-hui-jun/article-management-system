import React, { Component } from "react";
import { Table, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ChromeOutlined,
} from "@ant-design/icons";
import Axios from "axios";

export default class List extends Component {
  state = {
    datalist: [],
    columns: [
      { title: "文章标题", dataIndex: "title", key: "title" },
      { title: "文章作者", dataIndex: "author", key: "author" },
      {
        title: "文章类别",
        dataIndex: "category",
        key: "category",
        render: (item) => <div>{item.join("/")}</div>,
      },
      {
        title: "操作",
        dataIndex: "",
        key: "x",
        render: (item) => (
          <div>
            <Button
              shape="circle"
              icon={<ChromeOutlined />}
              onClick={() => this.handlePreviewClick(item.id)}
            />
            &nbsp;
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => this.handleUpdateClick(item.id)}
            />
            &nbsp;
            <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => this.handleDelClick(item.id)}
            ></Button>
          </div>
        ),
      },
    ],
  };

  //预览函数
  handlePreviewClick = (id) => {
    this.props.history.push(`/article-manage/preview/${id}`);
  };

  //更新函数
  handleUpdateClick = (id) => {
    this.props.history.push(`/article-manage/update/${id}`);
  };

  //删除函数
  handleDelClick = (id) => {
    // console.log(id)
    Axios.delete(`/articles/${id}`).then((res) => {
      // 同步修改datalilst状态，
      this.setState({
        datalist: this.state.datalist.filter((item) => item.id !== id),
      });
    });
  };

  componentDidMount() {
    var username = JSON.parse(sessionStorage.getItem("users")).username;
    Axios.get(`/articles?author=${username}`).then((res) => {
      this.setState({
        datalist: res.data,
      });
    });
  }

  componentWillUnmount() {
    console.log("列表销毁", "取消ajax");
    this.setState = () => {
      console.log("setstate 被hack了");
    }; //重写
  }

  render() {
    return (
      <div>
        <Button onClick={this.changePage} type="primary">
          添加文章
        </Button>
        <Table
          columns={this.state.columns}
          dataSource={this.state.datalist}
          rowKey={(item) => {
            // console.log(item)
            return item.id;
          }} //设置key值
        />
      </div>
    );
  }

  changePage = () => {
    //跳转到create路由
    this.props.history.push("/article-manage/create");
  };
}
