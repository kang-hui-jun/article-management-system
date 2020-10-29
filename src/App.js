import React, { Component } from 'react';
import './App.css';
import BlogRouter from './router'
// import { NavLink } from 'react-router-dom'
import {Provider} from 'react-redux'
import {store,myPersistStore} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={myPersistStore}>
          <BlogRouter/>
        </PersistGate>
      </Provider> 
    )
  }
}
/*
  context 跨层级的通信
*/

export default App;
