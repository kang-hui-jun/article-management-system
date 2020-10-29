import React, { Component } from 'react'
const GlobalContext = React.createContext() //创建一个context对象

class Child1 extends Component{
    render(){
        return <GlobalContext.Consumer>
            {
                context=>(
                    <div>child1--{context.text}</div>
                )
            }
        </GlobalContext.Consumer>
    }
}


class Child2 extends Component{
    render(){
        return <GlobalContext.Consumer>
            {
                context=> (
                    <div>child2-{context.call}
                        <button onClick={()=>this.handleClick(context)}>child2通信</button>
                    </div>
                )
            }
            </GlobalContext.Consumer>     
    }

    handleClick=(context)=>{
        // context.text="来自child2的问候"
        context.changeState("来自child2的问候")
    }
}

class Child3 extends Component{
    render(){
        return <div>child3</div>
    }
}

export default class App extends Component {
    state ={
        text:"私服"
    }

    changeState= (data)=>{
        this.setState({
            text:data
        })
    }

    render() {
        return (
            <GlobalContext.Provider value={{
                sms:"短信服务",
                call:"电话服务",
                text:this.state.text,
                changeState:this.changeState
            }}>
                <div>
                    <Child1/>
                    <Child2/>
                    <Child3/>
                </div>
            </GlobalContext.Provider>
        )
    }
}
