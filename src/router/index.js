import  React, { Component } from 'react'

import { 
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import Admin from '../Admin'

import App from '../App'

import Login from '../component/pages/Login'

// import User from '../component/pages/User'

import Home from '../component/pages/Home'

import News from '../component/pages/News'

import Scole from '../component/pages/Scole'


export default class extends Component {

    render () {
        return (
          <Router>              
            <App>
              <Switch>
                <Route path = "/login" component = {Login} />
                <Route path = "/" render = {() => (
                  <Router>
                    <Admin>
                      <Switch>
                        <Route exact path = "/" component = { Home } />
                        {/* <Route path = "/user" component = { User } /> */}
                        <Route path = "/news" component = { News } />
                        <Route path = "/scole" component = { Scole } />
                      </Switch>
                    </Admin>
                  </Router>  
                ) } />
              </Switch>
            </App>
          </Router>
        )
    }

}