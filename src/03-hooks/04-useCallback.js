import React,{useState,useCallback} from 'react'

export default function App() {
    const [text, settext] = useState("111111")
    const test = useCallback(
        () => {
            console.log(text)
        },
        [text]
    ) //闭包 ，缓存函数，提高性能
    test()
    return (
        <div>
            app-{text}
            <button onClick={()=>{
                settext("222222")
            }}>click</button>
        </div>
    )
}
