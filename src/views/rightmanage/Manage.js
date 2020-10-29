import React, { Component } from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default class Manage extends Component {
    callback = (data)=>{
        // console.log(this.props)
        this.props.history.push(data)
    }
    render() {
        // console.log()

        return (
            <div>
               <Tabs activeKey={this.props.location.pathname} onChange={this.callback}>
                    <TabPane tab="角色列表" key="/right-manage/roles">
                    {/* {this.props.children} */}
                    </TabPane>
                    <TabPane tab="权限列表" key="/right-manage/rights">
                    
                    </TabPane>
                </Tabs>
                {/* <Route path="/right-manage/roles" component= {Role}/>
                <Route path="/right-manage/rights" component= {Right}/> */}
                
                {this.props.children}
                
            </div>
        )
    }
}
