import {fromJS} from 'immutable'
const rightListReducer = (prevState=[],action)=>{
    // console.log(prevState)
    // “修改状态”
    let {type,payload} = action
    switch(type){
    
        case "SetRightList":
            var newstate = fromJS(prevState)
            //newState.setIn("")
            return newstate.concat(payload).toJS()
        default:
            return prevState
    }

}// 只要状态已返回， 自动同步了
export default rightListReducer
