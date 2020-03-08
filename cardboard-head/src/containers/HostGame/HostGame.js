import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./HostGame.module.css";
import * as actions from "../../store/actions/index";
import Header from "../Header/Header";
import NavBar from "../../components/UI/Navigation/NavBar/NavBar";
import MiniSpinner from "../../components/UI/MiniSpinner/MiniSpinner";
import { isLeapYear } from "../../resources/utils";
import statesObj from "../../resources/states.json";
import monthsObj from "../../resources/months.json";
import timesObj from "../../resources/times.json";

class HostGame extends Component {

  async componentDidMount() {

    if (localStorage.getItem("sellswordToken")) {
      await this.props.onInitLoggedIn();
    }
  }

  gameRef = React.createRef();
  monthRef = React.createRef();
  dayRef = React.createRef();
  yearRef = React.createRef();
  timeRef = React.createRef();
  totalPlayersRef = React.createRef();
  openSpotsRef = React.createRef();
  settingRef = React.createRef();
  platformRef = React.createRef();
  serverRef = React.createRef();
  serverPasswordRef = React.createRef();
  discordLinkRef = React.createRef();
  cityRef = React.createRef();
  stateRef = React.createRef();
  addressRef = React.createRef();

  render() {

    if (this.props.posted)
      return <Redirect to="/upcoming-games" />;

    const miniSpinner = (

      <div className={classes.MiniSpinner}>
        <MiniSpinner />
      </div>
    );

    const now = new Date();
    const thisYear = now.getFullYear().toString();
    const nextYear = (now.getFullYear() + 1).toString();

    const buttonText = this.props.posting ? miniSpinner : "Post!";
    const postBtnClass = this.props.posting ? classes.Posting : classes.PostButton;
    const postBtnWrapperClass = this.props.posting ? classes.PostingButtonWrapper : classes.PostButtonWrapper;

    const postErrorMsgGame = this.props.postErrorMsgTarget === "game" ? "Enter game" : "";
    const postErrorMsgMonth = this.props.postErrorMsgTarget === "month" ? "Enter month" : "";
    const postErrorMsgDay = this.props.postErrorMsgTarget === "day" ? "Enter day" : "";
    const postErrorMsgYear = this.props.postErrorMsgTarget === "year" ? "Enter year" : "";
    const postErrorMsgTime = this.props.postErrorMsgTarget === "time" ? "Enter time" : "";
    const postErrorMsgExpired = this.props.postErrorMsgTarget === "expired" ? "Date and time are in the past - please enter a future date and time" : "";
    const postErrorMsgTotalPlayers = this.props.postErrorMsgTarget === "totalPlayers" ? "Enter total players" : "";
    const postErrorMsgOpenSpots = this.props.postErrorMsgTarget === "openSpots" ? "Enter open spots" : "";
    const postErrorMsgPlatform = this.props.postErrorMsgTarget === "platform" ? "Enter platform" : "";
    const postErrorMsgServer = this.props.postErrorMsgTarget === "server" ? "Enter server name" : "";
    const postErrorMsgServerPassword = this.props.postErrorMsgTarget === "serverPassword" ? "Enter server password" : "";
    const postErrorMsgDiscordLink = this.props.postErrorMsgTarget === "discordLink" ? "Enter Discord link" : "";
    const postErrorMsgCity = this.props.postErrorMsgTarget === "city" ? "Enter city" : "";
    const postErrorMsgState = this.props.postErrorMsgTarget === "state" ? "Enter state" : "";
    const postErrorMsgAddress = this.props.postErrorMsgTarget === "address" ? "Enter street address" : "";

    const online = (

      <>
        <div className={classes.Platform}>
          <h4>
            Platform
            <span className={classes.Asterisk}>*</span>
            &nbsp;
            <span className={classes.Small}>
              <em>(e.g., "Tabletop Simulator", "Pandemic app on Steam", etc.)</em>
            </span>
          </h4>
          <p className={classes.ErrorMsg}>{postErrorMsgPlatform}</p>
          <input type="textbox"
                 ref={this.platformRef}
                 className={this.props.postErrorMsgTarget === "platform" ? classes.ErrorFocus : null}
                 value={this.props.inputPlatform}
                 onChange={this.props.onInputPlatformChanged}
          />
        </div>
        <hr className={classes.Line} />
        <div className={classes.Server}>
          <h4>
            Game Server
            <span className={classes.Asterisk}>*</span>
            &nbsp;
            <span className={classes.Small}>
              <em>(You can enter "N/A" in both fields if not applicable.)</em><br />
              <strong>Note:</strong> This will be hidden, and will only become
              visible to those participating in your game.
            </span>
          </h4>
          <div>
            <label>Server Name</label>
            <input type="textbox"
                   ref={this.serverRef}
                   className={this.props.postErrorMsgTarget === "server" ? classes.ErrorFocus : null}
                   value={this.props.inputServer}
                   onChange={this.props.onInputServerChanged}
            />
            <p className={classes.ErrorMsg}>{postErrorMsgServer}</p>
          </div>
          <div>
            <label>Server Password</label>
            <input type="textbox"
                   ref={this.serverPasswordRef}
                   className={this.props.postErrorMsgTarget === "serverPassword" ? classes.ErrorFocus : null}
                   value={this.props.inputServerPassword}
                   onChange={this.props.onInputServerPasswordChanged}
            />
            <p className={classes.ErrorMsg}>{postErrorMsgServerPassword}</p>
          </div>
        </div>
        <hr className={classes.Line} />
        <div className={classes.Discord}>
          <h4>
            Discord Server Link
            <span className={classes.Asterisk}>*</span>
            &nbsp;
            <span className={classes.Small}>
              <em>(You can enter "N/A" if not applicable.)</em><br />
              <strong>Note:</strong> This will be hidden, and will only become
              visible to those participating in your game.
            </span>
          </h4>
          <p className={classes.ErrorMsg}>{postErrorMsgDiscordLink}</p>
          <input type="textbox"
                 ref={this.discordLinkRef}
                 className={this.props.postErrorMsgTarget === "discordLink" ? classes.ErrorFocus : null}
                 value={this.props.inputDiscordLink}
                 onChange={this.props.onInputDiscordLinkChanged}
          />
        </div>
        <hr className={classes.Line} />
      </>
    );

    const states = Object.keys(statesObj)

      .map((stateKey) => {
        return <option key={stateKey} value={stateKey}>{statesObj[stateKey]}</option>;
      });

    const inPerson = (

      <>
        <div className={classes.Location}>
          <h4>
            Location
            <span className={classes.Asterisk}>*</span>
          </h4>
          <div>
            <label>
              Neighborhood
              &nbsp;
              <span className={classes.Small}>
                <em>(optional)</em>
              </span>
            </label>
            <input type="textbox"
                   value={this.props.inputNeighborhood}
                   onChange={this.props.onInputNeighborhoodChanged}
            />
            <p className={classes.ErrorMsg}></p>
          </div>
          <div>
            <label>City</label>
            <input type="textbox"
                   ref={this.cityRef}
                   className={this.props.postErrorMsgTarget === "city" ? classes.ErrorFocus : null}
                   value={this.props.inputCity}
                   onChange={this.props.onInputCityChanged}
            />
            <p className={classes.ErrorMsg}>{postErrorMsgCity}</p>
          </div>
          <div>
            <label>State / Province</label>
            <select name="state"
                    ref={this.stateRef}
                    className={this.props.postErrorMsgTarget === "state" ? classes.ErrorFocus : null}
                    value={this.props.inputState}
                    onChange={this.props.onInputStateChanged}
            >
              <option value="default">&#60;Select&#62;</option>
              {states}
            </select>
            <p className={classes.ErrorMsg}>{postErrorMsgState}</p>
          </div>
          <div>
            <label>Country</label>
            <select name="country"
                    value={this.props.inputCountry}
                    onChange={this.props.onInputCountryChanged}
            >
              <option value="us">United States</option>
              <option value="ca">Canada</option>
            </select>
            <p className={classes.ErrorMsg}></p>
          </div>
          <br />
          <div>
            <label>Street Address</label>
            <input type="textbox"
                   ref={this.addressRef}
                   className={this.props.postErrorMsgTarget === "address" ? classes.ErrorFocus : null}
                   value={this.props.inputAddress}
                   onChange={this.props.onInputAddressChanged}
            />
            <br />
            <span className={classes.Small}>
              <strong>Note:</strong> This will be hidden, and will only become
              visible to those participating in your game.
            </span>
            <p className={classes.ErrorMsg}>{postErrorMsgAddress}</p>
          </div>
          <br />
          <div>
            <label>
              Location Notes
              &nbsp;
              <span className={classes.Small}>
                <em>(optional)</em>
              </span>
            </label>
            <input type="textbox"
                   value={this.props.inputNotes}
                   onChange={this.props.onInputNotesChanged}
            />
            <br />
            <span className={classes.Small}>
              <strong>Note:</strong> This will be hidden, and will only become
              visible to those participating in your game.
            </span>
            <p className={classes.ErrorMsg}></p>
          </div>
        </div>
        <hr className={classes.Line} />
      </>
    );

    const months = Object.keys(monthsObj)

      .map((monthKey) => {
        return <option key={monthKey} value={monthKey}>{monthsObj[monthKey]}</option>;
      });

    let daysInMonth = 31;

    if (["3", "5", "8", "10"].includes(this.props.inputMonth))
      daysInMonth = 30;
    else if ((this.props.inputMonth === "1") && isLeapYear(Number(this.props.inputYear)))
      daysInMonth = 29;
    else if ((this.props.inputMonth === "1") && !isLeapYear(Number(this.props.inputYear)))
      daysInMonth = 28;

    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(<option key={String(i)} value={String(i)}>{i}</option>);
    }

