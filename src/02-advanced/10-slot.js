import React, { Component } from 'react'

class Child extends Component {
    render(){
        return <div>
            {this.props.children[1]}
            child
            {this.props.children[0]}
            {this.props.children[2]}
        </div>
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <Child >
                    <div>11111111111</div>
                    <div>22222222222</div>
                    <div>333333333333333</div>
                </Child>
            </div>
        )
    }
}
