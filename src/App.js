// Importing ES6 class based modules
import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import NotFound from './components/pages/NotFound';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';

// Main Component also known as APP or root level component
const App = () => {

  return (
    <GithubState>
      <AlertState>
        {/* BrowserRouter alised as Router is used to wrap the whole React APP so as to enable routing of different react components. Note:- Comments are tagged different here because it is JSX  (JavaScript XML or JavaScript eXtension syntax */}
        <Router>

          <div className="App">

            {/* User defined React component "Navbar" which is to be rendered*/}
            <Navbar/>
            <div className="container">

            {/* User defined component "Alert". Note:- APP level state "alert" is passed as props with name "alert"*/}
            <Alert />
            
            {/* Switch enables routing of components */}
            <Switch>
              {/* Routing Home page */}
              <Route exact path='/' component={Home} />

              {/* Routing About page */}
              <Route exact path='/about' component={About} />

              {/* Routing user profile details page */}
              <Route exact path='/user/:login' component={User} />
              
              {/* Routing Not Found page */}
              <Route exact path='' component={NotFound} />
            </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;