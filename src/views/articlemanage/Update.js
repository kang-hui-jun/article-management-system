import React, { Component } from "react";
import {
  PageHeader,
  Steps,
  Button,
  message,
  Form,
  Input,
  Cascader,
} from "antd";
import "./Create.css";
import axios from "axios";
import RichEditor from "./RichEditor";
const { Step } = Steps;

export default class Update extends Component {
  state = {
    current: 0,
    categories: [],
    articleform: {},
    content: "",
    richkey: 1,
  };

  componentDidMount() {
    axios.get("/categories").then((res) => {
      console.log(res.data);
      this.setState({
        categories: res.data, //级联菜单信息
      });
    });

    axios.get(`/articles/${this.props.match.params.myid}`).then((res) => {
      console.log(res.data);
      let { title, category, content } = res.data;
      // this.setState({
      //     articleform:{
      //         title:title,
      //         category:category
      //     }//articleform 赋值
      // })
      this.setState({
        content,
        richkey: 2, //为了让richEditor 重新创建一遍
      }); // 同步content, 为了传给RichEditor

      //动态设置表单的values
      this.refs.articleform.setFieldsValue({
        title,
        category,
      });
    });

    // console.log(this.props.match.params.myid) //获取id
  }

  render() {
    const steps = [
      {
        title: "基本信息",
      },
      {
        title: "文章内容",
      },
      {
        title: "提交文章",
      },
    ];

    // antd 24栅格
    const layout = {
      labelCol: { span: 4 }, //label宽度占几份？
      wrapperCol: { span: 20 }, //内容占几份?
    };
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            // console.log("back",this.props.history)
            this.props.history.goBack(); //返回上一个页面
          }} //返回按钮
          title="更新文章"
          subTitle="八仙过海，各显其能"
        />
        {/* 步骤条 */}
        <div style={{ padding: "24px" }}>
          <Steps current={this.state.current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          {/* 步骤条对应的内容 */}
          <div
            className="steps-content"
            style={{ display: this.state.current === 0 ? "block" : "none" }}
          >
            <Form
              {...layout}
              ref="articleform"
              // layout="vertical" //垂直布局
              name="form_in_modal"
              initialValues={this.state.articleform}
              //初始values
            >
              <Form.Item
                name="title"
                label="文章标题"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="category"
                label="文章分类"
                rules={[
                  {
                    required: true,
                    message: "Please input the category of collection!",
                  },
                ]}
              >
                <Cascader
                  options={this.state.categories}
                  onChange={this.onChange}
                  fieldNames={{ label: "title" }} //自定义lable在哪个字段
                  placeholder="Please select"
                />
              </Form.Item>
            </Form>
          </div>
          <div
            className="steps-content"
            style={{
              display: this.state.current === 1 ? "block" : "none",
              height: "500px",
              overflow: "auto",
            }}
          >
            {/* 给richEditory传来一个函数 */}
            <RichEditor
              getContent={this.getContent}
              content={this.state.content}
              key={this.state.richkey}
            ></RichEditor>
          </div>
          <div
            className="steps-content"
            style={{ display: this.state.current === 2 ? "block" : "none" }}
          ></div>

          {/* 控制按钮显示         */}
          <div className="steps-action">
            {this.state.current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                下一步
              </Button>
            )}
            {this.state.current === steps.length - 1 && (
              <Button type="primary" onClick={this.handleSubmit}>
                更新
              </Button>
            )}
            {this.state.current > 0 && (
              <Button style={{ margin: 8 }} onClick={() => this.prev()}>
                上一步
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  handleSubmit = () => {
    let { username, roleType } = JSON.parse(sessionStorage.getItem("users"));
    // console.log(this.state.articleform,this.state.content)
    //post添加数据
    axios
      .put(`/articles/${this.props.match.params.myid}`, {
        ...this.state.articleform,
        content: this.state.content,
        author: username,
        roleType: roleType,
      })
      .then((res) => {
        message.success("你更新成功了，你知道吗？");
        //跳转到list页面
        this.props.history.push("/article-manage/list");
      });
  };

  getContent = (content) => {
    console.log("父组件打印", content);
    this.setState({
      content,
    });
  };

  onChange = () => {};

  next() {
    // console.log()
    if (this.state.current === 0) {
      //触发表单校验
      this.refs.articleform.validateFields().then((values) => {
        // console.log(values)
        this.setState({
          articleform: values, //同步此时form的状态
          current: this.state.current + 1,
        });
      });
      return;
    }
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
}
