import React from 'react';
import Questionnaire from './../components/questionnaire';
import {connect} from 'react-redux';
import {setToMainDisplayMode} from './../reducers/actions/OnMainPageAction';
import {userService} from './../app-context/context';
import {setSpinnerVisibility} from './../reducers/actions/spinnerAction';

let count = -1;

class QuestionnaireContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nameUkrainian: "",
      nameEnglish: "",
      passportNumber: "",
      passportIssue: "",
      passportDateIssue: "",
      doesHaveInternationalPassport: "false",
      termInternationalPassport: "",
      identNumber: "",
      education: "",
      educationTerm: "",
      email: this.props.user.username,
      homePhone: "",
      mobilePhone: "",
      birthDate: "",
      passportAddress: "",
      actualAddress: "",
      employmentDate: "",
      seniority: "",
      isMarried: "false",
      familyComposition: "",
      children: [],
      additionalInformation: "",

      isTermIntPassVisible: "none",
      isMarriedSpan: [],
      childrenArray: [],

      childNameMap: new Map(),
      childBirthMap: new Map(),

      message: ""
    };
  }

  async componentDidMount() {
    this.props.dispatch(setToMainDisplayMode("block"));
    let result = [];
    if(this.props.user.gender === "MALE") {
      result[0] = "Одружений";
      result[1] = "Неодружений";
      this.setState({isMarriedSpan: result});
    } else if (this.props.user.gender === "FEMALE") {
      result[0] = "Заміжня";
      result[1] = "Незаміжня";
      this.setState({isMarriedSpan: result});
    } else {
      result[0] = "Одружений/Заміжня";
      result[1] = "Неодружений/Незаміжня";
      this.setState({isMarriedSpan: result});
    }
    if(this.props.user.questionnaire !== null) {
      await this.setQuestionnarieData(this.props.user.questionnaire);
      if (this.state.doesHaveInternationalPassport === "true") {
        if(window.innerWidth > 1023) {
          this.setState({isTermIntPassVisible: "grid"});
        } else {
          this.setState({isTermIntPassVisible: "flex"});
        }
      } else {
        this.setState({termInternationalPassport: ""});
        this.setState({isTermIntPassVisible: "none"});
      }
      let childrenArray = this.state.childrenArray;
      await this.state.children.forEach((child, i) => {
        count++;
        childrenArray.push(<div key={count} className="questionnarie_children_row">
          <div className="auth-container">
            <input data-number={count} className="questionarie_terminal_input" onChange={this.onChangeChildName} value={child[0]}/>
            <span className="inscription" id="forgot_password_span">
              ПІБ дитини
            </span>
          </div>
          <div className="auth-container" style={{position: "relative"}}>
            <div id="close__btn" data-number={count} onClick={this.onClickRemoveChild} className="remove_child_btn">&#10006;</div>
            <input type="date" data-number={count} className="questionarie_terminal_input" onChange={this.onChangeChildBirth} value={child[1]}/>
            <span className="inscription" id="forgot_password_span">
              Дата народження
            </span>
          </div>
        </div>);
      });
      this.setState({childrenArray: childrenArray});
    }
  }

  onChangeNameUkr = (event) => {
    this.setState({nameUkrainian: event.target.value});
  }

  onChangeNameEng = (event) => {
    this.setState({nameEnglish: event.target.value});
  }

  onChangePassportNumber = (event) => {
    this.setState({passportNumber: event.target.value});
  }

  onChangePassportIssue = (event) => {
    this.setState({passportIssue: event.target.value});
  }

  onChangePassportIssueDate = (event) => {
    this.setState({passportDateIssue: event.target.value});
  }

  onChangeDoesHaveIntPass = async (event) => {
    await this.setState({doesHaveInternationalPassport: event.target.value});
    if (this.state.doesHaveInternationalPassport === "true") {
      if(window.innerWidth > 1023) {
        this.setState({isTermIntPassVisible: "grid"});
      } else {
        this.setState({isTermIntPassVisible: "flex"});
      }
    } else {
      this.setState({termInternationalPassport: ""});
      this.setState({isTermIntPassVisible: "none"});
    }
  }

  onChangeTermIntPass = (event) => {
    this.setState({termInternationalPassport: event.target.value});
  }

  onChangeIdentNumber = (event) => {
    let number = this.checkNumber(event.target.value);
    this.setState({identNumber: number});
  }

  onChangeEducation = (event) => {
    this.setState({education: event.target.value});
  }

  onChangeEducationTerm = (event) => {
    this.setState({educationTerm: event.target.value});
  }

  onChangeHomePhone = (event) => {
    let phone = this.checkNumber(event.target.value);
    this.setState({homePhone: phone});
  }

  onChangeMobilePhone = (event) => {
    let phone = this.checkNumber(event.target.value);
    this.setState({mobilePhone: phone});
  }

  checkNumber = (row) => {
    let phoneNum = row.replace(/[^\d]/g, '');
    if(phoneNum.length > 10) {
      phoneNum = phoneNum.slice(0,10);
    }
    return phoneNum;
  }

  onChangeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  onChangeBirthDate = (event) => {
    this.setState({birthDate: event.target.value});
  }

  onChangePassportAddress = (event) => {
    this.setState({passportAddress: event.target.value});
  }

  onChangeActualAddress = (event) => {
    this.setState({actualAddress: event.target.value});
  }

  onChangeEmploymentDate = (event) => {
    this.setState({employmentDate: event.target.value});
  }

  onChangeSeniority = (event) => {
    let seniority = this.checkNumber(event.target.value);
    this.setState({seniority: seniority});
  }

  onChangeIsMarried = async (event) => {
    await this.setState({isMarried: event.target.value});
  }

  onChangeFamilyComposition = (event) => {
    this.setState({familyComposition: event.target.value});
  }

  onChangeChildName = (event) => {
    let map = this.state.childNameMap;
    let key = event.target.dataset.number;
    map.set(key, event.target.value);
    this.setState({childNameMap: map});
  }

  onChangeChildBirth = (event) => {
    let map = this.state.childBirthMap;
    let key = event.target.dataset.number;
    map.set(key, event.target.value);
    this.setState({childBirthMap: map});
  }

  onChangeAdditionalInformation = (event) => {
    this.setState({additionalInformation: event.target.value});
  }

  onClickRemoveChild = (event) => {
    let childrenArray = this.state.childrenArray;
    let key = event.target.dataset.number;
    this.state.childNameMap.delete(key);
    this.state.childBirthMap.delete(key);
    let  newChildrenArray = childrenArray.filter((item) => item.key !== event.target.dataset.number);
    this.setState({childrenArray: newChildrenArray});
  }

  onClickAddChild = async () => {
    count++;

    let childrenArray = this.state.childrenArray;
    await childrenArray.push(<div key={count} className="questionnarie_children_row">
      <div className="auth-container">
        <input data-number={count} className="questionarie_terminal_input" onChange={this.onChangeChildName} />
        <span className="inscription" id="forgot_password_span">
          ПІБ дитини
        </span>
      </div>
      <div className="auth-container" style={{position: "relative"}}>
        <div id="close__btn" data-number={count} onClick={this.onClickRemoveChild} className="remove_child_btn">&#10006;</div>
        <input type="date" data-number={count} className="questionarie_terminal_input" onChange={this.onChangeChildBirth}/>
        <span className="inscription" id="forgot_password_span">
          Дата народження
        </span>
      </div>
    </div>);
    this.setState({childrenArray: childrenArray});
  }

  onClickSaveQuestionnaire = async () => {

    await this.props.dispatch(setSpinnerVisibility("inline-block"));

    let childrenMap = new Map();
    this.state.childNameMap.forEach((name,date) => {
      childrenMap.set(name, this.state.childBirthMap.get(date));
    });

    //Making JS Map compatible for JSON.Stringify
   let childrenMapCompatible = Object.fromEntries(childrenMap);

    let questionnaire = {
      nameUkrainian: this.state.nameUkrainian,
      nameEnglish: this.state.nameEnglish,
      passportNumber: this.state.passportNumber,
      passportIssue: this.state.passportIssue,
      passportDateIssue: this.state.passportDateIssue,
      doesHaveInternationalPassport: this.state.doesHaveInternationalPassport,
      termInternationalPassport: this.state.termInternationalPassport,
      identNumber: this.state.identNumber,
      education: this.state.education,
      educationTerm: this.state.educationTerm,
      email: this.state.email,
      homePhone: this.state.homePhone,
      mobilePhone: this.state.mobilePhone,
      birthDate: this.state.birthDate,
      passportAddress: this.state.passportAddress,
      actualAddress: this.state.actualAddress,
      employmentDate: this.state.employmentDate,
      seniority: this.state.seniority,
      married: this.state.isMarried,
      familyComposition: this.state.familyComposition,
      children: childrenMapCompatible,
      additionalInformation: this.state.additionalInformation,
      userId: this.props.user.id
    }

    await userService.sendQuestionnaire(questionnaire, this.props.user.id).then(response => {
      if(response.ok) {
        response.json().then(data => {
          this.setQuestionnarieData(data);
        })
      } else {
        response.text().then(message => {
          this.setState({message: message});
        })
      }
    });

    await this.props.dispatch(setSpinnerVisibility("none"));
  }

  setQuestionnarieData = (data) => {
    this.setState({nameUkrainian: data.nameUkrainian});
    this.setState({nameEnglish: data.nameEnglish});
    this.setState({passportNumber: data.passportNumber});
    this.setState({passportIssue: data.passportIssue});
    this.setState({passportDateIssue: this.checkOnNull(data.passportDateIssue)});
    this.setState({doesHaveInternationalPassport: data.doesHaveInternationalPassport.toString()});
    this.setState({termInternationalPassport: this.checkOnNull(data.termInternationalPassport)});
    this.setState({identNumber: data.identNumber});
    this.setState({education: data.education});
    this.setState({educationTerm: this.checkOnNull(data.educationTerm)});
    this.setState({email: data.email});
    this.setState({homePhone: data.homePhone});
    this.setState({mobilePhone: data.mobilePhone});
    this.setState({birthDate: this.checkOnNull(data.birthDate)});
    this.setState({passportAddress: data.passportAddress});
    this.setState({actualAddress: data.actualAddress});
    this.setState({employmentDate: this.checkOnNull(data.employmentDate)});
    this.setState({seniority: data.seniority});
    this.setState({isMarried: data.married.toString()});
    this.setState({familyComposition: data.familyComposition});
    this.setState({children: Object.entries(data.children)});
    this.setState({additionalInformation: data.additionalInformation});
  }

  checkOnNull = (data) => {
    if(data === null) {
      return "";
    } else {
      return data;
    }
  }

  render() {
    return(
      <Questionnaire
        nameUkrainian={this.state.nameUkrainian}
        nameEnglish={this.state.nameEnglish}
        passportNumber={this.state.passportNumber}
        passportIssue={this.state.passportIssue}
        passportDateIssue={this.state.passportDateIssue}
        doesHaveInternationalPassport={this.state.doesHaveInternationalPassport}
        termInternationalPassport={this.state.termInternationalPassport}
        identNumber={this.state.identNumber}
        education={this.state.education}
        educationTerm={this.state.educationTerm}
        homePhone={this.state.homePhone}
        mobilePhone={this.state.mobilePhone}
        email={this.state.email}
        birthDate={this.state.birthDate}
        passportAddress={this.state.passportAddress}
        actualAddress={this.state.actualAddress}
        employmentDate={this.state.employmentDate}
        seniority={this.state.seniority}
        isMarried={this.state.isMarried}
        familyComposition={this.state.familyComposition}
        children={this.state.children}
        additionalInformation={this.state.additionalInformation}

        isTermIntPassVisible={this.state.isTermIntPassVisible}
        isMarriedSpan={this.state.isMarriedSpan}
        childrenArray={this.state.childrenArray}
        message={this.state.message}

        onChangeNameUkr={this.onChangeNameUkr}
        onChangeNameEng={this.onChangeNameEng}
        onChangePassportNumber={this.onChangePassportNumber}
        onChangePassportIssue={this.onChangePassportIssue}
        onChangePassportIssueDate={this.onChangePassportIssueDate}
        onChangeDoesHaveIntPass={this.onChangeDoesHaveIntPass}
        onChangeTermIntPass={this.onChangeTermIntPass}
        onChangeIdentNumber={this.onChangeIdentNumber}
        onChangeEducation={this.onChangeEducation}
        onChangeEducationTerm={this.onChangeEducationTerm}
        onChangeHomePhone={this.onChangeHomePhone}
        onChangeMobilePhone={this.onChangeMobilePhone}
        onChangeEmail={this.onChangeEmail}
        onChangeBirthDate={this.onChangeBirthDate}
        onChangePassportAddress={this.onChangePassportAddress}
        onChangeActualAddress={this.onChangeActualAddress}
        onChangeEmploymentDate={this.onChangeEmploymentDate}
        onChangeSeniority={this.onChangeSeniority}
        onChangeIsMarried={this.onChangeIsMarried}
        onChangeFamilyComposition={this.onChangeFamilyComposition}
        onChangeAdditionalInformation={this.onChangeAdditionalInformation}
        onClickAddChild={this.onClickAddChild}

        onClickSaveQuestionnaire={this.onClickSaveQuestionnaire}

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

export default connect(mapStateToProps)(QuestionnaireContainer);
