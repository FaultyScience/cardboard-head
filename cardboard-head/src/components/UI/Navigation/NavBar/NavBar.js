import React from "react";

import classes from "./NavBar.module.css";
import NavItem from "./NavItem/NavItem";

const navbar = (props) => {

  return (

    <div className={classes.OuterWrapper}>
      <div className={classes.NavBar}>
        <div className={classes.Wrapper}>
          <ul>
            <NavItem link="/find-games" exact>Find Games</NavItem>
            <NavItem link="/host-game" exact>Host a Game</NavItem>
            <NavItem link="/pending-requests" exact>Pending Requests</NavItem>
            <NavItem link="/upcoming-games" exact>Upcoming Games</NavItem>
            <NavItem link="/past-games" exact>Past Games</NavItem>
            <NavItem link="/profile" exact>Profile</NavItem>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default navbar;
