import React, { Component } from 'react'

class App extends Component {
    render() {
        return (
            <div>
                {/* react 没有指令 v-model  */}
                {/* react 通过ref拿value */}
                <input type="text" ref="mytext"/>
                <button onClick={ ()=>{
                    console.log("onclick1111",this.refs.mytext.value)
                } }>add1</button>

                <button onClick={ this.handleAdd2.bind(this,"aaaa","bbb") }>add2</button>

                <button onClick ={ this.handleAdd3 }>add3</button>


                <button onClick ={ ()=>this.handleAdd3("aaaa","bbbbb") }>add4</button>
            </div>
        )
    }

    handleAdd2(x,y){
        console.log(x,y)
        console.log("onclick22222",this.refs.mytext.value)
    }

    handleAdd3 = ()=> {
        // console.log(x,y)
        console.log("onclick22222",this.refs.mytext.value)
    }
}

// var odiv = document.getElementById("aaa")
// odiv.onclick = function(){
//     console.log(this)
// }

// class Test{
//     aaa(){
//         this.bbb()
//     }

//     bbb(){

//     }
// }

/*
    js 改变this指向
    bind call apply
*/

var obj1= {
    name:"obj1",
    getName(){
        console.log(this.name)
    }
}

var obj2= {
    name:"obj2",
    getName(){
        console.log(this.name)
    }
}
// obj1.getName() //obj1
// obj1.getName.call(obj2,"aaa","bbb","ccc") //obj2 改变this指向，立即执行方法
// obj1.getName.apply(obj2,["aaa","bbbbb","cccc"])  // obj2 改变this指向，立即执行方法(
// obj1.getName.bind(obj2,"aaa","bbbb","ccc")() // 改变this指向 ，手动执行方法


class Test{
    // constructor(){
    //     //super 没有继承
    //     this.name="kerwin"
    //     this.age=100
    // } //抄袭java 

    name = "kerwin"
    age= 100

    getName = ()=>{
        console.log(this.name)
    }
}

var obj = new Test()
obj.getName()


export default App