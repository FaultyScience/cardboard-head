import React from "react";

import classes from "./Signup.module.css";
import Modal from "../../UI/Modal/Modal";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import Spinner from "../../UI/Spinner/Spinner";

const signup = (props) => {

  const keyEnter = (e) => {

    if (e.key === "Enter") {

      props.signupClicked(props.loggingIn, props.signingUp,
                          props.inputEmail, props.inputPassword,
                          props.inputPassword2, props.inputDisplayName,
                          props.emailRef, props.passwordRef,
                          props.password2Ref, props.displayNameRef);
    }
  };

  const signupInner = (

    <>
      <label>Email</label>
      <input type="textbox"
             ref={props.emailRef}
             value={props.inputEmail}
             onChange={props.inputEmailChanged}
             onKeyDown={keyEnter}
      />
      <label>Display Name</label>
      <input type="textbox"
             ref={props.displayNameRef}
             value={props.inputDisplayName}
             onChange={props.inputDisplayNameChanged}
             onKeyDown={keyEnter}
      />
      <label>Password</label>
      <input type="textbox"
             ref={props.passwordRef}
             value={props.inputPassword}
             onChange={props.inputPasswordChanged}
             onKeyDown={keyEnter}
      />
      <label>Confirm password</label>
      <input type="textbox"
             ref={props.password2Ref}
             value={props.inputPassword2}
             onChange={props.inputPassword2Changed}
             onKeyDown={keyEnter}
      />
      <div className={classes.Wrapper}
           onClick={() => props.signupClicked(props.loggingIn,
                                              props.signingUp,
                                              props.inputEmail,
                                              props.inputPassword,
                                              props.inputPassword2,
                                              props.inputDisplayName,
                                              props.emailRef,
                                              props.passwordRef,
                                              props.password2Ref,
                                              props.displayNameRef)}
        >
        <div className={classes.Button}>
          <span>Sign up</span>
        </div>
      </div>
    </>
  );

  const spinner = <div className={classes.Spinner}><Spinner /></div>;
  const signupMsg = <div className={classes.SignupMsg}><p>Signing up...</p></div>;

  return (

    <Modal modalClosed={props.modalClosed}>
      <ErrorMsg show={props.errorMsg} align="left" msg={props.errorMsg} />
      <div className={classes.Signup}>
        {!props.signingUp ? signupInner : null}
        {props.signingUp ? spinner : null}
        {props.signingUp ? signupMsg : null}
      </div>
    </Modal>
  );
};

export default signup;
