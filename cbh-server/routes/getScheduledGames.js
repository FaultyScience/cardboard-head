const express = require("express");

const userMethods = require("../db/methods/user");
const sessionMethods = require("../db/methods/session");
const msg = require("../resources/messages");
const c = require("../resources/constants");

const router = express.Router();

router.post("/get-scheduled-games", async (req, res) => {

  let internalMsg = msg.GET_SCHEDULED_GAMES_SUCCESS;
  let responseMsg = msg.GET_SCHEDULED_GAMES_SUCCESS;
  let scheduledGames = null;
  let status = 200;
  let scheduledCode = 300;

  const userId = req.body.userId;
  const pastOrUpcoming = req.body.pastOrUpcoming;
  const cutoffTime = req.body.cutoffTime;

  const requestDescription = userId + " getting " + pastOrUpcoming + " games";

  const internalError = err => {

    console.log(err);

    internalMsg = msg.SCHEDULED_GAMES_FAIL_INTERNAL;
    responseMsg = msg.SCHEDULED_GAMES_FAIL;
    scheduledCode = 305;
  };

  try {

    const userExists = await userMethods.checkUserIdExists(userId).catch(internalError);

    if (userExists) {

      const sessionIds = await userMethods.getSessionIds(userId);
      const sortBy = (pastOrUpcoming === "upcoming") ? "unixUtc" : "-unixUtc";
      const sessions = await sessionMethods.getSessions(sessionIds, sortBy);

      scheduledGames = [];
      let startTime, isUpcoming, isPast;

      for (let session of sessions) {

        startTime = session.unixUtc;
        isUpComing = (pastOrUpcoming === "upcoming") && (startTime >= cutoffTime);
        isPast = (pastOrUpcoming === "past") && (startTime < cutoffTime);

        if (isUpComing || isPast)
          scheduledGames.push(session);
      }

    } else if (userExists === false) {

      internalMsg = msg.SCHEDULED_GAMES_FAIL_ID;
      responseMsg = msg.SCHEDULED_GAMES_FAIL;
      scheduledCode = 304;
    }
  }
  catch (err) { internalError(err); }

  const body = {
    userId: userId,
    message: responseMsg,
    scheduledGames: scheduledGames,
    scheduledCode: scheduledCode
  };

  const response = {
    statusCode: status,
    body: body
  };

  console.log(requestDescription + ": " + internalMsg);
  res.status(status).send(response);
});

module.exports = router;
