import * as actionTypes from "../actions/actionTypes";

const initialState = {
  inputGame: "",
  inputMonth: "default",
  inputDay: "default",
  inputYear: "default",
  inputTime: "default",
  inputTotalPlayers: "default",
  inputOpenSpots: "default",
  inputSetting: "online",
  inputPlatform: "",
  inputServer: "",
  inputServerPassword: "",
  inputDiscordLink: "",
  inputNeighborhood: "",
  inputCity: "",
  inputState: "default",
  inputCountry: "United States",
  inputAddress: "",
  inputNotes: "",
  inputLength: "not-sure",
  inputComments: "",
  posting: false,
  posted: false,
  postErrorMsgTarget: ""
};

const inputGameChanged = (state, action) => {

  return {
    ...state,
    inputGame: action.inputGame
  };
};

const inputMonthChanged = (state, action) => {

  return {
    ...state,
    inputMonth: action.inputMonth
  };
};

const inputDayChanged = (state, action) => {

  return {
    ...state,
    inputDay: action.inputDay
  };
};

const inputYearChanged = (state, action) => {

  return {
    ...state,
    inputYear: action.inputYear
  };
};

const inputTimeChanged = (state, action) => {

  return {
    ...state,
    inputTime: action.inputTime
  };
};

const inputTotalPlayersChanged = (state, action) => {

  return {
    ...state,
    inputTotalPlayers: action.inputTotalPlayers
  };
};

const inputOpenSpotsChanged = (state, action) => {

  return {
    ...state,
    inputOpenSpots: action.inputOpenSpots
  };
};

const inputSettingChanged = (state, action) => {

  return {
    ...state,
    inputSetting: action.inputSetting
  };
};

const inputPlatformChanged = (state, action) => {

  return {
    ...state,
    inputPlatform: action.inputPlatform
  };
};

const inputServerChanged = (state, action) => {

  return {
    ...state,
    inputServer: action.inputServer
  };
};

const inputServerPasswordChanged = (state, action) => {

  return {
    ...state,
    inputServerPassword: action.inputServerPassword
  };
};

const inputDiscordLinkChanged = (state, action) => {

  return {
    ...state,
    inputDiscordLink: action.inputDiscordLink
  };
};

const inputNeighborhoodChanged = (state, action) => {

  return {
    ...state,
    inputNeighborhood: action.inputNeighborhood
  };
};

const inputCityChanged = (state, action) => {

  return {
    ...state,
    inputCity: action.inputCity
  };
};

const inputStateChanged = (state, action) => {

  return {
    ...state,
    inputState: action.inputState
  };
};

const inputCountryChanged = (state, action) => {

  return {
    ...state,
    inputCountry: action.inputCountry
  };
};

const inputAddressChanged = (state, action) => {

  return {
    ...state,
    inputAddress: action.inputAddress
  };
};

const inputNotesChanged = (state, action) => {

  return {
    ...state,
    inputNotes: action.inputNotes
  };
};

const inputLengthChanged = (state, action) => {

  return {
    ...state,
    inputLength: action.inputLength
  };
};

const inputCommentsChanged = (state, action) => {

  return {
    ...state,
    inputComments: action.inputComments
  };
};

const startPost = (state, action) => {

  return {
    ...state,
    posting: true
  };
};

const gamePostSuccess = (state, action) => {

  return {
    ...state,
    posting: false,
    posted: true,
    inputMonth: "default",
    inputDay: "default",
    inputYear: "default",
    inputTime: "default",
    inputTotalPlayers: "default",
    inputOpenSpots: "default",
    inputSetting: "online",
    inputPlatform: "",
    inputServer: "",
    inputServerPassword: "",
    inputDiscordLink: "",
    inputNeighborhood: "",
    inputCity: "",
    inputState: "default",
    inputCountry: "",
    inputAddress: "",
    inputNotes: "",
    inputLength: "not-sure",
    inputComments: "",
    postErrorMsgTarget: ""
  };
};

const gamePostFail = (state, action) => {

  return {
    ...state,
    posting: false,
    postErrorMsgTarget: action.postErrorMsgTarget
  };
};

const resetPosted = (state, action) => {

  return {
    ...state,
    inputGame: "",
    posted: false
  };
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.INPUT_GAME_CHANGED: return inputGameChanged(state, action);
    case actionTypes.INPUT_MONTH_CHANGED: return inputMonthChanged(state, action);
    case actionTypes.INPUT_DAY_CHANGED: return inputDayChanged(state, action);
    case actionTypes.INPUT_YEAR_CHANGED: return inputYearChanged(state, action);
    case actionTypes.INPUT_TIME_CHANGED: return inputTimeChanged(state, action);
    case actionTypes.INPUT_TOTAL_PLAYERS_CHANGED: return inputTotalPlayersChanged(state, action);
    case actionTypes.INPUT_OPEN_SLOTS_CHANGED: return inputOpenSpotsChanged(state, action);
    case actionTypes.INPUT_SETTING_CHANGED: return inputSettingChanged(state, action);
    case actionTypes.INPUT_PLATFORM_CHANGED: return inputPlatformChanged(state, action);
    case actionTypes.INPUT_SERVER_CHANGED: return inputServerChanged(state, action);
    case actionTypes.INPUT_SERVER_PASSWORD_CHANGED: return inputServerPasswordChanged(state, action);
    case actionTypes.INPUT_DISCORD_LINK_CHANGED: return inputDiscordLinkChanged(state, action);
    case actionTypes.INPUT_NEIGHBORHOOD_CHANGED: return inputNeighborhoodChanged(state, action);
    case actionTypes.INPUT_CITY_CHANGED: return inputCityChanged(state, action);
    case actionTypes.INPUT_STATE_CHANGED: return inputStateChanged(state, action);
    case actionTypes.INPUT_COUNTRY_CHANGED: return inputCountryChanged(state, action);
    case actionTypes.INPUT_ADDRESS_CHANGED: return inputAddressChanged(state, action);
    case actionTypes.INPUT_NOTES_CHANGED: return inputNotesChanged(state, action);
    case actionTypes.INPUT_LENGTH_CHANGED: return inputLengthChanged(state, action);
    case actionTypes.INPUT_COMMENTS_CHANGED: return inputCommentsChanged(state, action);
    case actionTypes.START_POST: return startPost(state, action);
    case actionTypes.GAME_POST_SUCCESS: return gamePostSuccess(state, action);
    case actionTypes.GAME_POST_FAIL: return gamePostFail(state, action);
    case actionTypes.RESET_POSTED: return resetPosted(state, action);
    default: return state;
  }
};

export default reducer;
