import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as c from "../../resources/constants";
import CODE_MAP from "../../resources/codeMap";

export const playerProfileSuccess = (displayName, rules, weightPreference, age,
  about, imageId) => {

  return {
    type: actionTypes.PLAYER_PROFILE_SUCCESS,
    displayName: displayName,
    imageId: imageId,
    inputDisplayName: displayName,
    inputRules: rules,
    inputLight: weightPreference[0],
    inputMiddle: weightPreference[1],
    inputHeavy: weightPreference[2],
    inputAge: age,
    inputAbout: about
  };
};

export const playerProfileFail = (msg) => {

  return {
    type: actionTypes.PLAYER_PROFILE_FAIL,
    message: msg
  };
};

const inputImageChanged = (file, uri) => {

  return {
    type: actionTypes.INPUT_IMAGE_CHANGED,
    file: file,
    uri: uri
  };
};

const uploadImageSuccess = (imageId) => {

  return {
    type: actionTypes.UPLOAD_IMAGE_SUCCESS,
    imageId: imageId
  };
};

const uploadImageFail = () => {

  return {
    type: actionTypes.UPLOAD_IMAGE_FAIL
  };
};

const startUpload = () => {
  return { type: actionTypes.START_UPLOAD };
};

const startSave = () => {
  return { type: actionTypes.START_SAVE };
};

const profileSaveSuccess = () => {
  return { type: actionTypes.PROFILE_SAVE_SUCCESS };
};

const profileSaveFail = (saveErrorMsg) => {

  return {
    type: actionTypes.PROFILE_SAVE_FAIL,
    saveErrorMsg: saveErrorMsg
  };
};

const hideSaved = () => {
  return { type: actionTypes.HIDE_SAVED };
};

export const processInputImageChanged = (e, file) => {

  e.target.value = "";

  return async (dispatch) => {

    try {

      const reader = new FileReader();

      reader.onload = (e) => {
        dispatch(inputImageChanged(file, e.target.result));
      };

      reader.readAsDataURL(file);

    } catch (err) {
      console.log(err.message);
    }
  };
};

export const profInputDisplayNameChanged = (displayName) => {

  return {
    type: actionTypes.PROF_INPUT_DISPLAY_NAME_CHANGED,
    inputDisplayName: displayName
  };
};

export const inputRulesChanged = (rules) => {

  return {
    type: actionTypes.INPUT_RULES_CHANGED,
    inputRules: rules
  };
};

export const inputLightChanged = (checked) => {

  return {
    type: actionTypes.INPUT_LIGHT_CHANGED,
    inputLight: checked
  };
};

export const inputMiddleChanged = (checked) => {

  return {
    type: actionTypes.INPUT_MIDDLE_CHANGED,
    inputMiddle: checked
  };
};

export const inputHeavyChanged = (checked) => {

  return {
    type: actionTypes.INPUT_HEAVY_CHANGED,
    inputHeavy: checked
  };
};

export const inputAgeChanged = (age) => {

  return {
    type: actionTypes.INPUT_AGE_CHANGED,
    inputAge: age
  };
};

export const inputAboutChanged = (about) => {

  return {
    type: actionTypes.INPUT_ABOUT_CHANGED,
    inputAbout: about
  };
};

export const getPlayerProfile = (userId) => {

  return async (dispatch) => {

    try {

      const params = { userId: userId };

      let res = await axios.post(c.BASE_URL + "/get-profile", params);
      const body = res.data.body;

      if (body.profileCode !== 800) {
        dispatch(playerProfileFail(CODE_MAP[body.profileCode]));
      } else if (body.profileCode === 800) {

        dispatch(playerProfileSuccess(body.displayName, body.rules,
          body.weightPreference, body.age, body.about, body.imageId));

      } else {
        throw new Error("Could not get player profile");
      }
    }
    catch (err) {

      dispatch(playerProfileFail(err.message));
      console.log(err.message);
    }
  };
};

export const submitPlayerProfile = (saving, userId, inputImageFile,
  inputDisplayName, inputRules, inputLight, inputMiddle, inputHeavy, inputAge,
  inputAbout) => {

  return async (dispatch) => {

    if (saving) { return; }

    try {

      let res;

      dispatch(startSave());

      if (inputImageFile) {

        dispatch(startUpload());

        const formData = new FormData();
        formData.append("imageUpload", inputImageFile);

        const config = {
          headers: { "Content-Type": "multipart/form-data" }
        };

        res = await axios.post(c.BASE_URL + "/upload-image/" + userId, formData, config);
        const imageUploadBody = res.data.body;

        if (imageUploadBody.uploadCode !== 600) {
          dispatch(uploadImageFail(CODE_MAP[imageUploadBody.uploadCode]));
        } else if (imageUploadBody.uploadCode === 600) {
          dispatch(uploadImageSuccess(imageUploadBody.imageId));
        } else {
          throw new Error("Could not upload image");
        }
      }

      const params = {
        userId: userId,
        displayName: inputDisplayName,
        rules: inputRules,
        weightPreference: [inputLight, inputMiddle, inputHeavy],
        age: inputAge,
        about: inputAbout
      };

      res = await axios.post(c.BASE_URL + "/save-profile/", params);
      const saveBody = res.data.body;

      if (saveBody.saveCode !== 500) {
        dispatch(profileSaveFail(CODE_MAP[saveBody.saveCode]));
      } else if (saveBody.saveCode === 500) {

        dispatch(profileSaveSuccess());
        setTimeout(() => dispatch(hideSaved()), 2500);

      } else {
        throw new Error("Could not save profile");
      }
    }
    catch (err) {

      dispatch(profileSaveFail(err.message));
      console.log(err.message);
    }
  };
};
