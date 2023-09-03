import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";
import userReducer from "../reducers/userReducer";
import sedeReducer from "../reducers/sedeReducer";
import categoryReducer from "../reducers/categoryReducer";
import postReducer from "../reducers/postReducer";
import addressReducer from "../reducers/addressReducer";
import menuReducer from "../reducers/menuReducer";
import serviceReducer from "../reducers/serviceReducer";
import clientReducer from "../reducers/clientReducer";

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  address: addressReducer,
  sede: sedeReducer,
  category: categoryReducer,
  post: postReducer,
  menu: menuReducer,
  service: serviceReducer,
  client: clientReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
