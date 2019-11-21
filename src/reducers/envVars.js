//Переменные, переданные, через ? в url
import * as ConnectedReactRouter from "connected-react-router";
import Utils from "utils/Utils";

export default (state = {}, action) => {
  const { type, payload } = action;
  let newState = state;
  if (type === ConnectedReactRouter.LOCATION_CHANGE) {
    const { location: { search } } = payload;
    newState = {
      ...state,
      ...Utils.parseQueryString(search)
    };
  }
  return newState;
};
