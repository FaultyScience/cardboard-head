import React from "react";

import classes from "./ErrorMsg.module.css";
import fail from "../../../assets/images/fail.png";

const errorMsg = (props) => {

  const img = props.show ? <img src={fail} alt="x" className={classes.Fail} /> : null;

  let errorMsgClasses = [classes.ErrorMsg];

  if (props.align === "left") {
    errorMsgClasses.push(classes.Left);
  } else {
    errorMsgClasses.push(classes.Center);
  }

  errorMsgClasses = errorMsgClasses.join(" ");
  
  return (

    <div className={errorMsgClasses}>
      <p>{img}{props.msg}</p>
    </div>
  );
};

export default errorMsg;
