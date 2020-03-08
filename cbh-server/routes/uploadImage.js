const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

const userMethods = require("../db/methods/user");
const msg = require("../resources/messages");

const router = express.Router();
const copyFile = promisify(fs.copyFile);
const unlink = promisify(fs.unlink);

const upload = multer({
  dest: __dirname + "/../public/tmp",
  limits: { fileSize: 10000000 }
});

router.post("/upload-image/:uid", upload.single("imageUpload"), async (req, res) => {

  let internalMsg = msg.UPLOAD_IMAGE_SUCCESS;
  let responseMsg = msg.UPLOAD_IMAGE_SUCCESS;
  let imageId = null;
  let imageType = null;
  let status = 200;
  let uploadCode = 600;

  const userId = req.params.uid;

  const requestDescription = userId + " uploading image";

  const internalError = err => {

    console.log(err);

    internalMsg = msg.UPLOAD_IMAGE_FAIL_INTERNAL;
    responseMsg = msg.UPLOAD_IMAGE_FAIL;
    uploadCode = 605;
  };

  try {

    const userExists = await userMethods.checkUserIdExists(userId).catch(internalError);

    if (userExists) {

      let imageType = path.extname(req.file.originalname).toLowerCase();
      imageType = imageType.substr(1);

      if (imageType === "jpg") { imageType = "jpeg"; }

      const tempPath = req.file.path;
      imageId = path.parse(tempPath).name;
      const oldImageName = await userMethods.getProfileImageName(userId);

      const targetPath = __dirname + "/../db/user-images/" + userId + "/";
      const oldTargetPath = targetPath + oldImageName;
      const newTargetPath = targetPath + imageId + "." + imageType;

      await copyFile(tempPath, newTargetPath);
      await unlink(tempPath);
      await unlink(oldTargetPath);

      await userMethods.updateProfileImage(userId, imageId, imageType);

    } else if (!userExists) {

      internalMsg = msg.UPLOAD_IMAGE_FAIL_ID;
      responseMsg = msg.UPLOAD_IMAGE_FAIL;
      uploadCode = 604;
    }
  }
  catch (err) { internalError(err); }

  const body = {
    userId: userId,
    imageId: imageId,
    message: responseMsg,
    uploadCode: uploadCode
  };

  const response = {
    statusCode: status,
    body: body
  };

  console.log(requestDescription + ": " + internalMsg);
  res.status(status).send(response);
});

module.exports = router;
