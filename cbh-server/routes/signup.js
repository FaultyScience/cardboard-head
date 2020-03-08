const express = require("express");
const jwt = require("jsonwebtoken");

const userMethods = require("../db/methods/user");
const msg = require("../resources/messages");
const c = require("../resources/constants");

const router = express.Router();

router.post("/signup", async (req, res) => {

  let verified = true;
  let internalMsg = msg.SIGNUP_SUCCESS;
  let responseMsg = msg.SIGNUP_SUCCESS;
  let verificationToken = null;
  let expiresAt = null;
  let user = null;
  let userId = null;
  let status = 200;
  let authCode = 910;

  const email = req.body.email;
  const displayName = req.body.displayName;
  const password = req.body.password;

  const requestDescription = email + " signup";

  const internalError = err => {

    console.log(err);

    internalMsg = msg.SIGNUP_FAIL_INTERNAL;
    responseMsg = msg.SIGNUP_FAIL;
    authCode = 915;
  };

  try {

    const userExists = await userMethods.checkEmailExists(email)
      .catch(internalError);

    if (!userExists) {

      const newUserStatus = await userMethods.createUser(email, password, displayName)
        .catch(internalError);

      userId = await userMethods.getUserId(email).catch(internalError);

      expiresAt = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 90);

      const tokenParams = {
        exp: expiresAt,
        user_id: userId
      };

      verificationToken = jwt.sign(tokenParams, c.BULK_STRING_5);

    } else {

      internalMsg = msg.SIGNUP_FAIL_INTERNAL_EMAIL_EXISTS;
      responseMsg = msg.SIGNUP_FAIL_EMAIL_EXISTS;
      authCode = 911;
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
