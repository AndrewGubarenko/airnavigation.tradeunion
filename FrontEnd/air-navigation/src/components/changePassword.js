import React from 'react';
import CHANGE_PASS_BTN from './../statics/change-pass-btn-blue.png';
import {Link} from 'react-router-dom';

class ChangePassword extends React.Component {
  render() {
    return(
      <div className="content">
        <div className="main-change-pass-container">
          <div className="auth-container auth-container-column">
            <label className="auth__label" style={{borderBottomColor: this.props.borderColorCurrentPass}}>
              <span className="label-text">Старий пароль</span>
              <input  className="auth__input"
                      type="password"
                      onChange={this.props.onChangeCurrentPassword}
                      value={this.props.currentPassword}
                      />
            </label>
            <div>
              <label id="forgot_password">
                <span className="inscription" id="forgot_password_span">
                  Забули пароль?
                  <Link id="forgot_password_link" to="/restore_password"> Тисніть сюди!</Link>
                </span>
              </label>
            </div>
          </div>
          <div className="auth-container auth-container-column">
            <label className="auth__label label__password" style={{borderBottomColor: this.props.borderColorNewPass}}>
              <span className="label-text">Новий пароль</span>
              <input  className="auth__input"
                      type="password"
                      onChange={this.props.onChangeNewPassword}
                      value={this.props.newPassword}
                      />
            </label>
          </div>
          <div className="auth-container auth-container-column">
            <label className="auth__label label__password" style={{borderBottomColor: this.props.borderColorNewPassConfirm}}>
              <span className="label-text">Повторити пароль</span>
              <input  className="auth__input"
                      type="password"
                      onChange={this.props.onChangeConfirmPassword}
                      value={this.props.confirmPassword}
                      />
            </label>
          </div>
          <div className="auth-container last-auth-container">
              <div>
                <img  id="sing__up__btn"
                      src={CHANGE_PASS_BTN}
                      alt=""
                      className="sing__up__btn"
                      onClick={this.props.onClickChangePass}/>
              </div>
          </div>
        </div>
        <div className="message_screen">
          {this.props.message}
        </div>
      </div>
    );
  }
}
export default ChangePassword;
