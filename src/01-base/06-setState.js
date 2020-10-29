import React, { Component } from 'react'

export default class App extends Component {
    state = {
        myname:"kerwin",
        count:1,
        obj:{
            a:1,
            b:2,
            c:[1,2,3]
        }
    }

    render() {
        return (
            <div>
                {/* {this.state.myname}
                <button onClick={this.handleClick1}>add1</button>

                <button onClick={this.handleClick2}>add2</button> */}

                {this.state.count}
                <button onClick={this.handleAdd1}>addCount1</button>
                <button onClick={this.handleAdd2}>addCount2</button>
            </div>
        )
    }

    handleAdd1 = ()=>{
        this.setState({
            count:this.state.count+1
        })
        this.setState({
            count:this.state.count+1
        })
        // 同一事件loop 连续setState 会进行合并
    }

    handleAdd2 = ()=>{
        this.setState((prevState)=>({
            count:prevState.count+1
        }))
        this.setState((prevState)=>({
            count:prevState.count+1
        }))

        // 一个队列里
    }


    handleClick1 = ()=>{
        this.setState({
            myname:"xiaoming"
        },()=>{
            //new Swiper()
            // this.$nextTick(()=>{})
            console.log("第二个参数",this.state.myname)
        })// 之后发生什么？？？？？
        /*
            虚拟do'm
            diff对比
        */
        console.log("111111",this.state.myname)
    }

    handleClick2 = ()=>{
        //接受一个回调函数作为参数
        this.setState((prevState)=>({
            myname:"xiaoming"
        }))
    }
}
