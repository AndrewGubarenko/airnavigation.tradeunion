import React from 'react';
import FILE from './../statics/file-cool.png';

class File extends React.Component {
  render() {
    return(
      <div className="news-container">
        <div id="news__icon">
          <img id="news__icon__img" src={FILE} alt=""/>
        </div>
        <div className="news-theme-container">
          <a id="news-theme" href={this.props.path} target="blank">
            {this.props.name}
          </a>
        </div>
      </div>
    );
  }
}
export default File
