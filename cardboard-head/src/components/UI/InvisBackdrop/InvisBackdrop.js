import React from "react";

import classes from "./InvisBackdrop.module.css";

const invis = (props) => (
  <div className={classes.InvisBackdrop} onClick={props.clicked}></div>
);

export default invis;
