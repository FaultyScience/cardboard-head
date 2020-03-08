import React from "react";

import classes from "./ProfileImg.module.css";
import * as c from "../../../resources/constants";

const profileImg = (props) => {

  const urlString = c.BASE_URL + "/get-user-image/" + props.uid + "/" + props.iid;
  const uri = props.inputImageUri ? props.inputImageUri : urlString;

  return (
    <img className={classes.ProfileImg} src={uri} alt="" />
  );
};

export default profileImg;
