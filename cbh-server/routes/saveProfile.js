const express = require("express");

const userMethods = require("../db/methods/user");
const msg = require("../resources/messages");
const c = require("../resources/constants");

const router = express.Router();

router.post("/save-profile", async (req, res) => {

  let internalMsg = msg.SAVE_PROFILE_SUCCESS;
  let responseMsg = msg.SAVE_PROFILE_SUCCESS;
  let status = 200;
  let saveCode = 500;

  const userId = req.body.userId;
  const displayName = req.body.displayName;
  const rules = req.body.rules;
  const weightPreference = req.body.weightPreference;
  const age = req.body.age;
  const about = req.body.about;

  const requestDescription = userId + " saving profile";

  const internalError = err => {

    console.log(err);

    internalMsg = msg.PROFILE_SAVE_FAIL_INTERNAL;
    responseMsg = msg.PROFILE_SAVE_FAIL;
    saveCode = 505;
  };

  try {

    const userExists = await userMethods.checkUserIdExists(userId).catch(internalError);

    if (userExists) {

      await userMethods.savePlayerProfile(userId, displayName, rules,
        weightPreference, age, about);

    } else if (userExists === false) {

      internalMsg = msg.PROFILE_SAVE_FAIL_ID;
      responseMsg = msg.PROFILE_SAVE_FAIL;
      saveCode = 504;
    }
  }
  catch (err) { internalError(err); }

  const body = {
    userId: userId,
    message: responseMsg,
    saveCode: saveCode
  };

  const response = {
    statusCode: status,
    body: body
  };

  console.log(requestDescription + ": " + internalMsg);
  res.status(status).send(response);
});

module.exports = router;
