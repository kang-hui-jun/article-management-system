import React, { Component } from 'react'

export default class Todolist extends Component {

    state = {
        datalist:["111","2222","333"],
        mytext:""
    }

    render() {
        return (
            <div>
                {/* <input type="text" ref="mytext"/> */}
                {
                    /* onChange  获取每次输入框value值得改变 */
                }
                <input type="text" value={this.state.mytext} onChange={(evt)=>{
                    // console.log(evt.target.value)
                    //同步这个value跟 我自己定义得状态mytext
                    this.setState({
                        mytext:evt.target.value
                    })
                }}/>
                <button onClick={this.handleAdd}>add</button>
                <ul>
                    {
                        this.state.datalist.map((item,index)=>
                        <li key={item}>
                            {item}
                            <button onClick={()=>this.handleDelClick(index)}>delete</button>
                        </li>    
                        )
                    }
                </ul>
            </div>
        )
    }
    //删除
    handleDelClick = (index)=>{
        // console.log("deleclick",index)    
        // this.state.datalist.splice(index,1) // 直接修改状态是不允许的
    
        //datalist 复制一份， 修改 新的datalist
        // let newlist = this.state.datalist // 引用赋值， 浅赋值

        // concat ,slice ,[...] 适合
        // let newlist = this.state.datalist.slice()
        let newlist = [...this.state.datalist]
        newlist.splice(index,1)

        this.setState({
            datalist:newlist
        })

        //小程序 {{ myname }}  this.setData({myname:"kerwin"})

    }

    handleAdd = ()=>{
        // console.log(this.refs.mytext.value)
        // console.log(this.state.mytext)

        // this.state.datalist.push(this.state.mytext)  // 直接修改状态是不允许的
        
        this.setState({
            datalist:[...this.state.datalist,this.state.mytext],
            mytext:"" //清空
        })
    }    
}
