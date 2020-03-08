import * as actionTypes from "./actionTypes";

export const userMenuClicked = () => {

  return {
    type: actionTypes.USER_MENU_CLICKED
  };
};

export const closeDropdownMenu = () => {
  
  return {
    type: actionTypes.CLOSE_DROPDOWN_MENU
  };
};
