import React from 'react';
import ChangePassword from '../components/changePassword';
import {userService} from './../app-context/context';
import {setToMainDisplayMode} from './../reducers/actions/OnMainPageAction';
import {connect} from 'react-redux';
import {setSpinnerVisibility} from './../reducers/actions/spinnerAction';

class ChangePasswordContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      passData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      borderColorCurrentPass: "darkgrey",
      borderColorNewPass: "darkgrey",
      borderColorNewPassConfirm: "darkgrey",
      message:""
    };
  }

  componentDidMount() {
    this.props.dispatch(setToMainDisplayMode("block"));
  }

  onChangeCurrentPassword = (event) => {
    this.setState({borderColorCurrentPass: "darkgrey"});
    const passData = this.state.passData;
    passData.currentPassword = event.target.value;
    this.setState({passData: passData});
  }

  onChangeNewPassword = (event) => {
    this.setState({borderColorNewPass: "darkgrey"});
    const passData = this.state.passData;
    passData.newPassword = event.target.value;
    this.setState({passData: passData});
  }

  onChangeConfirmPassword = (event) => {
    this.setState({borderColorNewPassConfirm: "darkgrey"});
    const passData = this.state.passData;
    passData.confirmPassword = event.target.value;
    this.setState({passData: passData});;
  }

  onClickChangePass = async () => {
    if(this.state.passData.currentPassword === "") {
      this.setState({borderColorCurrentPass: "red"});
    } else if(this.state.passData.newPassword === "") {
      this.setState({borderColorNewPass: "red"});
    } else if(this.state.passData.confirmPassword === "") {
      this.setState({borderColorNewPassConfirm: "red"});
    } else if(this.state.passData.newPassword !== this.state.passData.confirmPassword) {
      this.setState({borderColorNewPassConfirm: "red"});
      this.setState({borderColorNewPass: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      let correctPassData = {currentPassword: this.state.passData.currentPassword,
                             newPassword: this.state.passData.newPassword}
      await userService.changePassword(correctPassData, this.props.user.id).then(response => {
        response.text().then(message => {
          this.setState({message: message});
          const passData = this.state.passData;
          passData.currentPassword = "";
          passData.newPassword = "";
          passData.confirmPassword = "";
          this.setState({passData: passData});
        });
      })
      this.props.dispatch(setSpinnerVisibility("none"));
      
    }
  }

  render() {
    return(
      <ChangePassword
        message={this.state.message}
        currentPassword={this.state.passData.currentPassword}
        newPassword={this.state.passData.newPassword}
        confirmPassword={this.state.passData.confirmPassword}
        onChangeCurrentPassword={this.onChangeCurrentPassword}
        onChangeNewPassword={this.onChangeNewPassword}
        onChangeConfirmPassword={this.onChangeConfirmPassword}
        onClickChangePass={this.onClickChangePass}
        borderColorCurrentPass={this.state.borderColorCurrentPass}
        borderColorNewPass={this.state.borderColorNewPass}
        borderColorNewPassConfirm={this.state.borderColorNewPassConfirm}
        />
      );
    }
  }

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    user: state.user.user,
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(ChangePasswordContainer);
