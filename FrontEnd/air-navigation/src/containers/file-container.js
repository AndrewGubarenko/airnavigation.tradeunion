import React from 'react';
import File from '../components/file';

class FileContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrowFilesClassName: "expandArrow",
      filesArray: []
    };
  }

  componentDidMount() {
    if(this.props.isAuthenticated) {
      this.setFiles();
    }
  }

  componentWillUnmount() {
    this.setState({filesArray: []});
  }

  setFiles = () => {
    let shortFilesArray = [];
    if (this.props.files.length) {
    for (let i = 0; i < this.props.files.length && i < 4; i++) {
        shortFilesArray[i] = <File
          key={this.props.files[i].id}
          file={this.props.files[i]}
           />
      }
    } else {
      shortFilesArray[0] = <p key="zeroFiles">Покищо немає файлів..</p>
    }
    this.setState({filesArray: shortFilesArray});
  }

  expandFiles = () => {
    let longFilesArray = [];
    if (this.props.files.length) {
      this.props.files.forEach((file, i) => {
        longFilesArray[i] = <File
          key={file.id}
          file={file}
           />
      });
    } else {
      longFilesArray[0] = <p key="zeroFiles">Покищо немає файлів..</p>
    }
    this.setState({filesArray: longFilesArray});
  }

  onClickExpandArrowFiles = () => {
    if (this.state.arrowFilesClassName === "expandArrow") {
      this.setState({arrowFilesClassName: "expandArrow open"});
      this.expandFiles();
    } else if (this.state.arrowFilesClassName === "expandArrow open") {
      this.setState({arrowFilesClassName: "expandArrow"});
      this.setFiles();
    }
  }

  render() {
    return(
      <div id="file__container" className="standart-container" style={{display: this.props.displayFiles}}>
        <p className="container-name">Файли</p>
        <div className="border-plane-container">
          <div className="standart-container-line">
            <svg className="svg-plane-icon">
              <use xlinkHref="#svg-plane"/>
            </svg>
          </div>
        </div>

        <div className="news-grid-container">
          {this.state.filesArray}
        </div>

        <div className={this.state.arrowFilesClassName} onClick={this.onClickExpandArrowFiles}>
            <span className="expandArrow-left"></span>
            <span className="expandArrow-right"></span>
        </div>

      </div>
    );
  }
}

export default FileContainer;
