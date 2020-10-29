import React, { Component } from 'react'

class Title extends Component {

    state = {
        myname:"kerwin"
    }
    // componentWillMount() {
    //     document.title = this.props.mytitle
    // }

    // componentWillReceiveProps(nextProps){
    //     document.title = nextProps.mytitle
    // }

    // static getDerivedStateFromProps(nextProps,state){
    //     // console.log(state)
    //     // this.setState

    //     // 处理初始状态
    //     return {
    //         myname:state.myname.substring(0,1).toUpperCase()+state.myname.substring(1)
    //     }
    // }

    static getDerivedStateFromProps(nextProps,state){
        document.title = nextProps.mytitle
        // this.setState
        // 处理初始状态
        return null
    }

    render(){
        return <div>{this.state.myname}</div>
    }
    
}

export default class App extends Component {

    state  ={
        text:"1111"
    }
    render() {
        return (
            <div>
                <ul>
                    <li onClick={()=>this.handleClick("1111")}>11111</li>
                    <li onClick={()=>this.handleClick("2222")}>222222</li>
                    <li onClick={()=>this.handleClick("3333")}>333333</li>
                </ul>
                <Title mytitle={this.state.text}/>
            </div>
        )
    }
    handleClick=(data)=>{
        this.setState({
            text:data
        })
    }
}
