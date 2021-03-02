import React from 'react';
import Questionnaire from './../components/questionnaire';
import {connect} from 'react-redux';
import {setToMainDisplayMode} from './../reducers/actions/OnMainPageAction';
import {userService} from './../app-context/context';
import {setSpinnerVisibility} from './../reducers/actions/spinnerAction';
import {sypherService} from './../app-context/context';

let CryptoJS = require("crypto-js");
let count = -1;

class QuestionnaireContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nameUkrainian: "",
      nameEnglish: "",
      facility: "РДЦ",
      position: "",
      shift: "4",
      passportNumber: "",
      passportIssue: "",
      passportDateIssue: "",
      doesHaveInternationalPassport: "false",
      termInternationalPassport: "",
      identNumber: "",
      education: "",
      educationTerm: "",
      homePhone: "",
      mobilePhone: "",
      placeOfBirth: "",
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

  componentDidMount() {
    count = -1;
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

    userService.getQuestionnaire(this.props.user.id).then(response => {
      if(response.ok) {
        return response.json().then(data => {
          if (data.id !== 0 && data.children !== null) {
            return data;
          } else {
            return null;
          }
        })
      } else {
        response.text().then(message => {
          this.setState({message: message});
          return null;
        })
      }
    }).then((questionnaire) => {
      if(questionnaire !== null) {
        this.setQuestionnarieData(questionnaire);
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
        this.state.children.forEach((child, i) => {
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
    });
  }

  onChangeNameUkr = (event) => {
    this.setState({nameUkrainian: event.target.value});
  }

  onChangeNameEng = (event) => {
    this.setState({nameEnglish: event.target.value});
  }

  onChangeFacility = (event) => {
    this.setState({facility: event.target.value});
  }

  onChangePosition = (event) => {
    this.setState({position: event.target.value});
  }

  onChangeShift = (event) => {
    this.setState({shift: event.target.value});
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

  onChangePlaceOfBirth = (event) => {
    this.setState({placeOfBirth: event.target.value});
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
    let childNameMap = this.state.childNameMap;
    let childBirthMap = this.state.childBirthMap;
    let children = this.state.children;
    children.splice(key, 1);

    this.setState({children: children});
    childNameMap.delete(key);
    childBirthMap.delete(key);

    this.setState({childNameMap: childNameMap});
    this.setState({childBirthMap: childBirthMap});

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
    await this.state.children.forEach((child, i) => {
      childrenMap.set(this.cypherThis(child[0]), this.cypherThis(child[1]));
    });

    await this.state.childNameMap.forEach((name,date) => {
      let encodedName = this.cypherThis(name);
      let encodedDate = this.cypherThis(this.state.childBirthMap.get(date))
      childrenMap.set(encodedName, encodedDate);
    });

    //Making JS Map compatible for JSON.Stringify
    let childrenMapCompatible = Object.fromEntries(childrenMap);

    let questionnaire = {
      nameUkrainian: this.cypherThis(this.state.nameUkrainian),
      nameEnglish: this.cypherThis(this.state.nameEnglish),
      facility: this.cypherThis(this.state.facility),
      position: this.cypherThis(this.state.position),
      shift: this.cypherThis(this.state.shift),
      passportNumber: this.cypherThis(this.state.passportNumber),
      passportIssue: this.cypherThis(this.state.passportIssue),
      passportDateIssue: this.cypherThis(this.state.passportDateIssue),
      doesHaveInternationalPassport: this.cypherThis(this.state.doesHaveInternationalPassport),
      termInternationalPassport: this.cypherThis(this.state.termInternationalPassport),
      identNumber: this.cypherThis(this.state.identNumber),
      education: this.cypherThis(this.state.education),
      educationTerm: this.cypherThis(this.state.educationTerm),
      homePhone: this.cypherThis(this.state.homePhone),
      mobilePhone: this.cypherThis(this.state.mobilePhone),
      placeOfBirth: this.cypherThis(this.state.placeOfBirth),
      birthDate: this.cypherThis(this.state.birthDate),
      passportAddress: this.cypherThis(this.state.passportAddress),
      actualAddress: this.cypherThis(this.state.actualAddress),
      employmentDate: this.cypherThis(this.state.employmentDate),
      seniority: this.cypherThis(this.state.seniority),
      isMarried: this.cypherThis(this.state.isMarried),
      familyComposition: this.cypherThis(this.state.familyComposition),
      children: childrenMapCompatible,
      additionalInformation: this.cypherThis(this.state.additionalInformation),
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
    this.setState({nameUkrainian: this.decypherThis(data.nameUkrainian)});
    this.setState({nameEnglish: this.decypherThis(data.nameEnglish)});
    this.setState({facility: this.decypherThis(data.facility)});
    this.setState({position: this.decypherThis(data.position)});
    this.setState({shift: this.decypherThis(data.shift)});
    this.setState({passportNumber: this.decypherThis(data.passportNumber)});
    this.setState({passportIssue: this.decypherThis(data.passportIssue)});
    this.setState({passportDateIssue: this.decypherThis(data.passportDateIssue)});
    this.setState({doesHaveInternationalPassport: this.decypherThis(data.doesHaveInternationalPassport)});
    this.setState({termInternationalPassport: this.decypherThis(data.termInternationalPassport)});
    this.setState({identNumber: this.decypherThis(data.identNumber)});
    this.setState({education: this.decypherThis(data.education)});
    this.setState({educationTerm: this.decypherThis(data.educationTerm)});
    this.setState({homePhone: this.decypherThis(data.homePhone)});
    this.setState({mobilePhone: this.decypherThis(data.mobilePhone)});
    this.setState({placeOfBirth: this.decypherThis(data.placeOfBirth)});
    this.setState({birthDate: this.decypherThis(data.birthDate)});
    this.setState({passportAddress: this.decypherThis(data.passportAddress)});
    this.setState({actualAddress: this.decypherThis(data.actualAddress)});
    this.setState({employmentDate: this.decypherThis(data.employmentDate)});
    this.setState({seniority: this.decypherThis(data.seniority)});
    this.setState({isMarried: this.decypherThis(data.isMarried)});
    this.setState({familyComposition: this.decypherThis(data.familyComposition)});

    let decodedMap = this.state.children;
    Object.entries(data.children).forEach(async(name, index) => {

      let childName = this.decypherThis(name[0]);
      let childDate = this.decypherThis(name[1]);

      decodedMap.push([childName, childDate]);
    });
    this.setState({children: decodedMap});

    this.setState({additionalInformation: this.decypherThis(data.additionalInformation)});
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
      <Questionnaire
        nameUkrainian={this.state.nameUkrainian}
        nameEnglish={this.state.nameEnglish}
        facility={this.state.facility}
        position={this.state.position}
        shift={this.state.shift}
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
        placeOfBirth={this.state.placeOfBirth}
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
        onChangeFacility={this.onChangeFacility}
        onChangePosition={this.onChangePosition}
        onChangeShift={this.onChangeShift}
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
        onChangePlaceOfBirth={this.onChangePlaceOfBirth}
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
