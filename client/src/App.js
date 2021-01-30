import React, { useEffect, useState } from 'react';

import './App.css';
import Sequencer from './sequencer';
import Hi from './attempt';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Register from './register';
import Login from './Login';
import Grid from './Grid';
import axios from 'axios';
import AuthContext from './utils/Context/AuthContext';
import Profile from './profilePage';
import HeaderSection from './HeaderSection';
import MainBody from './MainBody';
import Footer from './Footer';


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
   <HeaderSection/>
        <MainBody/>
            <Footer/>
      </div>
    </AuthContext.Provider>
  )
}