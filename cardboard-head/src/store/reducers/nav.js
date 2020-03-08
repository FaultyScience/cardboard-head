import * as actionTypes from "../actions/actionTypes";

const initialState = {
  showDropdownMenu: false
};

const userMenuClicked = (state, action) => {

  return {
    ...state,
    showDropdownMenu: true
  };
};

const closeDropdownMenu = (state, action) => {
  
  return {
    ...state,
    showDropdownMenu: false
  };
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.USER_MENU_CLICKED: return userMenuClicked(state, action);
    case actionTypes.CLOSE_DROPDOWN_MENU: return closeDropdownMenu(state, action);
    default: return state;
  }
};

export default reducer;
