import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css'

import API from './utils/API'
import AuthContext from './utils/Context/AuthContext';
import HeaderSection from './HeaderSection';
import Footer from './Footer';
import ExampleModal from './pages/ExampleModal';

import Sequencer from './pages/sequencer';
import Register from './pages/register';
import About from './pages/About'
import Login from './pages/Login';
import Profile from './pages/profilePage';
import MainBody from './pages/MainBody';
import FourOhFour from './pages/FourOhFour'
import SequencerContext from './utils/Context/SequencerContext';



export default function App() {
  const [auth, setAuth] = useState(null)
  const [value, setValue] = useState(1)
  useEffect(() => {
    API.getUsers()
      .then(res => {
        setAuth(res.data);
        console.log(auth)
      })
  }, [value])

  return (
    <AuthContext.Provider value={{ user: auth }}>
      <div>
        <Router>
          <HeaderSection />
            <Switch>
              {(auth) &&
                <Route path={`/dashboard/${auth.username}/new`} component={Sequencer} />
              }
              {(auth) &&
                <Route path={`/dashboard/${auth.username}/${SequencerContext.sequencerIndex}`} component={Sequencer} />
              }

              <Route exact path="/" component={MainBody} />
              {(auth) &&
              <Route exact path={`/profile/${auth.username}`} component={Profile} />
              }
              <Route exact path="/registeruser" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path={'/about'} component={About} />
              {(!auth) &&
              <Route component={FourOhFour} />
            }
            </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  )
}