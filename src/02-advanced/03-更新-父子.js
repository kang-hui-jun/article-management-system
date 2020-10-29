import React, { Component } from 'react'

class Child extends Component{

    componentDidMount() {
        console.log("获取ajax数据",this.props.myname)
    }
    

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps")
        console.log("获取ajax数据",nextProps.myname)
    }
    
    render(){
        return <div>
            child组件-{this.props.myname}
        </div>
    }
}

export default class App extends Component {
    state= {
        myname:"4567"
    }
    render() {
        return (
            <div>
                {this.state.myname}
                <button onClick={()=>{
                    this.setState({
                        myname:"4321"
                    })
                }}>click</button>
                <Child myname={this.state.myname}></Child>
            </div>
        )
    }
}
