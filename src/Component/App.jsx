import React, {Component} from 'react'
import {Route, BrowserRouter} from "react-router-dom"

import Login from "./Login"
import Header from "./header"
import register from "./register"

class app extends Component{

render(){

    return(
        <BrowserRouter>
        <Header/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={register}/>
        </BrowserRouter>
    )
}

}

export default app


