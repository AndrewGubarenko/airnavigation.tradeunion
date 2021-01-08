const SET_FILES = "SET_FILES";

const setFiles = (listOfFiles) => {
  let action = {
    type: SET_FILES,
    listOfFiles: listOfFiles
  };
  return action;
};

export {SET_FILES, setFiles}
