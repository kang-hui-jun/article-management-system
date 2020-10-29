import React, { Component } from 'react'

class List extends Component{

    // componentWillMount() {
    //     console.log("发ajax",this.props.id)
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log("发ajax",nextProps.id)
    // }
    state = {
        myid:""
    }
    
    static getDerivedStateFromProps(nextProps){
        console.log("拿到这个最新的属性",nextProps.id)
        // axios/
        return {
            myid:nextProps.id
        }
    }

    render(){
        return <div>
            {this.props.id}
        </div>
    }

    componentDidUpdate(){
        console.log("发ajax",this.state.myid)
    }
}

export default class App extends Component {
    state = {
        id:0
    }
    render() {
        return (
            <div>
                <ul>
                    <li onClick={()=>{
                        this.setState({
                            id:0
                        })
                    }}>衣服</li>
                    <li onClick={()=>{
                        this.setState({
                            id:1
                        })
                    }}>帽子</li>
                    <li onClick={()=>{
                        this.setState({
                            id:2
                        })
                    }}>裤子</li>
                </ul>
                <List id={this.state.id}></List>
            </div>
        )
    }
}
