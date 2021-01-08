import {SET_IS_AUTH_CONTAINER_VISIBLE} from './actions/AuthContainerAction';

let startState = {
  isAuthVisible: "none"
};

const authContainerReducer = (state = startState, action) => {
  if(action.type === SET_IS_AUTH_CONTAINER_VISIBLE) {
    return {
      ...state,
      isAuthVisible: action.isAuthVisible
    };
  }
  return state;
};

export default authContainerReducer;
