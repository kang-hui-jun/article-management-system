import React, { Component } from 'react'
import axios from 'axios'
import {PageHeader} from 'antd'
import store from '../../mobx/store'
export default class Preview extends Component {
    state = {
        title:"",
        category:[],
        content:"",
        // isShow:store.get()
    }
    componentDidMount() {

        // 设置 store的中布尔值
        store.set("isShow",false)

        // console.log("获取id,再ajax请求",this.props.match.params.myid)
    
        axios.get(`/articles/${this.props.match.params.myid}`).then(res=>{
            console.log(res.data)
            let {title,category,content} =  res.data
            this.setState({
                title,
                category,
                content
            })
        })    
    }

    // compenntwillreceiveProps
    
    componentWillUnmount(){
        store.set("isShow",true)//
    }

    render() {
        return (
            <div>
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        // console.log("back",this.props.history)
                        this.props.history.goBack()//返回上一个页面
                    }} //返回按钮
                    title={this.state.title} //文章标题
                    subTitle={this.state.category.join("/")} //分类
                 />
                 <div style={{ padding: "24px" }} dangerouslySetInnerHTML={{
                     __html:this.state.content
                 }}>
                    {/* {this.state.content} */}
                 </div>
            </div>
        )
    }
}

/*
    data:{
        myhtml:"<b>11111111</b>"
    }

    {{myhtml}}

    <div v-html="myhtml"></div>
 */