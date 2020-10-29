import React, { Component } from 'react'

class Navbar extends Component{
    render(){
        return <div style={{background:"red"}}>
            navbar-<button onClick={this.handleClick}>click</button>
        </div>
    }

    handleClick = ()=>{
        console.log(this.props.onKerwinEvent)
        this.props.onKerwinEvent()
    }
}

class Sidebar extends Component{
    render(){
        return <div style={{background:"yellow"}}>
            Sidebar
            <ul>
                <li>11111</li>
                <li>222222</li>
                <li>33333</li>
            </ul>
        </div>
    }

    componentWillUnmount(){
        console.log("componentWillUnmount","clearInterval ,window.onscroll=null")
    }
}

export default class App extends Component {
    state = {
        isShow:true
    }
    render() {
        return (
            <div>
                App
                <Navbar onKerwinEvent={()=>{
                    console.log("App 组件的回调函数")
                    this.setState({
                        isShow:!this.state.isShow
                    })
                }}/>
                {/* <button onClick={()=>{
                    this.setState({
                        isShow:!this.state.isShow
                    })
                }}>click</button> */}
                {
                    this.state.isShow?
                    <Sidebar/>
                    :null
                }
            </div>
        )
    }
}
// vue 父子通信 父传子-->属性  子传父---> 事件
    // vue ref通信

// React 父子通信 父传子-->属性  子传父---> 回调函数
    // React ref通信 