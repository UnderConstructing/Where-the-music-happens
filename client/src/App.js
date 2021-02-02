import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import API from './utils/API'
import AuthContext from './utils/Context/AuthContext';
import HeaderSection from './HeaderSection';
import Footer from './Footer';
import ExampleModal from './ExampleModal';

import Sequencer from './pages/sequencer';
import Register from './pages/register';
import Grid from './pages/Grid';
import Login from './pages/Login';
import Profile from './pages/profilePage';
import MainBody from './pages/MainBody';
import FourOhFour from './pages/FourOhFour'



export default function App() {
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    API.getUsers()
      .then(res => {
        setAuth(res.data);
        console.log(auth)
      })
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
              <Route path={"/dashboard"} component={Sequencer} />
              {(auth) &&
                <Route path={"/dashboard"} component={Sequencer} />
              }
              <Route exact path="/" component={MainBody} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/registeruser" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path={'/grid'} component={Grid} />
              <Route component={FourOhFour} />
            </Switch>


          </div>
        </Router>
      </div>
    </AuthContext.Provider>
  )
}