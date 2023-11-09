import {
  CREATE_DEPARTMENT,
  CREATE_DEPARTMENT_FAILURE,
  GET_ALL_DEPARTMENTS,
  DELETE_DEPARTMENTS_SUCCESS,
  DELETE_DEPARTMENTS_FAILURE,
} from "../actions/types";

const initialState = {
  department: {
    _id: null,
    departmentName: null,
  },
  departments: [],
};

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT:
      return {
        ...state,
        department: action.payload,
      };
    case CREATE_DEPARTMENT_FAILURE:
      return {
        ...state,
        department: action.payload,
      };
    case GET_ALL_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case DELETE_DEPARTMENTS_SUCCESS:
      console.log("Action:", action.payload);
      return {
        ...state,
        departments: state.departments.filter(
          (department) => !action.payload.includes(department._id)
        ),
      };
    case DELETE_DEPARTMENTS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default departmentReducer;
