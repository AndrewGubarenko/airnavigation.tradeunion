import React from 'react';
import Authentication from '../components/authentication';
import {connect} from 'react-redux';
import {setIsAuthenticated} from './../reducers/actions/userAction';
import {setAdminDisplayMode} from './../reducers/actions/AdminAction';
import {setIsAuthContainerVisible} from './../reducers/actions/AuthContainerAction';
import {animateScroll} from 'react-scroll';
import {userService} from './../app-context/context';
import {setSpinnerVisibility} from './../reducers/actions/spinnerAction';

class AuthenticationContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      borderColorEmail: "darkgrey",
      borderColorPassword: "darkgrey",
      message:""
    };
  }

  onChangeEmail = (event) => {
    this.setState({borderColorEmail: "darkgrey"});
    this.setState({email: event.target.value});
  }

  onChangePassword = (event) => {
    this.setState({borderColorPassword: "darkgrey"});
    this.setState({password: event.target.value});
  }

  onClickSignUp = async () => {
    if(this.state.email === "") {
      this.setState({borderColorEmail: "red"});
    } else if(this.state.password === "") {
      this.setState({borderColorPassword: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      await userService.getUser(1)
                      .then(response => {
                        if(response.ok) {
                          response.json().then(user => {
                            if(user){
                              this.props.dispatch(setIsAuthenticated(true, user));
                              if(user.roles.includes("ADMINISTRATOR")) {
                                this.props.dispatch(setAdminDisplayMode("block"));
                              }
                            }
                            this.setState({email: ""});
                            this.setState({password: ""});
                          });
                        } else {
                          return response.text().then(message => {
                            this.setState({message: message});
                            this.setState({email: ""});
                            this.setState({password: ""});
                          })
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
    user: state.user,
    isAuthenticated: state.user.isAuthenticated,
    isAuthVisible: state.authContainer.isAuthVisible,
    adminDisplayMode: state.adminDisplayMode,
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(AuthenticationContainer);
