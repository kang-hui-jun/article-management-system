import {observable} from 'mobx'
// 1.box方法 只能观察 简单数据类型
// const store = observable.box(true)

// 2. map方法 观察复杂数据类型。

const store = observable.map({
    isShow:true,
    list:[],
    roleList:[],
    rightList:[]
})
export default store