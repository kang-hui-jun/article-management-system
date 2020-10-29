import React, { Component } from 'react'
import { Table, Button, Tag } from 'antd';
import axios from 'axios'
import { SearchOutlined } from '@ant-design/icons';
// import store from '../../redux/store'
import {connect} from 'react-redux'
class Role extends Component {
    state = {
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: () => <div>
                    <Button type="primary" shape="circle" icon={<SearchOutlined />} disabled={true} />
                </div>,
            }
        ],
        datalist: []

    }

    componentDidMount() {
        if(this.props.datalist.length===0){
            //
            this.props.setList()
        }
    }

   
    render() {
        return (
            <Table
                columns={this.state.columns}
                dataSource={this.props.datalist}
                rowKey={item => {
                    // console.log(item)
                    return item.id
                }} //设置key值

                //展开
                expandable={{
                    expandedRowRender: record => {
                        // console.log(record.roleRight)
                        return <div style={{ margin: 0 }}>
                            {
                                record.roleRight.map(item =>
                                    <div key={item.category}>
                                        {/* <h3>{item.category}:</h3> */}
                                        {
                                            item.list.map(data =>
                                                <Tag color={"green"} key={data}>{data}</Tag>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    },
                    // rowExpandable: record => true,
                }}

            />
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        datalist:state.roleList
    }
}

const mapDispatchToProps = {
    setList : () => {
        // middleware 解决异步处理 redux-thunk redux-promise
        return (dispatch)=>{
            axios.get("/roles").then(res => {
                // console.log(res.data)
                //自己决定什么时候发送
                dispatch({
                    type:"SetRoleList",
                    payload:res.data
                })    
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Role)