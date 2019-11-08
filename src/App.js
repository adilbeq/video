import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import useGlobal from './store';
import Login from './components/Login';
import Header from './components/Header';
import Stores from './components/Stores';
import StoreDetails from './components/StoreDetails';
import Videos from './components/Videos';
import VideoDetails from './components/VideoDetails';

import './App.css';

const App = () => {
  const [globalState, globalActions] = useGlobal();
	const [state, setState] = useState({
    login: false
	});

  return (
    <Router>
      <React.Fragment>
        {globalState.login === true ? (
          <div className="main-app">
            <Header />
            
            <Route exact path="/" component={Stores} />
            <Route exact path="/stores/:id" component={StoreDetails} />
            <Route exact path="/videos" component={Videos} />
            <Route exact path="/videos/:id" component={VideoDetails} />
          </div>
        ) : (
          <Login />
        )}
      </React.Fragment>
  </Router>
  );
}

export default App;
