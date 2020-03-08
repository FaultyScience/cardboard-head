const express = require("express");

const userMethods = require("../db/methods/user");
const msg = require("../resources/messages");
const c = require("../resources/constants");

const router = express.Router();

router.post("/get-profile", async (req, res) => {

  let internalMsg = msg.GET_PROFILE_SUCCESS;
  let responseMsg = msg.GET_PROFILE_SUCCESS;
  let profile = null;
  let displayName = null;
  let weightPreference = null;
  let age = null;
  let rules = null;
  let about = null;
  let imageId = null;
  let status = 200;
  let profileCode = 800;

  const userId = req.body.userId;

  const requestDescription = userId + " getting profile";

  const internalError = err => {

    console.log(err);

    internalMsg = msg.PROFILE_FAIL_INTERNAL;
    responseMsg = msg.PROFILE_FAIL;
    profileCode = 805;
  };

  try {

    const userExists = await userMethods.checkUserIdExists(userId).catch(internalError);

    if (userExists) {

      profile = await userMethods.getPlayerProfile(userId);

      displayName = profile.name;
      weightPreference = profile.weightPreference;
      age = profile.age;
      rules = profile.rules;
      about = profile.about;
      imageId = profile.imageId;

    } else if (userExists === false) {

      internalMsg = msg.PROFILE_FAIL_ID;
      responseMsg = msg.PROFILE_FAIL;
      profileCode = 804;
    }
  }
  catch (err) { internalError(err); }

  const body = {
    userId: userId,
    message: responseMsg,
    displayName: displayName,
    weightPreference: weightPreference,
    age: age,
    rules: rules,
    about: about,
    imageId: imageId,
    profileCode: profileCode
  };

  const response = {
    statusCode: status,
    body: body
  };

  console.log(requestDescription + ": " + internalMsg);
  res.status(status).send(response);
});

module.exports = router;
