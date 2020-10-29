// 16.2 版本之前 - 老的生命周期
// 16.2 版本之后 - 删了之前三个生命周期， 换成了 新的两个生命周期

import React, { Component } from 'react'

export default class App extends Component {
    state = {
        list:[]
    }
    // beforeMount
    UNSAFE_componentWillMount(){
        console.log("componentWillMount","ajax,setInterval,")
    }

    // mounted
    componentDidMount() {
        console.log("componentDidMount","ajax, 绑定，setInterval")
        fetch("/test.json").then(res=>res.json()).then(res=>{
            console.log(res)
            this.setState({
                list:res.coming
            })
        })
    }
    
    render() {
        console.log("render")
        return (
            <div>
                {
                    this.state.list.map(item=>
                        <li key={item.id}>
                            <img src={item.img.replace('w.h','128.180')}/>
                            {item.nm}
                        </li>
                    )
                }
            </div>
        )
    }
}
