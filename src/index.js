import React from "react"; // React 核心库
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
// antd样式
import "antd/dist/antd.css";
//-----------配置baseUrl--------------------

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "http://127.0.0.1:8000";
//----------------------------------

// ReactDOM.render("根组件"，"节点”)
// new Vue({}).$mount("#root")
//jsx ===> js + xml
ReactDOM.render(<App />, document.getElementById("root"));

/*
 只要使用jsx, 必须引入React 
 babel ==>  React.createElement("div","hello react")

*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
