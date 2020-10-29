import React, { Component } from 'react'

// v-for="data in datalist "
class App extends Component {

    state = {
        myname:"kerwin", //定义一个状态
        myage:100,
        datalist:["1111","22222","33333"]
    }

    // constructor(){
    //     super()
    //     //react state vs vue data
    //     this.state = {
    //         myname:"kerwin",
    //         myage:100
    //     }
    // }

    render() {
        // var newlist = this.state.datalist.map(item=>
        //     <li>{item}</li>
        // )

        return (
            <div>
                app -{this.state.myname}-{this.state.myage}
                <button onClick={this.handleClick}>click</button>

                {/* { newlist } */}

                {
                    this.state.datalist.map(item=>
                        <li key={item}>{item}</li>
                    )
                }

            </div>
        )
    }

    handleClick = ()=>{
        // console.log("onclick")
        // this.state.myname = "xiaoming" // 直接修改状态是不允许的
        this.setState({
            myname:"xiaoming",
            myage:18
        })
        // React 不是 get set拦截
    }
}

// var arr =["111","2222","33333"]

// var newarr = arr.map(item=>`<li>${item}</li>`)
// console.log(newarr)

export default App
