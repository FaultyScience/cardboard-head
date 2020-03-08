import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: true,
  imageLoading: true,
  saving: false,
  saved: false,
  displayName: "",
  imageId: null,
  errorMsg: "",
  saveErrorMsg: "",
  inputImageFile: null,
  inputImageUri: "",
  inputDisplayName: "",
  inputRules: "",
  inputLight: false,
  inputMiddle: false,
  inputHeavy: false,
  inputAge: "default",
  inputAbout: ""
};

const playerProfileSuccess = (state, action) => {

  return {
    ...state,
    loading: false,
    imageLoading: false,
    saving: false,
    displayName: action.displayName,
    imageId: action.imageId,
    inputDisplayName: action.inputDisplayName,
    inputRules: action.inputRules,
    inputLight: action.inputLight,
    inputMiddle: action.inputMiddle,
    inputHeavy: action.inputHeavy,
    inputAge: action.inputAge,
    inputAbout: action.inputAbout
  };
};

const playerProfileFail = (state, action) => {

  return {
    ...state,
    loading: false,
    imageLoading: false,
    saving: false,
    errorMsg: action.message
  };
};

const inputImageChanged = (state, action) => {

  return {
    ...state,
    inputImageFile: action.file,
    inputImageUri: action.uri
  };
};

const uploadImageSuccess = (state, action) => {

  return {
    ...state,
    imageLoading: false,
    inputImageFile: null,
    inputImageUri: "",
    imageId: action.imageId
  };
};

const uploadImageFail = (state, action) => {

  return {
    ...state,
    imageLoading: false,
    inputImageFile: null,
    inputImageUri: ""
  };
};

const startUpload = (state, action) => {

  return {
    ...state,
    imageLoading: true
  };
};

const profInputDisplayNameChanged = (state, action) => {

  return {
    ...state,
    inputDisplayName: action.inputDisplayName
  };
};

const inputRulesChanged = (state, action) => {

  return {
    ...state,
    inputRules: action.inputRules
  };
};

const inputLightChanged = (state, action) => {

  return {
    ...state,
    inputLight: action.inputLight
  };
};

const inputMiddleChanged = (state, action) => {

  return {
    ...state,
    inputMiddle: action.inputMiddle
  };
};

const inputHeavyChanged = (state, action) => {

  return {
    ...state,
    inputHeavy: action.inputHeavy
  };
};

const inputAgeChanged = (state, action) => {

  return {
    ...state,
    inputAge: action.inputAge
  };
};

const inputAboutChanged = (state, action) => {

  return {
    ...state,
    inputAbout: action.inputAbout
  };
};

const startSave = (state, action) => {

  return {
    ...state,
    saving: true
  };
};

const profileSaveSuccess = (state, action) => {

  return {
    ...state,
    saving: false,
    saved: true,
    saveErrorMsg: ""
  };
};

const profileSaveFail = (state, action) => {

  return {
    ...state,
    saving: false,
    saveErrorMsg: action.saveErrorMsg
  };
};

const hideSaved = (state, action) => {

  return {
    ...state,
    saved: false
  };
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.PLAYER_PROFILE_SUCCESS: return playerProfileSuccess(state, action);
    case actionTypes.PLAYER_PROFILE_FAIL: return playerProfileFail(state, action);
    case actionTypes.INPUT_IMAGE_CHANGED: return inputImageChanged(state, action);
    case actionTypes.UPLOAD_IMAGE_SUCCESS: return uploadImageSuccess(state, action);
    case actionTypes.UPLOAD_IMAGE_FAIL: return uploadImageFail(state, action);
    case actionTypes.START_UPLOAD: return startUpload(state, action);
    case actionTypes.PROF_INPUT_DISPLAY_NAME_CHANGED: return profInputDisplayNameChanged(state, action);
    case actionTypes.INPUT_RULES_CHANGED: return inputRulesChanged(state, action);
    case actionTypes.INPUT_LIGHT_CHANGED: return inputLightChanged(state, action);
    case actionTypes.INPUT_MIDDLE_CHANGED: return inputMiddleChanged(state, action);
    case actionTypes.INPUT_HEAVY_CHANGED: return inputHeavyChanged(state, action);
    case actionTypes.INPUT_AGE_CHANGED: return inputAgeChanged(state, action);
    case actionTypes.INPUT_ABOUT_CHANGED: return inputAboutChanged(state, action);
    case actionTypes.START_SAVE: return startSave(state, action);
    case actionTypes.PROFILE_SAVE_SUCCESS: return profileSaveSuccess(state, action);
    case actionTypes.PROFILE_SAVE_FAIL: return profileSaveFail(state, action);
    case actionTypes.HIDE_SAVED: return hideSaved(state, action);
    default: return state;
  }
};

export default reducer;
