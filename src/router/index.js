// just Component  万物皆是组件 ， 把所有路由模块，重定向都做成了组件
// react-router-dom  4，5 版本写法一致
import {
  HashRouter as Router, // 路由外层需要包裹的组件
  Route, //每个路由组件都需要此组件
  Redirect,
  Switch, // 匹配到第一个符合条件路径的组件， 就停止
} from "react-router-dom";
import React from "react";
import Login from "../views/login/Login";
import DashBoard from "../views/dashboard/DashBoard";
// class BlogRouter extends Component {

// }
// 函数式组件
const BlogRouter = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      {/* {
                localStorage.getItem("isLogin")==="true"?
                <Route path="/" component={DashBoard}/>
                :
                <Redirect to="/login"/>
            } */}

      <Route
        path="/"
        render={() =>
          sessionStorage.getItem("isLogin") === "true" ? (
            <DashBoard></DashBoard>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </Switch>
  </Router>
);
export default BlogRouter;
//vue =>beforeEach  路由拦截？？？？

// vue mode => hash, history(后台配置)
// react ,HashRouter,  BrowserRouter(后台配置)
