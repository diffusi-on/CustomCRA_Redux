import Config from "const/Config";
import makeUuid from "uuid/v4";

export const AUTH_USER = "MAIN/authUser";

export const LOGOUT_USER = "MAIN/logoutUser";

export const FETCHING_ITEM = "MAIN/fetchingItem";

export const ADD_ITEM = "MAIN/addItem";

export const REMOVE_ITEM = "MAIN/removeItem";

export const authUser = (login) => {
  return { type: AUTH_USER, payload: { login, token: makeUuid() } };
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

export const addItem = () => {
  return async(dispatch) => {
    dispatch({ type: FETCHING_ITEM });
    const response = await fetch(Config.DATA_API_URL);
    const { results: [user] } = await response.json();
    dispatch({ type: ADD_ITEM, payload: { item: user } });
    return user;
  };
};

export const removeItem = (uuid) => {
  return { type: REMOVE_ITEM, payload: { uuid } };
};
