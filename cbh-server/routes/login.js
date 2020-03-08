const express = require("express");
const jwt = require("jsonwebtoken");

const userMethods = require("../db/methods/user");
const msg = require("../resources/messages");
const c = require("../resources/constants");

const router = express.Router();

router.post("/login", async (req, res) => {

  let verified = true;
  let internalMsg = msg.VERIFICATION_SUCCESS;
  let responseMsg = msg.VERIFICATION_SUCCESS;
  let verificationToken = null;
  let expiresAt = null;
  let user = null;
  let userId = null;
  let displayName = null;
  let status = 200;
  let authCode = 900;

  const email = req.body.email;
  const password = req.body.password;

  const requestDescription = email + " login";

  const internalError = err => {

    console.log(err);

    internalMsg = msg.VERIFICATION_FAIL_INTERNAL;
    responseMsg = msg.VERIFICATION_FAIL;
    authCode = 905;
  };

  try {

    const userExists = await userMethods.checkEmailExists(email).catch(internalError);

    if (userExists) {

      userId = await userMethods.getUserId(email).catch(internalError);
      const passwordVerified = await userMethods.verifyPassword(userId, password).catch(internalError);

      if (passwordVerified) {

        expiresAt = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 90);

        const tokenParams = {
          exp: expiresAt,
          user_id: userId
        };

        verificationToken = jwt.sign(tokenParams, c.BULK_STRING_5);

        user = await userMethods.getUser(userId);
        displayName = user.displayName;

      } else if (passwordVerified === false) {

        const correctPassword = await userMethods.getPassword(userId);
        console.log("Correct password: " + correctPassword);

        internalMsg = msg.VERIFICATION_FAIL_PASSWORD;
        responseMsg = msg.VERIFICATION_FAIL;
        authCode = 904;
      }

    } else if (userExists === false) {

      internalMsg = msg.VERIFICATION_FAIL_EMAIL;
      responseMsg = msg.VERIFICATION_FAIL;
      authCode = 904;
    }
  }
  catch (err) { internalError(err); }

  const body = {
    email: email,
    userId: userId,
    verified: verified,
    message: responseMsg,
    verificationToken: verificationToken,
    expiresAt: expiresAt,
    displayName: displayName,
    authCode: authCode
  };

  const response = {
    statusCode: status,
    body: body
  };

  console.log(requestDescription + ": " + internalMsg);
  res.status(status).send(response);
});

module.exports = router;
