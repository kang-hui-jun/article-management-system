import React, { Component } from 'react'

class Input extends Component{
    state = {
        mytext:""
    }

    kerwinreset= ()=>{
        this.setState({
            mytext:""
        })
    }

    render(){
        return <div>
            <div>other code</div>
            <input type="text" style={{background:"yellow"}}
            value={this.state.mytext} onChange={(ev)=>{
                this.setState({
                    mytext:ev.target.value
                })
            }}/>
        </div>
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <Input ref="myinput"/>
                <button onClick={this.handleClick}>add</button>
            </div>
        )
    }
    handleClick = ()=>{
        //拿着值
        console.log(this.refs.myinput.state.mytext)
        //清空输入框
        this.refs.myinput.kerwinreset()
    }
}
