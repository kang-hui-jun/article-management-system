// rcc => react class component
// rfc => react functional component
import React,{useState} from 'react'
//react hooks 让函数式组件 支持状态。

function App() {
    //不支持状态
    const [name,setName] = useState("kerwin") //初始值 [状态，改变状态的方法]
    const [age,setAge] = useState(100)
    return (
        <div>
            app -{name}-{age}
            <button onClick={()=>{
                setName("xiaoming")
                setAge(18)
            }}>click</button>
        </div>
    )
}
export default App
