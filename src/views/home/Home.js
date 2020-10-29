import React, { Component } from 'react'
// import Axios from 'axios'
// import {observable,autorun} from 'mobx'

// const store =observable.box(true) //可观察的对象
// //注册
// autorun(()=>{
//     console.log(store.get())
// })

// setTimeout(()=>{
//     store.set(false)
// },2000)

// setTimeout(()=>{
//     store.set(true)
// },10000)

export default class Home extends Component {
    render() {
        return (
            <div>
                Home
            </div>
        )
    }

    componentDidMount() {
        // Axios.get("/ajax/mostExpected?ci=10&limit=10&offset=0&token=&optimus_uuid=43388C403C4911EABDC9998C784A573A4F64A16AA5A34184BADE807E506D749E&optimus_risk_level=71&optimus_code=10").then(res=>{
        //     console.log(res.data)
        // })
    }
    
}
