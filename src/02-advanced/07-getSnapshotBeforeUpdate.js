import React, { Component } from 'react'

export default class App extends Component {
    state = {
        mytext:"kerwin"
    }
    render() {
        console.log("redner")
        return (
            <div>
                {this.state.mytext}
                <button onClick={()=>{
                    this.setState({
                        mytext:"xiaoming"
                    })
                }}>click</button>
            </div>
        )
    }

    // componentWillUpdate(){
    //     console.log("componentWillUpdate","记录的dom状态不可信，隔着didupdaet时间间隔太远")
    // }
    getSnapshotBeforeUpdate(){
        console.log("getSnapshotBeforeUpdate","获取滚动条的位置")
        return 1000
    }

    componentDidUpdate(prevProps,prevState,data){
        console.log("componentDidUpdate",data)
    }
}
