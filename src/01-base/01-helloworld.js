//定义第一个组件
import React,{Component}  from 'react'
// import from 'react' 
//1- class 类式组件 -支持状态和属性
class Hello extends Component{
    render(){
        // 将来 生命周期
        return (
            <div>
                <div>1111111</div>
                <div>2222222</div>
                <Child1/>
                <Child2/>
            </div>
        )
    }
}

class Child1 extends Component{
    render(){
        return <div>child</div>
    }
}



//2- functional 函数式组件 ,并不是后面要讲的Hooks,
// React16.8 之前 函数式组件不支持状态，支持属性
// React16.8 之后 React Hooks 支持状态和属性

// function Child2(){
//     return <div>Child2</div>
// }

const Child2 = ()=><div>child2</div>

export default Hello
