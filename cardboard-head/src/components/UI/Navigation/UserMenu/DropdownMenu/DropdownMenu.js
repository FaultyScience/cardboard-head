import React from "react";

import classes from "./DropdownMenu.module.css";
import InvisBackdrop from "../../../InvisBackdrop/InvisBackdrop";
import NavigationItem from "./NavigationItem/NavigationItem";

const dropdown = (props) => {

  return (

    <nav className={classes.DropdownMenu}>
      <InvisBackdrop clicked={props.close} />
      <ul onClick={props.close}>
        <NavigationItem link="/profile" exact>
          Profile
        </NavigationItem>
        <div onClick={props.logout}>
          <NavigationItem link="/" exact>
            Logout
          </NavigationItem>
        </div>
      </ul>
    </nav>
  );
};

export default dropdown;
