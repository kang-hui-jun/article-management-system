import React ,{useState,useEffect} from 'react'

const Child = ()=>{

    useEffect(()=>{
        console.log("创建")
        var id = setInterval(()=>{
            console.log("111")
        },1000)
        return ()=>{
            clearInterval(id)
            console.log("销毁")
        }
    },[])

    return <div>
        child
    </div>
}


const App = ()=>{
    //useEffect（处理函数，[依赖]） 副作用
    const [text, settext] = useState("1111111")
    const [age, setage] = useState(100)
    // useEffect(()=>{
    //     console.log("创建或者更新")
    //     // window.onscroll =null
    // },[text])

    //传空数组， 相当于 cdm？？
    //[text] .只有text改变的时候，才会执行一次
    //第二个参数不传 表示任何状态改变，都会重新执行
    return <div>
        app--{text}<button onClick={()=>{
            settext("2222222")
        }}>click-text</button>
        <br/>
        {age}
        <button onClick={()=>{
            setage(18)
        }}>click-age</button>
        {
            age===100?
            <Child/>
            :null
        }
    </div>
}

export default App