import React from 'react'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Demoterm from './pages/Demoterm'
import Democam from './pages/Democam'
import Demoaws from './pages/Demoaws'
import Getstarted from './pages/Getstarted'
import Terms from './pages/Terms'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <React.Fragment>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/demoaws">
            <Demoaws />
          </Route>
          <Route path="/democam">
            <Democam />
          </Route>
          <Route path="/demoterm">
            <Demoterm />
          </Route>
          <Route path="/demo">
            <Demo />
          </Route>
          <Route path="/getstarted">
            <Getstarted />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
