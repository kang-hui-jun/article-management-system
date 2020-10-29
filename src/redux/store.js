import {createStore,applyMiddleware,combineReducers,compose} from 'redux' //createStore 方法创建一个store对象
import reduxThunk from 'redux-thunk'
import reduxPromsie from 'redux-promise'
import roleListReducer from './reducers/roleListReducer'
import rightListReducer from './reducers/rightListReducer'
import collapsedReducer from './reducers/collapsedReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//创建一个reducer,“修改状态” (接收老状态，修改的值， 深复制之后， 再返回一个新的状态)
//合并子 reducer
const persistConfig = {
    key: 'kerwinroot',
    storage, //localStorage
  }
  

const reducer = combineReducers({
    isCollapsed:collapsedReducer,
    roleList:roleListReducer,
    rightList:rightListReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)

/*
    reducer保证是纯函数 --函数式

    //1. 对外界没有副作用的函数
    //2. 同样的输入，得到同样的输出

    不是纯函数
    //var myname ="kerwin"
    // function test(){
    //     myname="xiaoming"
    // }
    // test()

    //纯函数
    // var myname ="kerwin"
    // function test(myname){
    //     myname="xiaoming"
    // }
    // test(myname)

    //不纯
    var obj = {myname:"kerwin"}
    function test(obj){
        obj.myname = "xiaoming"
    }
    test(obj)

    //纯
    var obj = {myname:"kerwin"}
    function test(obj){
        var newobj = {...obj}
        newobj.myname = "xiaoming"
    }
    test(obj)
*/

// store,只能接受一个reducer
// app开发 只能有一个store
// 轮船运火车 （reducer拆开一个个， 每个reducer一个文件， combineReducce(合并所有reducer)）

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer,composeEnhancers(applyMiddleware(reduxThunk,reduxPromsie)))
const myPersistStore =persistStore(store) //持久化的store 


// 默认 action 只能是普通对象 {type:""}
// 创建store，顺便应用中间件thunk,如果action 是函数，我来处理
// 创建store，顺便应用中间件redux-promise,如果action 是promise，我来处理

export {
    store,
    myPersistStore
}