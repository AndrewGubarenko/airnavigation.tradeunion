import React from 'react';
import ChangePassword from '../components/RestorePassword';
import {representationService} from './../app-context/context';
import {setToMainDisplayMode} from './../reducers/actions/OnMainPageAction';
import {connect} from 'react-redux';
import {setSpinnerVisibility} from './../reducers/actions/spinnerAction';

class RestorePasswordContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      borderColorRestorePass: "darkgrey",
      message: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(setToMainDisplayMode("block"));
  }

  onChangeEmail = (event) => {
    this.setState({email: event.target.value});
    this.setState({borderColorRestorePass: "darkgrey"});
  }

  onClickRestorePass = async () => {
    if(this.state.email === "") {
      this.setState({borderColorRestorePass: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      await representationService.restorePassword(this.state.email).then(response => {
        response.text().then(message => {
          this.setState({email: ""})
          this.setState({message: message});
        });
      });
      this.props.dispatch(setSpinnerVisibility("none"));
    }
  }

  onClickRodger = () => {
    this.props.history.push("/main")
  }

  render() {
    return(
      <ChangePassword
        email={this.state.email}
        onChangeEmail={this.onChangeEmail}
        onClickRestorePass={this.onClickRestorePass}
        borderColorRestorePass={this.state.borderColorRestorePass}
        message={this.state.message}
        />
      );
    }
  }

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(RestorePasswordContainer);
