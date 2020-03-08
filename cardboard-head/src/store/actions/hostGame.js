import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as c from "../../resources/constants";
import CODE_MAP from "../../resources/codeMap";
import { convertToUtc } from "../../resources/utils";

export const inputGameChanged = (game) => {

  return {
    type: actionTypes.INPUT_GAME_CHANGED,
    inputGame: game
  };
};

export const inputMonthChanged = (month) => {

  return {
    type: actionTypes.INPUT_MONTH_CHANGED,
    inputMonth: month
  };
};

export const inputDayChanged = (day) => {

  return {
    type: actionTypes.INPUT_DAY_CHANGED,
    inputDay: day
  };
};

export const inputYearChanged = (year) => {

  return {
    type: actionTypes.INPUT_YEAR_CHANGED,
    inputYear: year
  };
};

export const inputTimeChanged = (time) => {

  return {
    type: actionTypes.INPUT_TIME_CHANGED,
    inputTime: time
  };
};

export const inputTotalPlayersChanged = (players) => {

  return {
    type: actionTypes.INPUT_TOTAL_PLAYERS_CHANGED,
    inputTotalPlayers: players
  };
};

export const inputOpenSpotsChanged = (spots) => {

  return {
    type: actionTypes.INPUT_OPEN_SLOTS_CHANGED,
    inputOpenSpots: spots
  };
};

export const inputSettingChanged = (setting) => {

  return {
    type: actionTypes.INPUT_SETTING_CHANGED,
    inputSetting: setting
  };
};

export const inputPlatformChanged = (platform) => {

  return {
    type: actionTypes.INPUT_PLATFORM_CHANGED,
    inputPlatform: platform
  };
};

export const inputServerChanged = (server) => {

  return {
    type: actionTypes.INPUT_SERVER_CHANGED,
    inputServer: server
  };
};

export const inputServerPasswordChanged = (password) => {

  return {
    type: actionTypes.INPUT_SERVER_PASSWORD_CHANGED,
    inputServerPassword: password
  };
};

export const inputDiscordLinkChanged = (link) => {

  return {
    type: actionTypes.INPUT_DISCORD_LINK_CHANGED,
    inputDiscordLink: link
  };
};

export const inputNeighborhoodChanged = (neighborhood) => {

  return {
    type: actionTypes.INPUT_NEIGHBORHOOD_CHANGED,
    inputNeighborhood: neighborhood
  };
};

export const inputCityChanged = (city) => {

  return {
    type: actionTypes.INPUT_CITY_CHANGED,
    inputCity: city
  };
};

export const inputStateChanged = (state) => {

  return {
    type: actionTypes.INPUT_STATE_CHANGED,
    inputState: state
  };
};

export const inputCountryChanged = (country) => {

  return {
    type: actionTypes.INPUT_COUNTRY_CHANGED,
    inputCountry: country
  };
};

export const inputAddressChanged = (address) => {

  return {
    type: actionTypes.INPUT_ADDRESS_CHANGED,
    inputAddress: address
  };
};

export const inputNotesChanged = (notes) => {

  return {
    type: actionTypes.INPUT_NOTES_CHANGED,
    inputNotes: notes
  };
};

export const inputLengthChanged = (length) => {

  return {
    type: actionTypes.INPUT_LENGTH_CHANGED,
    inputLength: length
  };
};

export const inputCommentsChanged = (comments) => {

  return {
    type: actionTypes.INPUT_COMMENTS_CHANGED,
    inputComments: comments
  };
};

const startPost = () => {
  return { type: actionTypes.START_POST };
};

const gamePostSuccess = () => {
  return { type: actionTypes.GAME_POST_SUCCESS };
};

const gamePostFail = (postErrorMsgTarget) => {

  return {
    type: actionTypes.GAME_POST_FAIL,
    postErrorMsgTarget: postErrorMsgTarget
  };
};

export const resetPosted = () => {
  return { type: actionTypes.RESET_POSTED };
};

