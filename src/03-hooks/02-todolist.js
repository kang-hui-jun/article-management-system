import React,{useState,useRef} from 'react'

function Todolist() {
    const [text, settext] = useState("") 
    const [list,setList] = useState(["1111","2222","3333"])
    
    const mytext = useRef(null) 

    const handleDelClick = (index)=>{
        // console.log(index)
        var newlist= [...list]
        newlist.splice(index,1)
        setList(newlist)
    }
    // axios.get() 不对的
    console.log("111111111111")

    return (
        <div>
            <input type="text" onChange={(ev)=>{
                settext(ev.target.value)
            }} ref={mytext} value={text}/>
            <button onClick={()=>{
                // console.log(text)
                // console.log(mytext.current.value) //ref
                setList([...list,text]) //添加数组
                // mytext.current.value = ""

                settext("") //情况输入框value
            }}>add</button>     
            {
                list.map((item,index)=>
                    <li key={item}>{item}
                        <button onClick={()=>handleDelClick(index)}>del</button>
                    </li>    
                )
            }   
        </div>
    )
}
export default Todolist