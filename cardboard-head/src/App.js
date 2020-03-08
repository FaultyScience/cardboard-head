import React, {Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import './App.css';
import Home from "./containers/Home/Home";
import UserProfile from "./containers/UserProfile/UserProfile";
import HostGame from "./containers/HostGame/HostGame";
import UpcomingGames from "./containers/UpcomingGames/UpcomingGames";
import PastGames from "./containers/PastGames/PastGames";

class App extends Component {

  render() {

    return (

      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/host-game" component={HostGame} />
          <Route path="/upcoming-games" component={UpcomingGames} />
          <Route path="/past-games" component={PastGames} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
