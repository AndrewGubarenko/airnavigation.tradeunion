import React from 'react';
import Authentication from '../components/authentication';
import {connect} from 'react-redux';
import {setIsAuthenticated} from './../reducers/actions/userAction';
import {setAdminDisplayMode} from './../reducers/actions/AdminAction';
import {setIsAuthContainerVisible} from './../reducers/actions/AuthContainerAction';
import {animateScroll} from 'react-scroll';
import {userService} from './../app-context/context';
import {setNews} from './../reducers/actions/newsAction';
import {setFiles} from './../reducers/actions/fileAction';
import {setSpinnerVisibility} from './../reducers/actions/spinnerAction';
import {sypherService} from './../app-context/context';

let CryptoJS = require("crypto-js");

class AuthenticationContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      rememberMe: false,
      borderColorEmail: "darkgrey",
      borderColorPassword: "darkgrey",
      message:""
    };
  }

  componentWillUnmount() {
    this.setState({email: ""});
    this.setState({password: ""});
    this.setState({rememberMe: false});
  }

  onChangeEmail = (event) => {
    this.setState({borderColorEmail: "darkgrey"});
    this.setState({email: event.target.value});
  }

  onChangePassword = (event) => {
    this.setState({borderColorPassword: "darkgrey"});
    this.setState({password: event.target.value});
  }

  onChangeRememberMe = (event) => {
    if (!this.state.rememberMe) {
      this.setState({rememberMe: true});
    } else {
      this.setState({rememberMe: false});
    }
  }

  onClickSignUp = async () => {
    if(this.state.email === "") {
      this.setState({borderColorEmail: "red"});
    } else if(this.state.password === "") {
      this.setState({borderColorPassword: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      let user_object = {username: this.cypherThis(this.state.email),
                         password: this.cypherThis(this.state.password),
                         remember_me: this.state.rememberMe}
      await userService.authenticate(user_object).then(response => {
        if(response.redirected && response.ok) {
          response.json().then(representation => {
            this.props.dispatch(setNews(representation.newsList));
            this.props.dispatch(setFiles(representation.fileList, "block"));
            if(representation.authorizedUser.roles.includes("ADMINISTRATOR")) {
              this.props.dispatch(setIsAuthenticated(true, representation.authorizedUser, true));
              this.props.dispatch(setAdminDisplayMode("block"));
            } else {
              this.props.dispatch(setIsAuthenticated(true, representation.authorizedUser, false));
            }
          });
        } else {
          this.setState({message: "Не вдалося авторизуватися. Спробуйте ще."});
          this.setState({email: ""});
          this.setState({password: ""});
          this.setState({rememberMe: false});
        }
      });
      this.props.dispatch(setSpinnerVisibility("none"));
    }
  }

  onClickClose = () => {
    this.props.dispatch(setIsAuthContainerVisible("none"));
    animateScroll.scrollToTop();
  }

  cypherThis = (text) => {
    let iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    let salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    if(text) {
      let ciphertext = sypherService.encrypt(salt, iv, text);

      let aesString = (iv + "::" + salt + "::" + ciphertext);
      let cryptedString = btoa(aesString);
      return cryptedString;
    } else {
      return text;
    }
  }

  decypherThis = (encryptedText) => {
    if(encryptedText) {
      let decodedText = atob(encryptedText);
      let aesString = decodedText.split("::");
      let ciphertext = aesString[2];
      let decryptedText = sypherService.decrypt(aesString[1], aesString[0], ciphertext);
      return decryptedText;
    } else {
      return encryptedText;
    }
  }

  render() {
    return(
      <Authentication
        {...this.state}
        onChangeEmail={this.onChangeEmail}
        onChangePassword={this.onChangePassword}
        onChangeRememberMe={this.onChangeRememberMe}
        onClickSignUp={this.onClickSignUp}
        isAuthVisible={this.props.isAuthVisible}
        onClickClose={this.onClickClose}
        borderColorEmail={this.state.borderColorEmail}
        borderColorPassword={this.state.borderColorPassword}
        />
    );
  }

}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    news: state.news,
    files: state.files,
    user: state.user,
    isAuthenticated: state.user.isAuthenticated,
    isAuthVisible: state.authContainer.isAuthVisible,
    adminDisplayMode: state.adminDisplayMode,
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(AuthenticationContainer);
