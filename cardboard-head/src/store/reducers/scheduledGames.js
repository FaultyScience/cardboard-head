import * as actionTypes from "../actions/actionTypes";

const initialState = {
  scheduledGames: [],
  loading: true
};

const getScheduledGamesSuccess = (state, action) => {

  return {
    ...state,
    loading: false,
    scheduledGames: action.scheduledGames
  };
};

const getScheduledGamesFail = (state, action) => {

  return {
    ...state,
    loading: false
  };
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.GET_SCHEDULED_GAMES_SUCCESS: return getScheduledGamesSuccess(state, action);
    case actionTypes.GET_SCHEDULED_GAMES_FAIL: return getScheduledGamesFail(state, action);
    default: return state;
  }
};

export default reducer;
