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
      let user_object = {username: this.state.email,
                         password: this.state.password,
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
