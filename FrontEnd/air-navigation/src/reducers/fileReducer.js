import {SET_FILES} from './actions/fileAction';

const fileReducer = (state, action) => {
  if(action.type === SET_FILES) {
    return Object.assign({}, state, {
            listOfFiles: action.listOfFiles
        })
  }
  return state;
};

export default fileReducer;
