import React, { Component } from 'react'
import { Route,Switch } from "react-router-dom";
import Class from '../components/clases.js'
export default class dashboardRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/student" render={(props)=><Class {...props}/>}/>
                
            </Switch>
        )
    }
}
