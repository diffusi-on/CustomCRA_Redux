import * as ConnectedReactRouter from "connected-react-router";
import * as Redux from "redux";
import * as ReduxDevToolsExt from "redux-devtools-extension";
import Config from "const/Config";
import Thunk from "redux-thunk";

//Импорт middlewares
import lastRouterPath from "middlewares/lastRouterPath";
import saveDataToStorage from "middlewares/saveDataToStorage";

//Импорт reducers
import envVars from "reducers/envVars";
import main from "reducers/main";

let store = null;

export const getStore = () => {
  return store;
};

export const getState = () => {
  if (!store) return null;
  return store.getState();
};

export const createStore = ({ history, userData = null }) => {
  const initialState = {
    envVars,
    main: {
      user: userData,
      data: [],
      dataFetching: false
    }
  };
  store = Redux.createStore(
    Redux.combineReducers({
      router: ConnectedReactRouter.connectRouter(history),
      envVars,
      main
    }),
    initialState,
    ReduxDevToolsExt.composeWithDevTools({
      serialize: true,
      trace: true,
      traceLimit: Config.REDUX_DEV_TOOLS_TRACE_LIMIT
    })(
      Redux.applyMiddleware(
        Thunk.withExtraArgument({ history }),
        ConnectedReactRouter.routerMiddleware(history),
        lastRouterPath,
        saveDataToStorage
      )
    )
  );
  return store;
};

export default {
  getStore,
  getState,
  createStore
};