export const submitGame = (posting, userId, inputGame, inputMonth, inputDay,
  inputYear, inputTime, inputTotalPlayers, inputOpenSpots,
  inputSetting, inputPlatform, inputServer, inputServerPassword,
  inputDiscordLink, inputNeighborhood, inputCity, inputState,
  inputCountry, inputAddress, inputNotes, inputLength, inputComments,
  gameRef, monthRef, dayRef, yearRef, timeRef, totalPlayersRef, openSpotsRef,
  settingRef, platformRef, serverRef, serverPasswordRef, discordLinkRef,
  cityRef, stateRef, addressRef) => {

    return async (dispatch) => {

      if (posting) return;

      try {

        let res;

        dispatch(startPost());

        if (inputGame === "") {

          gameRef.current.focus();
          return dispatch(gamePostFail("game"));
        }

        if (inputMonth === "default") {

          monthRef.current.focus();
          return dispatch(gamePostFail("month"));
        }

        if (inputDay === "default") {

          dayRef.current.focus();
          return dispatch(gamePostFail("day"));
        }

        if (inputYear === "default") {

          yearRef.current.focus();
          return dispatch(gamePostFail("year"));
        }

        if (inputTime === "default") {

          timeRef.current.focus();
          return dispatch(gamePostFail("time"));
        }

        if (inputTotalPlayers === "default") {

          totalPlayersRef.current.focus();
          return dispatch(gamePostFail("totalPlayers"));
        }

        if (inputOpenSpots === "default") {

          openSpotsRef.current.focus();
          return dispatch(gamePostFail("openSpots"));
        }

        if (inputSetting === "online") {

          if (inputPlatform === "") {

            platformRef.current.focus();
            return dispatch(gamePostFail("platform"));
          }

          if (inputServer === "") {

            serverRef.current.focus();
            return dispatch(gamePostFail("server"));
          }

          if (inputServerPassword === "") {

            serverPasswordRef.current.focus();
            return dispatch(gamePostFail("serverPassword"));
          }

          if (inputDiscordLink === "") {

            discordLinkRef.current.focus();
            return dispatch(gamePostFail("discordLink"));
          }
        }

        if (inputSetting === "in-person") {

          if (inputCity === "") {

            cityRef.current.focus();
            return dispatch(gamePostFail("city"));
          }

          if (inputState === "default") {

            stateRef.current.focus();
            return dispatch(gamePostFail("state"));
          }

          if (inputAddress === "") {

            addressRef.current.focus();
            return dispatch(gamePostFail("address"));
          }
        }

        let unixUtc, isExpired;

        [unixUtc, isExpired] = convertToUtc(inputMonth, inputDay, inputYear,
          inputTime);

        if (isExpired) {

          monthRef.current.focus();
          return dispatch(gamePostFail("expired"));
        }

        const params = {
          userId: userId,
          game: inputGame,
          totalNumberOfPlayers: inputTotalPlayers,
          openSpots: inputOpenSpots,
          setting: inputSetting,
          platform: (inputSetting === "online") ? inputPlatform : "",
          server: (inputSetting === "online") ? inputServer : "",
          password: (inputSetting === "online") ? inputServerPassword : "",
          discordLink: (inputSetting === "online") ? inputDiscordLink : "",
          neighborhood: (inputSetting === "in-person") ? inputNeighborhood : "",
          city: (inputSetting === "in-person") ? inputCity : "",
          state: (inputSetting === "in-person") ? inputState : "default",
          country: (inputSetting === "in-person") ? inputCountry : "",
          address: (inputSetting === "in-person") ? inputAddress : "",
          locationNotes: (inputSetting === "in-person") ? inputNotes : "",
          unixUtc: unixUtc,
          lengthInHours: inputLength,
          comments: inputComments,
          isExpired: isExpired
        };

        res = await axios.post(c.BASE_URL + "/post-game/", params);
        const postBody = res.data.body;

        if (postBody.postCode !== 400) {
          dispatch(gamePostFail(CODE_MAP[postBody.postCode]));
        } else if (postBody.postCode === 400) {

          settingRef.current.checked = true;
          dispatch(gamePostSuccess());

        } else {
          throw new Error("Could not post game");
        }
      }
      catch (err) {

        dispatch(gamePostFail(err.message));
        console.log(err.message);
      }
    };
};
