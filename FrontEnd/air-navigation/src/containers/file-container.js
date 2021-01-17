import React from 'react';
import File from '../components/file'

class FileContainer extends React.Component {

  render() {
    return(
      <File
        key={this.props.file.id}
        file={this.props.file}
        />
    );
  }
}

export default FileContainer;