    const times = Object.keys(timesObj)

      .map((timeKey) => {
        return <option key={timeKey} value={timeKey}>{timesObj[timeKey]}</option>;
      });

    const totalPlayers = [];

    for (let i = 2; i <= 20; i++) {
      totalPlayers.push(<option key={String(i)} value={String(i)}>{i}</option>);
    }

    const openSpots = [];

    for (let i = 1; i <= 20; i++) {
      openSpots.push(<option key={String(i)} value={String(i)}>{i}</option>);
    }

    const hostGame = (

      <div className={classes.HostGame}>
        <div className={classes.Game}>
          <h4>
            Game
            <span className={classes.Asterisk}>*</span>
            &nbsp;
            <span className={classes.Small}>
              <em>(e.g., "Risk", "Terraforming Mars", etc.)</em>
            </span>
          </h4>
          <p className={classes.ErrorMsg}>{postErrorMsgGame}</p>
          <input type="textbox"
                 ref={this.gameRef}
                 className={this.props.postErrorMsgTarget === "game" ? classes.ErrorFocus : null}
                 value={this.props.inputGame}
                 onChange={this.props.onInputGameChanged}
          />
        </div>
        <hr className={classes.Line} />
        <div className={classes.Date}>
          <h4>
            Date and Time
            <span className={classes.Asterisk}>*</span>
            &nbsp;
            <span className={classes.Small}>
              <em>(Enter your local time - all conversion is handled.)</em>
            </span>
          </h4>
          <p className={classes.ErrorMsg}>{postErrorMsgExpired}</p>
          <div>
            <label>Month</label>
            <select name="month"
                    ref={this.monthRef}
                    className={this.props.postErrorMsgTarget === "month" ? classes.ErrorFocus : null}
                    value={this.props.inputMonth}
                    onChange={this.props.onInputMonthChanged}
            >
              <option value="default">&#60;Select&#62;</option>
              {months}
            </select>
            <p className={classes.ErrorMsg}>{postErrorMsgMonth}</p>
          </div>
          <div>
            <label>Day</label>
            <select name="day"
                    ref={this.dayRef}
                    className={this.props.postErrorMsgTarget === "day" ? classes.ErrorFocus : null}
                    value={this.props.inputDay}
                    onChange={this.props.onInputDayChanged}
            >
              <option value="default">&#60;Select&#62;</option>
              {days}
            </select>
            <p className={classes.ErrorMsg}>{postErrorMsgDay}</p>
          </div>
          <div>
            <label>Year</label>
            <select name="year"
                    ref={this.yearRef}
                    className={this.props.postErrorMsgTarget === "year" ? classes.ErrorFocus : null}
                    value={this.props.inputYear}
                    onChange={this.props.onInputYearChanged}
            >
              <option value="default">&#60;Select&#62;</option>
              <option value={thisYear}>{thisYear}</option>
              <option value={nextYear}>{nextYear}</option>
            </select>
            <p className={classes.ErrorMsg}>{postErrorMsgYear}</p>
          </div>
          <div>
            <label>Start Time</label>
            <select name="time"
                    ref={this.timeRef}
                    className={this.props.postErrorMsgTarget === "time" ? classes.ErrorFocus : null}
                    value={this.props.inputTime}
                    onChange={this.props.onInputTimeChanged}
            >
              <option value="default">&#60;Select&#62;</option>
              {times}
            </select>
            <p className={classes.ErrorMsg}>{postErrorMsgTime}</p>
          </div>
        </div>
        <hr className={classes.Line} />
        <div className={classes.Players}>
          <h4>Number of Players<span className={classes.Asterisk}>*</span></h4>
          <div>
            <label>Total Players</label>
            <select name="total"
                    ref={this.totalPlayersRef}
                    className={this.props.postErrorMsgTarget === "totalPlayers" ? classes.ErrorFocus : null}
                    value={this.props.inputTotalPlayers}
                    onChange={this.props.onInputTotalPlayersChanged}
            >
              <option value="default">&#60;Select&#62;</option>
              {totalPlayers}
            </select>
            <p className={classes.ErrorMsg}>{postErrorMsgTotalPlayers}</p>
          </div>
          <div>
            <label>Open Spots</label>
            <select name="open"
                    ref={this.openSpotsRef}
                    className={this.props.postErrorMsgTarget === "openSpots" ? classes.ErrorFocus : null}
                    value={this.props.inputOpenSpots}
                    onChange={this.props.onInputOpenSpotsChanged}
            >
              <option value="default">&#60;Select&#62;</option>
              {openSpots}
            </select>
            <p className={classes.ErrorMsg}>{postErrorMsgOpenSpots}</p>
          </div>
        </div>
        <hr className={classes.Line} />
        <div className={classes.Setting}>
          <h4>Setting<span className={classes.Asterisk}>*</span></h4>
          <div>
            <input type="radio"
                   id="online"
                   name="setting"
                   ref={this.settingRef}
                   value="online"
                   onChange={this.props.onInputSettingChanged}
                   defaultChecked={this.props.inputSetting === "online"}
            />
            <label htmlFor="online">
              <strong>Online</strong>
            </label>
          </div>
          <div>
            <input type="radio"
                   id="in-person"
                   name="setting"
                   value="in-person"
                   onChange={this.props.onInputSettingChanged}
                   defaultChecked={this.props.inputSetting === "in-person"}
            />
            <label htmlFor="in-person">
              <strong>In-Person</strong>
            </label>
          </div>
        </div>
        <hr className={classes.Line} />
        {this.props.inputSetting === "online" ? online : inPerson}
        <div className={classes.Length}>
          <h4>Approximate Game Length</h4>
          <select name="length"
                  value={this.props.inputLength}
                  onChange={this.props.onInputLengthChanged}
          >
            <option value="not-sure">Not sure</option>
            <option value="<1">Less than 1 hour</option>
            <option value="1-2">1 - 2 hours</option>
            <option value="2-4">2 - 4 hours</option>
            <option value="4-6">4 - 6 hours</option>
            <option value="6+">More than 6 hours</option>
          </select>
        </div>
        <hr className={classes.Line} />
        <div className={classes.Comments}>
          <h4>Comments</h4>
          <textarea value={this.props.inputComments}
                    onChange={this.props.onInputCommentsChanged}
          />
        </div>
        <hr className={classes.Line} />
        <div className={postBtnWrapperClass}
             onClick={() => this.props.onSubmitGame(this.props.posting,
                                                    this.props.userId,
                                                    this.props.inputGame,
                                                    this.props.inputMonth,
                                                    this.props.inputDay,
                                                    this.props.inputYear,
                                                    this.props.inputTime,
                                                    this.props.inputTotalPlayers,
                                                    this.props.inputOpenSpots,
                                                    this.props.inputSetting,
                                                    this.props.inputPlatform,
                                                    this.props.inputServer,
                                                    this.props.inputServerPassword,
                                                    this.props.inputDiscordLink,
                                                    this.props.inputNeighborhood,
                                                    this.props.inputCity,
                                                    this.props.inputState,
                                                    this.props.inputCountry,
                                                    this.props.inputAddress,
                                                    this.props.inputNotes,
                                                    this.props.inputLength,
                                                    this.props.inputComments,
                                                    this.gameRef,
                                                    this.monthRef,
                                                    this.dayRef,
                                                    this.yearRef,
                                                    this.timeRef,
                                                    this.totalPlayersRef,
                                                    this.openSpotsRef,
                                                    this.settingRef,
                                                    this.platformRef,
                                                    this.serverRef,
                                                    this.serverPasswordRef,
                                                    this.discordLinkRef,
                                                    this.cityRef,
                                                    this.stateRef,
                                                    this.addressRef)}
        >
          <div className={postBtnClass}>
            <span>{buttonText}</span>
          </div>
        </div>
      </div>
    );

