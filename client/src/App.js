import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css'
import API from './utils/API'
import AuthContext from './utils/Context/AuthContext';
import HeaderSection from './HeaderSection';
import SavedSequencer from './pages/SavedSequence'
import Sequencer from './pages/sequencer';
import Register from './pages/register';
import About from './pages/About'
import Login from './pages/Login';
import Profile from './pages/profilePage';
import MainBody from './pages/MainBody';
import FourOhFour from './pages/FourOhFour'
import Tutorial from './pages/Tutorial'
import Confirm from  './pages/Confirm'



export default function App() {
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    console.log("show me my user")
    API.getUsers()
      .then(res => {
        setAuth(res.data);
        localStorage.setItem('user', JSON.stringify(res.data))
      })
  }, [])

  return (
    <AuthContext.Provider value={{ user: auth }}>
      <div>  
        <Router>
          <HeaderSection />
            <Switch>
              {(auth) &&
                <Route path={`/dashboard/${auth.username}/received/:sequencerindex`} component={SavedSequencer} />
              }
              {(auth) &&
                <Route path={`/dashboard/${auth.username}/:sequencerindex`} component={Sequencer} />
              }
              <Route exact path="/" component={MainBody} />
              {(auth) &&
              <Route exact path={`/profile/${auth.username}`} component={Profile} />
              }
              <Route exact path="/registeruser" component={Register} />
              <Route exact path="/confirmation" component={Confirm} />
              <Route exact path="/login" component={Login} />
              <Route exact path={'/about'} component={About} />
              {(!auth) &&
              <Route component={FourOhFour} />
              }
              <Route exact path={`/tutorial`} component={Tutorial} />
            </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  )
}