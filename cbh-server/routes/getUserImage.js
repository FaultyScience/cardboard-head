const express = require("express");

const userMethods = require("../db/methods/user");
const msg = require("../resources/messages");
const c = require("../resources/constants");

const router = express.Router();

router.get("/get-user-image/:uid/:iid", async (req, res) => {

  let internalMsg = msg.GET_IMAGE_SUCCESS;
  let responseMsg = msg.GET_IMAGE_SUCCESS;
  let imageType = null;
  let filepath = null;
  let status = 200;
  let imageCode = 700;

  const userId = req.params.uid;

  const requestDescription = userId + " getting image";

  const internalError = err => {

    console.log(err);

    internalMsg = msg.IMAGE_FAIL_INTERNAL;
    responseMsg = msg.IMAGE_FAIL;
    imageCode = 705;
  };

  try {

    const userExists = await userMethods.checkUserIdExists(userId).catch(internalError);

    if (userExists) {

      profile = await userMethods.getPlayerProfile(userId);
      imageType = profile.imageType;
      filepath = "./" + userId + "/" + profile.imageId + "." + imageType;

    } else if (!userExists) {

      internalMsg = msg.IMAGE_FAIL_ID;
      responseMsg = msg.IMAGE_FAIL;
      imageCode = 704;
    }
  }
  catch (err) { internalError(err); }

  const body = {
    userId: userId,
    message: responseMsg,
    imageCode: imageCode
  };

  const response = {
    statusCode: status,
    body: body
  };

  console.log(requestDescription + ": " + internalMsg);

  if (imageType) {

    res.set("Content-Type", "image/" + imageType);
    res.status(status).sendFile(filepath, { root: __dirname + "/../db/user-images" });

  } else {
    res.status(status).send(response);
  }
});

module.exports = router;
