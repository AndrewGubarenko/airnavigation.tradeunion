import React from 'react';
import News from '../components/news'

class NewsContainer extends React.Component {

  render() {
    return(
      <News
        singleNew={this.props.singleNew}
        />
    );
  }
}

export default NewsContainer;
