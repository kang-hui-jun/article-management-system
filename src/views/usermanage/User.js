import React, { Component } from 'react'
import axios from 'axios'
import { Table, Switch, Button, Modal, Form, Input, Select, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;

export default class User extends Component {
    state = {
        roleType:1, //记录选中的roleType
        formdata:null,
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            { title: '用户名', dataIndex: 'username', key: 'username' },
            {
                title: '用户状态', dataIndex: 'roleState', key: 'roleState',
                render: (data, item) => {
                    // console.log(item)
                    return <Switch defaultChecked={data} disabled={item.default}onChange={(checked)=>{this.handleSwitchChange(checked,item)}}></Switch>
                }
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (item) => <div>
                    <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} onClick={()=>this.handleUpdateClick(item.id)}/>
                    &nbsp;
                    <Button type="danger" shape="circle" icon={<DeleteOutlined />}
                        disabled={item.default} onClick={()=>this.handleDelClick(item.id)}></Button>
                </div>,
            }
        ],
        datalist: [],
        visible: false,
        visibleUpdate:false
    }
    componentDidMount() {
        axios.get("/users").then(res => {
            console.log(res.data)
            this.setState({
                datalist: res.data
            })
        })
    }

    handleSwitchChange=(checked,item)=>{
        // console.log(checked,item)

        axios.put(`/users/${item.id}`,{
            ...item,
            roleState:checked
        }).then(res=>{
            //不需要更新页面
        })
    }

    //添加用户
    handleAdd = () => {
        this.setState({
            visible: true
        })
    }
    //add处理
    handleAddOk = () => {
        // console.log("ok")
        this.refs.addform.validateFields()
            .then(values => {
                this.refs.addform.resetFields(); //重置

                // console.log({...values,roleType:this.state.roleType,roleState:false});

                axios.post("/users",{...values,roleType:this.state.roleType,roleState:false}).then(res=>{
                    // console.log(res.data)
                    // 重新设置datalist, 隐藏对话框
                    this.setState({
                        datalist:[...this.state.datalist,res.data],
                        visible:false
                    })
                }) //新的数据
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    //删除处理
    handleDelClick = (id)=>{
        // console.log(id)
        axios.delete(`/users/${id}`).then(res=>{
            console.log("delete ok ")
            this.setState({
                datalist:this.state.datalist.filter(item=>item.id!==id)
            })

            message.success("删除成功")
        })
    }

    handleUpdateClick =(id)=>{
        // modal动态创建的 ，所以直接拿ref，拿不到，
        // 1. modal提前创建出来， 然后 隐藏， 需要的时候再显示
        // 2. 设置一个状态，让状态更新， 渲染form表单时候传入
        // console.log(this.refs)
        // this.setState({
        //     visibleUpdate:true
        // },()=>{
        //     console.log(this.refs.updateform)
        // })

        // console.log(id) // (1)ajax取当前id的数据显示 （2）利用从datalist里过滤处理
        var formdata = this.state.datalist.filter(item=>item.id===id)
        this.setState({
            formdata:formdata[0], //初始化创建的时候赋值
            visibleUpdate:true, // 创建/显示
            roleType:formdata[0].roleType //要更新的roleType 
        })

        var {username,password,roleName} = formdata[0]
        // 更新时候调用
        this.refs.updateform && this.refs.updateform.setFieldsValue({
            username,
            password,
            roleName
        })

    }

    //更新处理
    handleUpdateOk =()=>{
        this.refs.updateform.validateFields().then(value=>{        
            axios.put(`/users/${this.state.formdata.id}`,{
                ...this.state.formdata, 
                ...value,
                roleType:this.state.roleType
            }).then(res=>{
                // console.log(res.data)
                // 深复制 datalist, splice(x,1,res.data)

                var newlist= this.state.datalist.map(item=>{
                    //此时正在更新的id
                    if(item.id===this.state.formdata.id){
                        return res.data
                    }else{
                        return item
                    }
                })
                this.setState({
                    visibleUpdate:false,
                    datalist:newlist
                })
            })
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.handleAdd}>添加用户</Button>
                <Table columns={this.state.columns} dataSource={this.state.datalist}
                    rowKey={item => {
                        // console.log(item)
                        return item.id
                    }} //设置key值
                />
                {/* 添加用户的对话框 */}
                <Modal
                    title="添加用户"
                    visible={this.state.visible}
                    onOk={this.handleAddOk}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    <Form
                        ref="addform"
                        layout="vertical"
                        name="form_in_modal"
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: 'Please input the username of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: 'Please input the password of collection!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            name="roleName"
                            label="角色"
                            rules={[{ required: true, message: 'Please select the role of collection!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="请选择一个角色"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                // onFocus={onFocus}
                                // onBlur={onBlur}
                                // onSearch={onSearch}
                                // filterOption={(input, option) =>
                                //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                // }
                            >
                                <Option value="超级管理员">超级管理员</Option>
                                <Option value="管理员">管理员</Option>
                                <Option value="小编">小编</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* 更新状态框 */}
                <Modal
                    title="更新用户"
                    visible={this.state.visibleUpdate}
                    onOk={this.handleUpdateOk}
                    onCancel={() => {
                        this.setState({
                            visibleUpdate: false
                        })
                    }}
                >
                    <Form
                        ref="updateform"
                        layout="vertical"
                        name="form_in_modal2"
                        initialValues={this.state.formdata}
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: 'Please input the username of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: 'Please input the password of collection!' }]}
                        >
                            <Input type="password" />
                        </Form.Item>
                        
                        <Form.Item
                            name="roleName"
                            label="角色"
                            rules={[{ required: true, message: 'Please select the role of collection!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="请选择一个角色"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                // onFocus={onFocus}
                                // onBlur={onBlur}
                                // onSearch={onSearch}
                                // filterOption={(input, option) =>
                                //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                // }
                            >
                                <Option value="超级管理员">超级管理员</Option>
                                <Option value="管理员">管理员</Option>
                                <Option value="小编">小编</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>    
            </div>
        )
    }
    onChange = (data)=>{
        // console.log(data,"根据不同的角色名字，设置好对应的roleType")
        var arr =["小编","管理员","超级管理员"]
        var roleType  = arr.indexOf(data)+1
        this.setState({
            roleType
        }) //roleType 字段计算
    }
}
