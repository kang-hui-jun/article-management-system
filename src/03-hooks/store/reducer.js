// redux 的reducer一个函数 ，纯函数设计
const reducer = (prevstate,action)=>{
    let {type,payload} = action
    // console.log(action)
    switch(type){
        case "Change_text":
            //深复制老状态，返回新状态
            // prevstate.text
            // var newstate = {...prevstate}

            return {
                ...prevstate,
                text:payload
            } // immutable
        case "Change_list":
            return {
                ...prevstate,
                list:payload
            }
    }
    return prevstate
}

export default reducer