import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as c from "../../resources/constants";
import CODE_MAP from "../../resources/codeMap";

const getScheduledGamesSuccess = (games) => {

  return {
    type: actionTypes.GET_SCHEDULED_GAMES_SUCCESS,
    scheduledGames: games
  };
};

const getScheduledGamesFail = () => {
  return { type: actionTypes.GET_SCHEDULED_GAMES_FAIL };
};

export const getScheduledGames = (userId, pastOrUpcoming) => {

    return async (dispatch) => {

      try {

        let cutoffTime = (new Date()).getTime();
        cutoffTime = Math.floor(cutoffTime / 1000) - 7200;

        const params = {
          userId: userId,
          pastOrUpcoming: pastOrUpcoming,
          cutoffTime: cutoffTime
        };

        const res = await axios.post(c.BASE_URL + "/get-scheduled-games/", params);
        const body = res.data.body;

        if (body.scheduledCode !== 300) {
          dispatch(getScheduledGamesFail(CODE_MAP[body.scheduledCode]));
        } else if (body.scheduledCode === 300) {
          dispatch(getScheduledGamesSuccess(body.scheduledGames));
        } else {
          throw new Error("Could not get scheduled games");
        }
      }
      catch (err) {

        dispatch(getScheduledGamesFail(err.message));
        console.log(err.message);
      }
    };
};
