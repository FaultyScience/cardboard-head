import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import Header from "../Header/Header";
import Banner from "../../components/Banner/Banner";

class Home extends Component {

  componentDidMount() {
    if (localStorage.getItem("sellswordToken")) { this.props.onInitLoggedIn(); }
  }

  render() {

    return (

      <>
        <Header />
        <Banner />
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onInitLoggedIn: () => dispatch(actions.initLoggedIn())
  };
};

export default connect(null, mapDispatchToProps)(Home);
