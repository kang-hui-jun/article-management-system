import React,{useReducer,useContext} from 'react'
import GlobalContext from './store'
import reducer from './store/reducer'
import axios from 'axios'
const Child1 =()=>{
    let {state,dispatch} = useContext(GlobalContext) //不需要GlobalContext.Consumer
    return <div>
        child1-{state.text}<button onClick={()=>{
            dispatch({
                type:"Change_text",
                payload:"child11111111111"
            })
        }}>click</button>
    </div>
}

const Child2 =()=>{
    let {state,dispatch} = useContext(GlobalContext)
    return <div>
        child2-{state.text} -<button onClick={()=>{
            axios.get("/rights").then(res=>{
                // console.log(res.data)
                dispatch({
                    type:"Change_list",
                    payload:res.data
                })
            })
        }}>异步数据</button>

        {
            state.list.map(item=>
            <li key={item.id}>{item.title}</li>    
            )
        }
    </div>
}

const App = ()=>{

    // state ,dispatch  ,redux用的createStore(reducer)
    const [state,dispatch] = useReducer(reducer,{
        isShow:true,
        list:[],
        text:"我是公共的状态"
    }) // [公共的状态，改变公共状态的方法]
    // console.log(arr)
    return <GlobalContext.Provider value={{
        state,
        dispatch, //对象简写
        a:1
    }}>
        <Child1/>
        <Child2/>
    </GlobalContext.Provider>
}

export default App