import React from 'react';
import kickArray from './kick.json';
import snareArray from './snare.json';
import * as Tone from 'tone';
import { isNote, MembraneSynth } from 'tone';
import melodyArray from './melody.json'
import './App.css'
import Sequencer from './sequencer'
import Hi from './attempt'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Register from './register';
import Login from './Login'
import PrivateRoute from './PrivateRoute'


export default function App() {
  return (
    <div>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/">
              <Sequencer />
            </Route>
            <Route exact path="/hi">
              <Hi />
            </Route>
            <Route exact path="/registeruser">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  )
}