import * as ConnectedReactRouter from "connected-react-router";
import RoutesConfig from "const/RoutesConfig";

export default () => {
  let lastPathname = RoutesConfig.MAIN.path;
  return (next) => (action) => {
    const { type, payload } = action;
    if (type === ConnectedReactRouter.LOCATION_CHANGE) {
      const { location } = payload;
      const newAction = {
        ...action,
        payload: {
          ...payload,
          location: {
            ...location,
            lastPathname
          }
        }
      };
      const { location: { pathname } } = payload;
      lastPathname = pathname;
      return next(newAction);
    }
    return next(action);
  };
};
