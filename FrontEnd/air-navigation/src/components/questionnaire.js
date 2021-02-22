import React from 'react';
import RESTORE_PASS_BTN from './../statics/restore-pass-btn-blue.png';
import "./../styles/questionnaireStyle.css";

class Questionnaire extends React.Component {

  render() {
    return(
      <div className="content">
        <div className="questionnaire-form">
          <div className="questionnarie_interactive_control_panel_row">
            <span>Прізвище, ім'я, по-батькові: </span><input className="questionarie_terminal_input" onChange={this.props.onChangeNameUkr} value={this.props.nameUkrainian}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Name, Surname: </span>
              <div className="auth-container">
                <input className="questionarie_terminal_input" onChange={this.props.onChangeNameEng} value={this.props.nameEnglish}/>
                <span className="inscription" id="forgot_password_span">
                  Як у закордонному паспорті або у свідоцтві диспетчера
                </span>
              </div>
          </div>

          <div className="questionnarie_interactive_control_panel_row questionnarie_interactive_control_panel_row_quatro">
            <span>Паспотрні дані: </span>
            <div className="auth-container">
              <input className="terminal_input_quatro" onChange={this.props.onChangePassportNumber} value={this.props.passportNumber}/>
              <span className="inscription" id="forgot_password_span">
                Серія та/або номер
              </span>
            </div>
            <div className="auth-container">
              <input className="terminal_input_quatro" onChange={this.props.onChangePassportIssue} value={this.props.passportIssue}/>
              <span className="inscription" id="forgot_password_span">
                Ким виданий
              </span>
            </div>
            <div className="auth-container">
              <input type="date" className="terminal_input_quatro" onChange={this.props.onChangePassportIssueDate} value={this.props.passportDateIssue}/>
              <span className="inscription" id="forgot_password_span">
                Дата видачі
              </span>
            </div>
          </div>

          <div className="questionnarie_interactive_control_panel_row">
            <span>Наявність закордонного паспорта: </span>
            <div className="interactive_control_panel_radio questoinnarie-radio">
              <input type="radio" checked={this.props.doesHaveInternationalPassport === "true"} onChange={this.props.onChangeDoesHaveIntPass} value={"true"}/><label>Маю</label>
              <input type="radio" checked={this.props.doesHaveInternationalPassport === "false"} onChange={this.props.onChangeDoesHaveIntPass} value={"false"}/><label>Не маю</label>
            </div>
          </div>
          <div className="questionnarie_interactive_control_panel_row" style={{display: this.props.isTermIntPassVisible}}>
            <span>Термін дії: </span><input type="date" className="questionarie_terminal_input" onChange={this.props.onChangeTermIntPass} value={this.props.termInternationalPassport}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Ідентифікаційний код: </span><input className="questionarie_terminal_input" onChange={this.props.onChangeIdentNumber} value={this.props.identNumber}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Освіта: </span>
            <div className="auth-container">
              <input className="questionarie_terminal_input" onChange={this.props.onChangeEducation} value={this.props.education}/>
              <span className="inscription" id="forgot_password_span">
                ВУЗ, вчене звання
              </span>
            </div>
            <div className="auth-container">
              <input type="date" className="questionarie_terminal_input" onChange={this.props.onChangeEducationTerm} value={this.props.educationTerm}/>
              <span className="inscription" id="forgot_password_span">
                Дата закінчення
              </span>
            </div>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Телефон: </span>
              <div className="auth-container">
                <input type="tel" className="questionarie_terminal_input" onChange={this.props.onChangeHomePhone} value={this.props.homePhone}/>
                <span className="inscription" id="forgot_password_span">
                  Домашній
                </span>
              </div>
              <div className="auth-container">
                <input type="tel" className="questionarie_terminal_input" onChange={this.props.onChangeMobilePhone} value={this.props.mobilePhone}/>
                <span className="inscription" id="forgot_password_span">
                  Мобільний
                </span>
              </div>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Електронна адреса: </span><input type="email" className="questionarie_terminal_input" onChange={this.props.onChangeEmail} value={this.props.email}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Місце народження: </span><input className="questionarie_terminal_input" onChange={this.props.onChangeUserCount}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Дата народження: </span><input type="date" className="questionarie_terminal_input" onChange={this.props.onChangeBirthDate} value={this.props.birthDate}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Адреса проживання (за паспортом): </span><input className="questionarie_terminal_input" onChange={this.props.onChangePassportAddress}  value={this.props.passportAddress}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Адреса проживання (фактична): </span><input className="questionarie_terminal_input" onChange={this.props.onChangeActualAddress}  value={this.props.actualAddress}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Дата працевлаштування в РСП: </span><input type="date" className="questionarie_terminal_input" onChange={this.props.onChangeEmploymentDate} value={this.props.employmentDate}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Загальний трудовий стаж (без освіти): </span><input className="questionarie_terminal_input" onChange={this.props.onChangeSeniority} value={this.props.seniority}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Сімейний стан: </span>
            <div className="interactive_control_panel_radio questoinnarie-radio">
              <input type="radio" checked={this.props.isMarried === "true"} onChange={this.props.onChangeIsMarried} value={"true"}/><label>{this.props.isMarriedSpan[0]}</label>
              <input type="radio" checked={this.props.isMarried === "false"} onChange={this.props.onChangeIsMarried} value={"false"}/><label>{this.props.isMarriedSpan[1]}</label>
            </div>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <span>Склад сім'ї: </span><input className="questionarie_terminal_input" onChange={this.props.onChangeFamilyComposition} value={this.props.familyComposition}/>
          </div>

          <div className="questionnarie_interactive_control_panel_row questionnarie_children_container">
            <span>Діти до 18ти років (кожна дитина): </span>
            <div style={{dilsplay: "flex", flexDirection: "column"}}>
              {this.props.childrenArray.map(child => {return(child)})}
              <button className="admin_screen_btn" onClick={this.props.onClickAddChild} style={{fontSize: "18px", marginTop: "20px"}}>Додати дитину</button>
            </div>
          </div>

          <div className="questionnarie_interactive_control_panel_row">
            <span>Додаткова інформація: </span><textarea className="terminal_input admin_news_textarea" onChange={this.props.onChangeAdditionalInformation} value={this.props.additionalInformation}/>
          </div>
          <div className="questionnarie_interactive_control_panel_row">
            <div/>
            <div/>
            <div style={{display: "flex", justifyContent: "flex-end", marginTop: "10px"}}>
              <img  id="sing__up__btn"
                    src={RESTORE_PASS_BTN}
                    alt=""
                    className="sing__up__btn"
                    onClick={this.props.onClickSaveQuestionnaire}/>
            </div>
          </div>
          <div className="message_screen">
            {this.props.message}
          </div>
        </div>

      </div>
    );
  }
}
export default Questionnaire;
