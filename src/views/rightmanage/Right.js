import React, { Component } from 'react'
import axios from 'axios'
import { Table, Tag } from 'antd';
// import store from '../../redux/store';
import {connect} from 'react-redux'
class Right extends Component {
    
    state = {
        columns : [
            {
                title: '#', //列的名字
                dataIndex: 'id', //对应原始数据中 .属性
                key: 'id',
                render:item=>{
                    // console.log(item)
                    return <b>{item}</b>
                }
            },

            {
              title: '权限名称', //列的名字
              dataIndex: 'title', //对应原始数据中 .属性
              key: 'title',
            },
            {
              title: '权限等级',
              dataIndex: 'grade',
              key: 'grade',
              render:item=>{
                let arr =["green","orange","red"]
                return <Tag color={arr[item-1]}>{item}</Tag>
              }
            }
        ],
        datalist:[
        ]
    }

    componentDidMount(){
        if(this.props.datalist.length===0){
            //
            this.props.setList()
        }
    }
    render() {
        return (
            <Table columns={this.state.columns} dataSource={this.props.datalist}
            pagination={{pageSize:5}}>

            </Table>
        )
    }
}
const mapStateToProps=(state)=>{
    console.log(state.rightList)
    return {
        datalist:state.rightList
    }
}
const mapDispatchToProps = {
    setList:()=>{
        //返回一个promsie对象
        return axios.get("/rights").then(res=>{
            return {
                type:"SetRightList",
                payload:res.data
            }
        })
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Right)