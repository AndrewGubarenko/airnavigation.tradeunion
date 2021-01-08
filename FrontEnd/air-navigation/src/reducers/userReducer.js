import {SET_IS_AUTHENTICATED} from './actions/userAction';

const userReducer = (state = {isAuthenticated: false,
                                         user: null,
                                         isAdmin: false}, action) => {
  if(action.type === SET_IS_AUTHENTICATED) {
    return Object.assign({}, state, {
          isAuthenticated: action.isAuthenticated,
          user: action.user
        });
  }
  return state;
};

export default userReducer;
