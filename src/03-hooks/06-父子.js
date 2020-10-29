// 父子通信 ，靠属性
// 父->子 ， 属性
// 子->父 ， callback( 属性传过去一个回调函数)

import React,{useState} from 'react'

const Navbar = (props)=>{
    console.log(props)
    return <div>
        navbar-{props.myname}
        <button onClick={()=>{
            props.onEvent()
        }}>click</button>
    </div>
}

const Sidebar = ()=>{
    return <div>
        Sidebar
        <ul>
            <li>111111</li>
            <li>222222</li>
            <li>333333</li>
        </ul>
    </div>
}

const Child = (props)=>{
    return <div>
        child --{props.children}
    </div>
}

export default function App() {
    const [show, setshow] = useState(false)
    return (
        <div>
            <Navbar myname="测试的抽屉" onEvent={()=>{
                console.log("父组件中调用")
                setshow(!show)
            }}/>
            {
                show?
                <Sidebar/>
                :null
            }

            <Child>
                <div>child-11111111</div>
                <div>child-22222222</div>
            </Child>
        </div>
    )
}
