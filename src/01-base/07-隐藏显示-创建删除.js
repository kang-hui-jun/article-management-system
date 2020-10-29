import React, { Component } from 'react'
import './css/index.css'
export default class App extends Component {

    state ={
        isHidden:true,
        isCreated:true
    }

    render() {
        var a = <div>2222222222222222222222</div>
        var b = <div>3333333333333333333333</div>

        return (
            <div>
                <button onClick={()=>{
                    this.setState({
                        isHidden:!this.state.isHidden
                    })
                }}>show/hide</button>
                <div className={this.state.isHidden?'hide':''}>1111111111111</div>
                <button onClick={()=>{
                    this.setState({
                        isCreated:!this.state.isCreated
                    })
                }}>create/delete</button>
                {
                    this.state.isCreated?a:b
                }
            </div>
        )
    }
}
