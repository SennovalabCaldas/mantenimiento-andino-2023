import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";
import userReducer from "../reducers/userReducer";
import sedeReducer from "../reducers/sedeReducer";
import categoryReducer from "../reducers/categoryReducer";
import postReducer from "../reducers/postReducer";
import addressReducer from "../reducers/addressReducer";
import menuReducer from "../reducers/menuReducer";
import clientReducer from "../reducers/clientReducer";
import categoryServiceReducer from "../reducers/categoryServiceReducer";
import serviceReducer from "../reducers/serviceReducer";
import supplierReducer from "../reducers/supplierReducer";
import allyReducer from "../reducers/allyReducer";
import projectReducer from "../reducers/projectReducer";
import foundationReducer from "../reducers/foundationReducer";

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
  categoryService: categoryServiceReducer,
  supplier: supplierReducer,
  ally: allyReducer,
  project: projectReducer,
  foundation: foundationReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
