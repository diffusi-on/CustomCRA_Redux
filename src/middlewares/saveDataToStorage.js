import { AUTH_USER, LOGOUT_USER } from "actions/main";
import Config from "const/Config";
import Utils from "utils/Utils";

export default () => {
  return (next) => (action) => {
    const { type, payload } = action;
    if (type === AUTH_USER) {
      Utils.storageValue(Config.AUTH_LS_KEY, JSON.stringify(payload));
    }
    if (type === LOGOUT_USER) {
      Utils.storageValue(Config.AUTH_LS_KEY, null);
    }
    return next(action);
  };
};
