import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./PastGames.module.css";
import * as actions from "../../store/actions/index";
import Header from "../Header/Header";
import NavBar from "../../components/UI/Navigation/NavBar/NavBar";
import Spinner from "../../components/UI/Spinner/Spinner";
import ScheduledGameItem from "../../components/GameItems/ScheduledGameItem/ScheduledGameItem";

class PastGames extends Component {

  async componentDidMount() {

    if (localStorage.getItem("sellswordToken")) {
      await this.props.onInitLoggedIn();
    }

    await this.props.onInit(this.props.userId, "past");
  }

  render() {

    const spinner = <div className={classes.Spinner}><Spinner /></div>;

    const games = this.props.pastGames

      .map((game, idx) => {
        return <ScheduledGameItem key={idx} game={game} />;
      });

    let gameList = (

      <>
        <h4>Click on a game session to expand details.</h4>
        <div className={classes.GameList}>
          <ul>
            {games}
          </ul>
        </div>
      </>
    );

    if (this.props.pastGames.length === 0)
      gameList = <p className={classes.NoGames}>You don't have any past games...</p>;

    return (

      <>
        <Header />
        <NavBar />
        <div className={classes.PastGames}>
          {this.props.loading ? spinner : gameList}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {

  return {
    userId: state.auth.userId,
    displayName: state.auth.displayName,
    isLoggedIn: state.auth.token !== null,
    loading: state.scheduledGames.loading,
    pastGames: state.scheduledGames.scheduledGames
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onInitLoggedIn: () => dispatch(actions.initLoggedIn()),
    onInit: (userId, pastOrUpcoming) => dispatch(actions.getScheduledGames(userId, pastOrUpcoming))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PastGames);
