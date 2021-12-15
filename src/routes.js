import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

//Pages
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import ComingSoon from './pages/ComingSoon'
import Charts from './pages/Charts'
import DataTable from './pages/DataTable'

class Routes extends React.Component {
  constructor () {
    super()
    if (window.localStorage.getItem('authorized') != "true" && window.location.pathname!='/') {
      window.location.replace('/')
    }
  }
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/data/table' component={DataTable} />
          {/* <Route path="/signup" component={SignUp} /> */}
          {/* <Route path="/cards" component={Cards} /> */}
          <Route path='/charts' component={Charts} />
          <Route path='/comingsoon' component={ComingSoon} />
          <Route path='*' component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes
