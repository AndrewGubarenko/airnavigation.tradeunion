import React from 'react';
import Header from './../components/header';
import {connect} from 'react-redux';
import {setIsAuthenticated} from './../reducers/actions/userAction';
import {setIsAuthContainerVisible} from './../reducers/actions/AuthContainerAction';
import {setAdminDisplayMode} from './../reducers/actions/AdminAction'
import {scroller} from 'react-scroll';

class HeaderContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      adminLinkColor: "red"
    };
  }

  showLoginForm = async () => {
    if(this.props.location.pathname === "/main") {
      await this.props.dispatch(setIsAuthContainerVisible("block"));
      scroller.scrollTo("auth__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    } else {
      await this.props.history.push("/main");
      await this.props.dispatch(setIsAuthContainerVisible("block"));
      scroller.scrollTo("auth__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    }
  }

  onClickToNews = async () => {
    if(this.props.location.pathname === "/main") {
      scroller.scrollTo("news__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    } else {
      await this.props.history.push("/main");
      scroller.scrollTo("news__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    }
  }

  onClickToFiles = async () => {
    if(this.props.location.pathname === "/main") {
      scroller.scrollTo("file__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    } else {
      await this.props.history.push("/main");
      scroller.scrollTo("file__container", {
        spy: true,
        smooth: true,
        offset:-70,
        duration: 500
      });
    }
  }

  onMouseEnter = () => {
    this.setState({adminLinkColor: "#990033"});
  }
  onMouseLeave = () => {
    this.setState({adminLinkColor: "red"});
  }

  onClickToMain = () => {
    this.props.history.push("/main");
  }
  onClickToAdmin = (event) => {
    this.props.history.push("/admin");
  }

  logInOrLogOut = () => {
      if (this.props.isAuthenticated) {
        return(
          <li className="menu-li"
              onClick={() => {
                this.props.history.push("/main");
                this.props.dispatch(setIsAuthenticated(false));
                this.props.dispatch(setIsAuthContainerVisible("none"));
                this.props.dispatch(setAdminDisplayMode("none"));
              }}>Вийти</li>
        );
      } else {
        return(
          <li className="menu-li">
            <div key="logInDiv" onClick={this.showLoginForm}
            >Увійти</div>
          </li>
        );
      }
  }

  onClickLogo = () => {
    this.props.history.push("/main");
  }

  render() {
    return(
      <Header
        adminLinkColor={this.state.adminLinkColor}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        logInOrLogOut={this.logInOrLogOut}
        onClickToNews={this.onClickToNews}
        onClickToFiles={this.onClickToFiles}
        onClickLogo={this.onClickLogo}
        onClickToMain={this.onClickToMain}
        onClickToAdmin={this.onClickToAdmin}
        adminDisplayMode={this.props.adminDisplayMode}
        toMainDisplayMode={this.props.toMainDisplayMode}
        />
    );
  }

}
const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    user: state.user,
    isAuthenticated: state.user.isAuthenticated,
    isAuthVisible: state.authContainer.isAuthVisible,
    adminDisplayMode: state.adminDisplayMode.adminDisplayMode,
    toMainDisplayMode: state.toMainDisplayMode.toMainDisplayMode
  });
}

export default connect(mapStateToProps)(HeaderContainer);
