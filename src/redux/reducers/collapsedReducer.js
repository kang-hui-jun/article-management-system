const collapsedReducer = (prevState=false,action)=>{
    // console.log(action)
    // “修改状态”
    let {type,payload} = action
    switch(type){
        case "MySideMenuCollapsed":
            return payload
        default:
            return prevState
    }

}// 只要状态已返回， 自动同步了
export default collapsedReducer