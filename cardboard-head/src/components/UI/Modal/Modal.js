import React from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {

  return (

    <>
      <Backdrop clicked={props.modalClosed} />
      <div className={classes.Modal}>
        <div className={classes.Close} onClick={props.modalClosed}>X</div>
        {props.children}
      </div>
    </>
  );
};

export default modal;
