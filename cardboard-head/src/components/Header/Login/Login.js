import React from "react";

import classes from "./Login.module.css";
import Modal from "../../UI/Modal/Modal";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import Spinner from "../../UI/Spinner/Spinner";

const login = (props) => {

  const keyEnter = (e) => {

    if (e.key === "Enter") {

      props.loginClicked(props.loggingIn, props.signingUp,
                         props.inputEmail, props.inputPassword,
                         props.emailRef, props.passwordRef);
    }
  };

  const loginInner = (

    <>
      <label>Email</label>
      <input type="textbox"
             ref={props.emailRef}
             value={props.inputEmail}
             onChange={props.inputEmailChanged}
             onKeyDown={keyEnter}
      />
      <label>Password</label>
      <input type="textbox"
             ref={props.passwordRef}
             value={props.inputPassword}
             onChange={props.inputPasswordChanged}
             onKeyDown={keyEnter}
      />
      <div className={classes.Wrapper}
           onClick={() => props.loginClicked(props.loggingIn,
                                             props.signingUp,
                                             props.inputEmail,
                                             props.inputPassword,
                                             props.emailRef,
                                             props.passwordRef)}
        >
        <div className={classes.Button}>
          <span>Login</span>
        </div>
      </div>
    </>
  );

  const spinner = <div className={classes.Spinner}><Spinner /></div>;
  const loginMsg = <div className={classes.LoginMsg}><p>Logging in...</p></div>;

  return (

    <Modal modalClosed={props.modalClosed}>
      <ErrorMsg show={props.errorMsg} align="left" msg={props.errorMsg} />
      <div className={classes.Login}>
        {!props.loggingIn ? loginInner : null}
        {props.loggingIn ? spinner : null}
        {props.loggingIn ? loginMsg : null}
      </div>
    </Modal>
  );
};

export default login;
