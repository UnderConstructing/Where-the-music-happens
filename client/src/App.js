import React, { useEffect, useState } from 'react';

import './App.css'
import Sequencer from './sequencer'
import Hi from './attempt'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Register from './register';
import Login from './Login'
import Grid from './Grid'
import axios from 'axios'
import AuthContext from './utils/Context/AuthContext'
import Profile from './profilePage';
import Idea from './Idea'
import Tones from './Tones'


export default function App() {
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    axios.get('/api/getuser')
      .then(res => setAuth(res.data)
      )
  }, [])
  return (
    <AuthContext.Provider value={{ user: auth }}>
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">About</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
            <Switch>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/">
              <Tones />
              </Route>
              <Route exact path="/registeruser">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              {(auth) &&
                <Route exact path={"/dashboard/:user"}
                  component={Sequencer}>
                </Route>
              }
              <Route exact path={'/grid'}>
                <Grid />
              </Route>
            </Switch>

          </div>
        </Router>

      </div>
    </AuthContext.Provider>
  )
}