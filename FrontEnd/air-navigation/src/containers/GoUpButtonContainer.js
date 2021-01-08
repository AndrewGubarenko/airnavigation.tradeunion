import React from 'react';
import GO_UP_BUTTON from './../statics/GoUpBtn.png';
import './../styles/goUpButtonStyle.css';
import {scroller} from 'react-scroll';

class GoUpButtonContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayGoUpButton: "none"
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScrollGoUpButton);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollGoUpButton);
  }

  onClickGoUpButton = () => {
    scroller.scrollTo("logo", {
      spy: true,
      smooth: true,
      offset:-70,
      duration: 500
    });
  }

  onScrollGoUpButton = (event) => {
    if (window.scrollY === 0 && this.state.displayGoUpButton === "block") {
        this.setState({displayGoUpButton: "none"});
    }
    else if (window.scrollY !== 0 && this.state.displayGoUpButton === "none") {
        this.setState({displayGoUpButton: "block"});
    }
  }

  render() {
    return(
      <div className="go_up_button" style={{display: this.state.displayGoUpButton}}>
        <img  id="goUp"
              src={GO_UP_BUTTON}
              alt=""
              onClick={this.onClickGoUpButton}/>
      </div>
    );
  }
}
export default GoUpButtonContainer;