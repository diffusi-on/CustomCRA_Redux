import * as MainActions from "actions/main";

export default (state = {}, action) => {
  const { type, payload } = action;
  let newState = state;
  switch (type) {
    case MainActions.AUTH_USER:
      newState = {
        ...state,
        user: { login: payload.login, token: payload.token }
      };
      break;
    case MainActions.LOGOUT_USER:
      newState = { ...state, user: null };
      break;
    case MainActions.FETCHING_ITEM:
      newState = { ...state, dataFetching: true };
      break;
    case MainActions.ADD_ITEM:
      newState = {
        ...state,
        data: [...state.data, payload.item],
        dataFetching: false
      };
      break;
    case MainActions.REMOVE_ITEM:
      newState = {
        ...state,
        data: state.data.filter(({ login }) => login.uuid !== payload.uuid)
      };
      break;
  }
  return newState;
};
