import React, { Component } from 'react'

const observer = {
    list:[],
    //订阅
    subscribe(callback){
        // console.log(callback)
        this.list.push(callback)
    },
    //发布,分发
    dispatch(data){
        //遍历数组， 让每个元素（函数） 执行
        this.list.forEach(item=>{
            // console.log(item)
            item(data) //执行回调函数
        })
    }
}//redux 

class Child1 extends Component{
    //创建成功, dom挂载完成 mounted() vue
    componentDidMount(){
        console.log("componentDidMount","调用订阅方法")
        observer.subscribe((data)=>{
            console.log("child1定义的callback",data)
        })
    }

    render(){
        return <div style={{background:"red"}}>child1-我是微信用户
        
        </div>
    }

}

class Child3 extends Component{
    //创建成功, dom挂载完成 mounted() vue
    componentDidMount(){
        console.log("componentDidMount","调用订阅方法")
        observer.subscribe((data)=>{
            console.log("child3定义的callback",data)
        })
    }

    render(){
        return <div style={{background:"blue"}}>child3-我是微信用户
        
        </div>
    }

}

class Child2 extends Component{
    render(){
        return <div style={{background:"yellow"}}>
            child2-我是公众号发布者
            <button onClick={this.handleClick}>发布</button>
        </div>
    }

    handleClick= ()=>{
        //发布
        observer.dispatch("来自child2的问候")
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <Child1/>
                <Child3/>
                <Child2/>
            </div>
        )
    }
}
