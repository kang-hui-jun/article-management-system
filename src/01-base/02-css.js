import React,{Component} from 'react'
import './css/index.css' // css-loader
class App extends Component{
    render(){
        var myname ="kerwin" //不是状态， 临时变量，

        var styleobj = {
            background:"red",
            fontSize:"30px"
        }
        return <div>
            { 10+20 }--{myname}
            { 10>20?'aaa':'bbb' }
            
            {
                //单行注释
                /*多行注释*/
            }
            {/* dwdwadwada */}
            <div style={styleobj}>11111111</div>
            <div style={ {background:"yellow"} }>22222222</div>
            <div className="active">3333333333333333333</div>
            <div id="box">555555555555555555</div>
        </div>
    }
}

/*
 16 版本 之前  class不支持 ，必须写成className 

 16 版本 之后  class 支持， 但是会报警告， className
*/

export default App