    return (

      <>
        <Header />
        <NavBar />
        {hostGame}
      </>
    );
  }
}

const mapStateToProps = state => {

  return {
    userId: state.auth.userId,
    displayName: state.auth.displayName,
    isLoggedIn: state.auth.token !== null,
    inputGame: state.hostGame.inputGame,
    inputMonth: state.hostGame.inputMonth,
    inputDay: state.hostGame.inputDay,
    inputYear: state.hostGame.inputYear,
    inputTime: state.hostGame.inputTime,
    inputTotalPlayers: state.hostGame.inputTotalPlayers,
    inputOpenSpots: state.hostGame.inputOpenSpots,
    inputSetting: state.hostGame.inputSetting,
    inputPlatform: state.hostGame.inputPlatform,
    inputServer: state.hostGame.inputServer,
    inputServerPassword: state.hostGame.inputServerPassword,
    inputDiscordLink: state.hostGame.inputDiscordLink,
    inputNeighborhood: state.hostGame.inputNeighborhood,
    inputCity: state.hostGame.inputCity,
    inputState: state.hostGame.inputState,
    inputCountry: state.hostGame.inputCountry,
    inputAddress: state.hostGame.inputAddress,
    inputNotes: state.hostGame.inputNotes,
    inputLength: state.hostGame.inputLength,
    inputComments: state.hostGame.inputComments,
    posting: state.hostGame.posting,
    posted: state.hostGame.posted,
    postErrorMsgTarget: state.hostGame.postErrorMsgTarget
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onInitLoggedIn: () => dispatch(actions.initLoggedIn()),
    onInputGameChanged: (event) => dispatch(actions.inputGameChanged(event.target.value)),
    onInputMonthChanged: (event) => dispatch(actions.inputMonthChanged(event.target.value)),
    onInputDayChanged: (event) => dispatch(actions.inputDayChanged(event.target.value)),
    onInputYearChanged: (event) => dispatch(actions.inputYearChanged(event.target.value)),
    onInputTimeChanged: (event) => dispatch(actions.inputTimeChanged(event.target.value)),
    onInputTotalPlayersChanged: (event) => dispatch(actions.inputTotalPlayersChanged(event.target.value)),
    onInputOpenSpotsChanged: (event) => dispatch(actions.inputOpenSpotsChanged(event.target.value)),
    onInputSettingChanged: (event) => dispatch(actions.inputSettingChanged(event.target.value)),
    onInputPlatformChanged: (event) => dispatch(actions.inputPlatformChanged(event.target.value)),
    onInputServerChanged: (event) => dispatch(actions.inputServerChanged(event.target.value)),
    onInputServerPasswordChanged: (event) => dispatch(actions.inputServerPasswordChanged(event.target.value)),
    onInputDiscordLinkChanged: (event) => dispatch(actions.inputDiscordLinkChanged(event.target.value)),
    onInputNeighborhoodChanged: (event) => dispatch(actions.inputNeighborhoodChanged(event.target.value)),
    onInputCityChanged: (event) => dispatch(actions.inputCityChanged(event.target.value)),
    onInputStateChanged: (event) => dispatch(actions.inputStateChanged(event.target.value)),
    onInputCountryChanged: (event) => dispatch(actions.inputCountryChanged(event.target.value)),
    onInputAddressChanged: (event) => dispatch(actions.inputAddressChanged(event.target.value)),
    onInputNotesChanged: (event) => dispatch(actions.inputNotesChanged(event.target.value)),
    onInputLengthChanged: (event) => dispatch(actions.inputLengthChanged(event.target.value)),
    onInputCommentsChanged: (event) => dispatch(actions.inputCommentsChanged(event.target.value)),

    onSubmitGame: (posting, userId, inputGame, inputMonth,
      inputDay, inputYear, inputTime, inputTotalPlayers, inputOpenSpots,
      inputSetting, inputPlatform, inputServer, inputServerPassword,
      inputDiscordLink, inputNeighborhood, inputCity, inputState, inputCountry,
      inputAddress, inputNotes, inputLength, inputComments, gameRef, monthRef,
      dayRef, yearRef, timeRef, totalPlayersRef, openSpotsRef, settingRef,
      platformRef, serverRef, serverPasswordRef, discordLinkRef, cityRef,
      stateRef, addressRef) =>

      dispatch(actions.submitGame(posting, userId, inputGame,
        inputMonth, inputDay, inputYear, inputTime, inputTotalPlayers,
        inputOpenSpots, inputSetting, inputPlatform, inputServer,
        inputServerPassword, inputDiscordLink, inputNeighborhood, inputCity,
        inputState, inputCountry, inputAddress, inputNotes, inputLength,
        inputComments, gameRef, monthRef, dayRef, yearRef, timeRef,
        totalPlayersRef, openSpotsRef, settingRef, platformRef, serverRef,
        serverPasswordRef, discordLinkRef, cityRef, stateRef, addressRef))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HostGame);
