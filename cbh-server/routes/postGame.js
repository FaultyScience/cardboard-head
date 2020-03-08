const express = require("express");

const userMethods = require("../db/methods/user");
const sessionMethods = require("../db/methods/session");
const msg = require("../resources/messages");

const router = express.Router();

router.post("/post-game", async (req, res) => {

  let internalMsg = msg.POST_GAME_SUCCESS;
  let responseMsg = msg.POST_GAME_SUCCESS;
  let status = 200;
  let postCode = 400;

  const userId = req.body.userId;
  const game = req.body.game;
  const totalNumberOfPlayers = req.body.totalNumberOfPlayers;
  const openSpots = req.body.openSpots;
  const setting = req.body.setting;
  const platform = req.body.platform;
  const server = req.body.server;
  const password = req.body.password;
  const discordLink = req.body.discordLink;
  const neighborhood = req.body.neighborhood;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const address = req.body.address;
  const locationNotes = req.body.locationNotes;
  const unixUtc = req.body.unixUtc;
  const lengthInHours = req.body.lengthInHours;
  const comments = req.body.comments;
  const isExpired = req.body.isExpired;

  const requestDescription = userId + " posting game";

  const internalError = err => {

    console.log(err);

    internalMsg = msg.POST_GAME_FAIL_INTERNAL;
    responseMsg = msg.POST_GAME_FAIL;
    postCode = 405;
  };

  try {

    const userExists = await userMethods.checkUserIdExists(userId).catch(internalError);

    if (userExists) {

      await sessionMethods.createSession(userId, game, totalNumberOfPlayers,
        openSpots, setting, platform, server, password, discordLink,
        neighborhood, city, state, country, address, locationNotes,
        unixUtc, lengthInHours, comments, isExpired);

    } else if (userExists === false) {

      internalMsg = msg.POST_GAME_ID;
      responseMsg = msg.POST_GAME_FAIL;
      postCode = 404;
    }
  }
  catch (err) { internalError(err); }

  const body = {
    userId: userId,
    message: responseMsg,
    postCode: postCode
  };

  const response = {
    statusCode: status,
    body: body
  };

  console.log(requestDescription + ": " + internalMsg);
  res.status(status).send(response);
});

module.exports = router;
