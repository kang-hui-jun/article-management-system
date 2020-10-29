import React, { Component } from 'react'
import MyPropTypes from 'prop-types' //提供验证数据类型的方法
// console.log(MyPropTypes)
class Navbar extends Component{
    static propTypes= {
        myshow:MyPropTypes.bool
    } //属性验证

    static defaultProps= {
        myshow:true
    } //默认属性

    render(){
        return <div>
            <button>back</button>
            Navbar -{this.props.mytitle}
            {
                this.props.myshow?
                <button>home</button>:null
            }
        </div>
    }
}

// Navbar.propTypes= {
//     myshow:MyPropTypes.bool
// }

// props:["mytitle"]

export default class App extends Component {
    render() {
        var obj = {
            mytitle:"测试",
            myshow:false
        }

        return (
            <div>
                <Navbar mytitle="home" myshow={false}></Navbar>
                <Navbar mytitle="list" ></Navbar>
                <Navbar mytitle="shopcar" ></Navbar>
                <Navbar {...obj}></Navbar>
            </div>
        )
    }
}
// ? 属性验证 //props:{isShow:Boolean}
// ? 默认属性

//ES6
// class Test{
//     a="对象属性" //constructor
// }

// Test.a="类属性"
// console.log(Test.a) //类属性
// console.log(new Test().a) //对象属性

//ES7

class Test{
    static a="类属性" //等价于上面的写法， 类属性
    a="对象属性" //constructor
}

console.log(Test.a) //类属性
console.log(new Test().a) //对象属性