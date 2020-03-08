import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./UpcomingGames.module.css";
import * as actions from "../../store/actions/index";
import Header from "../Header/Header";
import NavBar from "../../components/UI/Navigation/NavBar/NavBar";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import ScheduledGameItem from "../../components/GameItems/ScheduledGameItem/ScheduledGameItem";

class UpcomingGames extends Component {

  async componentDidMount() {

    if (localStorage.getItem("sellswordToken")) {
      await this.props.onInitLoggedIn();
    }

    await this.props.onInit(this.props.userId, "upcoming");
  }

  render() {

    const modal = (

      <Modal modalClosed={this.props.onResetPosted}>
        <div className={classes.Notification}>
          Congratulations! <strong>{this.props.inputGame}</strong> game session
          was successfully posted!
        </div>
      </Modal>
    );

    const spinner = <div className={classes.Spinner}><Spinner /></div>;

    const games = this.props.upcomingGames

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

    if (this.props.upcomingGames.length === 0)
      gameList = <p className={classes.NoGames}>You don't have any upcoming games...</p>;

    return (

      <>
        <Header />
        <NavBar />
        {this.props.gamePosted ? modal : null}
        <div className={classes.UpcomingGames}>
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
    gamePosted: state.hostGame.posted,
    inputGame: state.hostGame.inputGame,
    loading: state.scheduledGames.loading,
    upcomingGames: state.scheduledGames.scheduledGames
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onInitLoggedIn: () => dispatch(actions.initLoggedIn()),
    onResetPosted: () => dispatch(actions.resetPosted()),
    onInit: (userId, pastOrUpcoming) => dispatch(actions.getScheduledGames(userId, pastOrUpcoming))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingGames);
