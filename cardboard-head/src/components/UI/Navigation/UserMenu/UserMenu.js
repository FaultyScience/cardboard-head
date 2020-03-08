import React from "react";

import classes from "./UserMenu.module.css";
import Hamburger from "./Hamburger/Hamburger";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

const userMenu = (props) => {

  const dropdownMenu = <DropdownMenu
    close={props.closeDropdownMenu}
    logout={props.logout}
  />;

  return (

    <div className={classes.UserMenu}>
      <div onClick={props.clicked}>
        <span>{props.displayName}</span>
        <div className={classes.Wrapper}>
          <Hamburger />
        </div>
      </div>
      {props.showDropdownMenu ? dropdownMenu : null}
    </div>
  );
};

export default userMenu;
