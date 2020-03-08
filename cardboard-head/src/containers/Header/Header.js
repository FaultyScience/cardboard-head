import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Header.module.css";
import * as actions from "../../store/actions/index";
import Login from "../../components/Header/Login/Login";
import Signup from "../../components/Header/Signup/Signup";
import UserMenu from "../../components/UI/Navigation/UserMenu/UserMenu";

class Header extends Component {

  emailRef = React.createRef();
  passwordRef = React.createRef();
  password2Ref = React.createRef();
  displayNameRef = React.createRef();

  render() {

    const login = (

      <div className={classes.LoginButton}>
        <span onClick={this.props.onClickLogin}>Login</span>
      </div>
    );

    const signup = (

      <div className={classes.Wrapper} onClick={this.props.onClickSignup}>
        <div className={classes.SignupButton}>
          <span>Sign up</span>
        </div>
      </div>
    );

    const userMenu = <UserMenu
      displayName={this.props.displayName}
      clicked={this.props.onUserMenuClicked}
      showDropdownMenu={this.props.showDropdownMenu}
      closeDropdownMenu={this.props.onCloseDropdownMenu}
      logout={this.props.onLogout}
    />;

    const loginModal = <Login
      modalClosed={this.props.onLoginClose}
      loginClicked={this.props.onProcessLogin}
      loggingIn={this.props.loggingIn}
      signingUp={this.props.signingUp}
      emailRef={this.emailRef}
      inputEmailChanged={this.props.onInputEmailChanged}
      passwordRef={this.passwordRef}
      inputPasswordChanged={this.props.onInputPasswordChanged}
      errorMsg={this.props.errorMsg}
      inputEmail={this.props.inputEmail}
      inputPassword={this.props.inputPassword}
    />;

    const signupModal = <Signup
      modalClosed={this.props.onSignupClose}
      signupClicked={this.props.onProcessSignup}
      loggingIn={this.props.loggingIn}
      signingUp={this.props.signingUp}
      emailRef={this.emailRef}
      inputEmailChanged={this.props.onInputEmailChanged}
      passwordRef={this.passwordRef}
      inputPasswordChanged={this.props.onInputPasswordChanged}
      password2Ref={this.password2Ref}
      inputPassword2Changed={this.props.onInputPassword2Changed}
      displayNameRef={this.displayNameRef}
      inputDisplayNameChanged={this.props.onInputDisplayNameChanged}
      errorMsg={this.props.errorMsg}
      inputEmail={this.props.inputEmail}
      inputPassword={this.props.inputPassword}
      inputPassword2={this.props.inputPassword2}
      inputDisplayName={this.props.inputDisplayName}
    />;

    return (

      <div className={classes.Header}>
        {!this.props.isLoggedIn ? login : null}
        {!this.props.isLoggedIn ? signup : null}
        {this.props.isLoggedIn ? userMenu : null}
        {this.props.showLogin ? loginModal : null}
        {this.props.showSignup ? signupModal : null}
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    showLogin: state.auth.showLogin,
    showSignup: state.auth.showSignup,
    loggingIn: state.auth.loggingIn,
    signingUp: state.auth.signingUp,
    isLoggedIn: state.auth.token !== null,
    inputEmail: state.auth.inputEmail,
    inputPassword: state.auth.inputPassword,
    inputPassword2: state.auth.inputPassword2,
    inputDisplayName: state.auth.inputDisplayName,
    errorMsg: state.auth.errorMsg,
    displayName: state.auth.displayName,
    showDropdownMenu: state.nav.showDropdownMenu
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onClickLogin: () => dispatch(actions.showLogin()),
    onLoginClose: () => dispatch(actions.loginClose()),
    onClickSignup: () => dispatch(actions.showSignup()),
    onSignupClose: () => dispatch(actions.signupClose()),

    onProcessLogin: (loggingIn, signingUp, email, pw, emailRef, pwInput) => {
      return dispatch(actions.processLogin(loggingIn, signingUp, email, pw, emailRef, pwInput));
    },

    onProcessSignup: (loggingIn, signingUp, email, pw, pw2, name, emailRef, pwInput, pw2Input, displayNameRef) => {
      return dispatch(actions.processSignup(loggingIn, signingUp, email, pw, pw2, name, emailRef, pwInput, pw2Input, displayNameRef));
    },

    onLogout: () => dispatch(actions.logout()),
    onInputEmailChanged: (event) => dispatch(actions.inputEmailChanged(event.target.value)),
    onInputPasswordChanged: (event) => dispatch(actions.inputPasswordChanged(event.target.value)),
    onInputPassword2Changed: (event) => dispatch(actions.inputPassword2Changed(event.target.value)),
    onInputDisplayNameChanged: (event) => dispatch(actions.inputDisplayNameChanged(event.target.value)),
    onUserMenuClicked: () => dispatch(actions.userMenuClicked()),
    onCloseDropdownMenu: () => dispatch(actions.closeDropdownMenu())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
