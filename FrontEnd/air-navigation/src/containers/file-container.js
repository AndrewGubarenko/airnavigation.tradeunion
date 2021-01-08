import React from 'react';
import File from '../components/file'

class FileContainer extends React.Component {

  render() {
    return(
      <File
        name={this.props.name}
        path={this.props.path}
        />
    );
  }
}

export default FileContainer;
