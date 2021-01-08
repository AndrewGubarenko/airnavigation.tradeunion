import React from 'react';
import AdminPage from '../components/admin-page';
import {adminService} from './../app-context/context';
import {setToMainDisplayMode} from './../reducers/actions/OnMainPageAction';
import {setSpinnerVisibility} from './../reducers/actions/spinnerAction';
import {connect} from 'react-redux';
import {scroller} from 'react-scroll';

class AdminPageContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      user: {
        id: "",
        username: "",
        firstName: "",
        lastName: "",
        count: "",
        gender: "MALE",
        roles: ["USER"]
      },
      news: {
        id: "",
        title: "",
        text: ""
      },
      file: {
        id: "",
        name: "",
        path: ""
      },
      newsList: [],
      filesList: [],
      logs: "",
      selectedCountFile: null,
      selectedDatabaseFile: null,
      userBtnContainerDisplay: "none",
      newsBtnContainerDisplay: "none",
      fileBtnContainerDisplay: "none",
      userControlPanelDisplay: "none",
      userFindPanelDisplay: "none",
      newsControlPanelDisplay: "none",
      filesControlPanelDisplay: "none",
      userUpdateControlPanelDisplay: "none",
      DeleteUserButtonDisplay: "none",
      DeleteUserYesNoContainerDisplay: "none",
      newsUpdateControlPanelDisplay: "none",
      DeleteNewsButtonDisplay: "none",
      DeleteNewsYesNoContainerDisplay: "none",
      filesUpdateControlPanelDisplay: "none",
      DeleteFileButtonDisplay: "none",
      DeleteFileYesNoContainerDisplay: "none",
      XMLCountUodateControlPanelDisplay: "none",
      XMLDatabaseUpdateControlPanelDisplay: "none",
      selected: "MALE",
      checked: false,
      borderColorUsername: "darkgrey",
      borderColorFirstName: "darkgrey",
      borderColorLastName: "darkgrey",
      borderColorCount: "darkgrey",
      borderColorTitle: "darkgrey",
      borderColorText: "darkgrey",
      borderColorName: "darkgrey",
      borderColorPath: "darkgrey",
      fileInputColor: "red",
      terminalData: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(setToMainDisplayMode("block"));
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  clearState = () => {
      document.getElementById('acounts_flie_input_key').value = '';
      document.getElementById('db_flie_input_key').value = '';
      this.setState({username: "",
                      user: {
                        id: "",
                        username: "",
                        firstName: "",
                        lastName: "",
                        count: "",
                        gender: "MALE",
                        roles: ["USER"]
                      },
                      news: {
                        id: "",
                        title: "",
                        text: ""
                      },
                      file: {
                        id: "",
                        name: "",
                        path: ""
                      },
                      newsList: [],
                      filesList: [],
                      logs: "",
                      selectedCountFile: null,
                      selectedDatabaseFile: null,
                      userBtnContainerDisplay: "none",
                      newsBtnContainerDisplay: "none",
                      fileBtnContainerDisplay: "none",
                      userControlPanelDisplay: "none",
                      userFindPanelDisplay: "none",
                      newsControlPanelDisplay: "none",
                      filesControlPanelDisplay: "none",
                      userUpdateControlPanelDisplay: "none",
                      DeleteUserButtonDisplay: "none",
                      DeleteUserYesNoContainerDisplay: "none",
                      newsUpdateControlPanelDisplay: "none",
                      DeleteNewsButtonDisplay: "none",
                      DeleteNewsYesNoContainerDisplay: "none",
                      filesUpdateControlPanelDisplay: "none",
                      DeleteFileButtonDisplay: "none",
                      DeleteFileYesNoContainerDisplay: "none",
                      XMLCountUodateControlPanelDisplay: "none",
                      XMLDatabaseUpdateControlPanelDisplay: "none",
                      selected: "MALE",
                      checked: false,
                      borderColorUsername: "darkgrey",
                      borderColorFirstName: "darkgrey",
                      borderColorLastName: "darkgrey",
                      borderColorCount: "darkgrey",
                      borderColorTitle: "darkgrey",
                      borderColorText: "darkgrey",
                      borderColorName: "darkgrey",
                      borderColorPath: "darkgrey",
                      fileInputColor: "red",
                      terminalData: ""
                    });
  }

/*User functions*/
  onChangeUserUsername = (event) => {
    this.setState({borderColorUsername: "darkgrey"});
    const user = this.state.user;
    user.username = event.target.value;
    this.setState({user: user});
  }
  onChangeUserFirstName = (event) => {
    this.setState({borderColorFirstName: "darkgrey"});
    const user = this.state.user;
    user.firstName = event.target.value;
    this.setState({user: user});
  }
  onChangeUserLastName = (event) => {
    this.setState({borderColorLastName: "darkgrey"});
    const user = this.state.user;
    user.lastName = event.target.value;
    this.setState({user: user});
  }
  onChangeUserCount = (event) => {
    this.setState({borderColorCount: "darkgrey"});
    const user = this.state.user;
    user.count = event.target.value;
    this.setState({user: user});
  }
  onChangeUserGender = (event) => {
    const user = this.state.user;
    user.gender = event.target.value;
    this.setState({selected: event.target.value})
    this.setState({user: user});
  }
  onChangeUserRole = (event) => {
    const user = this.state.user;
    if (!this.state.checked) {
      this.setState({checked: true})
      user.roles = ["USER", "ADMINISTRATOR"];
      this.setState({user: user});
    } else {
      this.setState({checked: false})
      user.roles = ["USER"];
      this.setState({user: user});
    }
  }

  onClickAddUser = () => {
    this.setState({userBtnContainerDisplay: "none"});
    this.setState({userControlPanelDisplay: "block"});
  }
  onClickFindUser = () => {
    this.setState({userBtnContainerDisplay: "none"});
    this.setState({userFindPanelDisplay: "block"});
  }
  onClickCreateUser = () => {
    if(this.state.user.username === "") {
      this.setState({borderColorUsername: "red"});
    } else if(this.state.user.firstName === "") {
      this.setState({borderColorFirstName: "red"});
    } else if(this.state.user.lastName === "") {
      this.setState({borderColorLastName: "red"});
    } else if(Number.parseFloat(this.state.user.count) !== 0 && !Number.parseFloat(this.state.user.count)) {
      this.setState({borderColorCount: "red"});
    } else {
      adminService.createUser(this.state.user).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            this.setState({user: data})
            this.setState({userControlPanelDisplay: "none"});
            this.setState({userUpdateControlPanelDisplay: "block"});
            this.setState({DeleteUserButtonDisplay: "block"});
            this.setState({terminalData: JSON.stringify(data)})
            this.setState({selected: data.gender});
            if(data.roles.includes("ADMINISTRATOR")) {
              this.setState({checked: true});
            }
          })
        } else {
          response.text().then(error => this.setState({terminalData: error}));
        }
      });
    }
  }
  onClickUpdateUser = () => {
    if(this.state.user.firstName === "") {
      this.setState({borderColorFirstName: "red"});
    } else if(this.state.user.lastName === "") {
      this.setState({borderColorLastName: "red"});
    } else if(Number.parseFloat(this.state.user.count) !== 0 && !Number.parseFloat(this.state.user.count)) {
      this.setState({borderColorCount: "red"});
    } else {
      adminService.updateUser(this.state.user).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            this.setState({selected: data.gender});
            if(data.roles.includes("ADMINISTRATOR")) {
              this.setState({checked: true});
            }
            this.setState({terminalData: JSON.stringify(data)});
            this.setState({user: data});
          });
        } else {
          response.text().then(error => this.setState({terminalData: error}));
        }
      });
    }
  }
  onClickGetUser = () => {
    let searchRequest = {username: this.state.user.username,
                         firstName: this.state.user.firstName,
                         lastName: this.state.user.lastName}
    adminService.findUser(searchRequest).then(response => {
      if(response.ok) {
        return response.json().then(data => {
          this.setState({userFindPanelDisplay: "none"})
          this.createUsersListForPrint(data);
        });
      } else {
        response.text().then(error => this.setState({terminalData: error}));
      }
    });
  }

  onClickDeleteUser = () => {
    this.setState({DeleteUserButtonDisplay: "none"})
    this.setState({DeleteUserYesNoContainerDisplay: "block"})
  }
  onClickDeleteYes = () => {
    adminService.deleteUser(this.state.user.id).then(responce => {
      return responce.text()
    }).then(data => {
      this.setState({terminalData: data});
    }).then(() => {
      this.setState({userUpdateControlPanelDisplay: "none"});
    });
  }
  onClickDeleteNo = () => {
    this.setState({DeleteUserButtonDisplay: "block"})
    this.setState({DeleteUserYesNoContainerDisplay: "none"})
  }
/*User functions*/
/*News functions*/
  onChangeNewsTitle = (event) => {
    this.setState({borderColorTitle: "darkgrey"});
    const news = this.state.news;
    news.title = event.target.value;
    this.setState({news: news});
  }
  onChangeNewsText = (event) => {
    this.setState({borderColorText: "darkgrey"});
    const news = this.state.news;
    news.text = event.target.value;
    this.setState({news: news});
  }
  onClickAddNews = () => {
    this.setState({newsBtnContainerDisplay: "none"});
    this.setState({newsControlPanelDisplay: "block"});
  }
  onClickCreateNews = () => {
    if(this.state.news.title === "") {
      this.setState({borderColorTitle: "red"});
    } else if(this.state.news.text === "") {
      this.setState({borderColorText: "red"});
    } else {
      adminService.createNews(this.state.news).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            this.setState({news: data})
            this.setState({newsControlPanelDisplay: "none"});
            this.setState({newsUpdateControlPanelDisplay: "block"});
            this.setState({DeleteNewsButtonDisplay: "block"});
            this.setState({terminalData: JSON.stringify(data)});
            });
        } else {
          return response.text().then(error => {this.setState({terminalData: error})});
        }
      });
    }
  }

  onClickChangeNews = () => {
    if(this.state.news.title === "") {
      this.setState({borderColorTitle: "red"});
    } else if(this.state.news.text === "") {
      this.setState({borderColorText: "red"});
    } else {
      adminService.updateNews(this.state.news).then(response => {
        if(response.ok) {
          return response.json().then(data => {
          this.setState({news: data});
          this.setState({terminalData: JSON.stringify(data)});
        });
        } else {
          return response.text().then(error => {this.setState({terminalData: error})});
        }
      });
    }
  }

  onClickDeleteNews = () => {
    this.setState({DeleteNewsButtonDisplay: "none"});
    this.setState({DeleteNewsYesNoContainerDisplay: "block"});
  }
  onClickNewsDeleteYes = () => {
    adminService.deleteNews(this.state.news.id).then(responce => {
      return responce.text()
    }).then(data => {
      this.setState({terminalData: data});
    }).then(() => {
      this.setState({newsUpdateControlPanelDisplay: "none"});
    });
  }
  onClickNewsDeleteNo = () => {
    this.setState({DeleteNewsButtonDisplay: "block"});
    this.setState({DeleteNewsYesNoContainerDisplay: "none"});
  }
/*News functions*/
/*Files functions*/
  onChangeFileName = (event) => {
    this.setState({borderColorName: "darkgrey"});
    const file = this.state.file;
    file.name = event.target.value;
    this.setState({file: file});
  }
  onChangeFilePath = (event) => {
    this.setState({borderColorPath: "darkgrey"});
    const file = this.state.file;
    file.path = event.target.value;
    this.setState({file: file});
  }
  onClickAddFile = () => {
    this.setState({fileBtnContainerDisplay: "none"});
    this.setState({filesControlPanelDisplay: "block"});
  }

  onClickCreateFile = () => {
    if(this.state.file.name === "") {
      this.setState({borderColorName: "red"});
    } else if(this.state.file.path === "") {
      this.setState({borderColorPath: "red"});
    } else {
      adminService.createFile(this.state.file).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            this.setState({file: data})
            this.setState({filesControlPanelDisplay: "none"});
            this.setState({filesUpdateControlPanelDisplay: "block"});
            this.setState({DeleteFileButtonDisplay: "block"});
            this.setState({terminalData: JSON.stringify(data)});
          });
        } else {
          return response.text().then(error => {this.setState({terminalData: error})});
        }
      });
    }
  }

  onClickChangeFile = () => {
    if(this.state.file.name === "") {
      this.setState({borderColorName: "red"});
    } else if(this.state.file.path === "") {
      this.setState({borderColorPath: "red"});
    } else {
      adminService.updateFile(this.state.file).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            this.setState({file: data});
            this.setState({terminalData: JSON.stringify(data)});
          });
        } else {
          return response.text().then(error => {this.setState({terminalData: error})});
        }
      });
    }
  }

  onClickDeleteFile = () => {
    this.setState({DeleteFileButtonDisplay: "none"});
    this.setState({DeleteFileYesNoContainerDisplay: "block"});
  }
  onClickFileDeleteYes = () => {
    adminService.deleteFile(this.state.file.id).then(responce => {
      return responce.text();
    }).then(data => {
      this.setState({terminalData: data});
    }).then(() => {
      this.setState({filesUpdateControlPanelDisplay: "none"});
    });
  }
  onClickFileDeleteNo = () => {
    this.setState({DeleteFileButtonDisplay: "block"});
    this.setState({DeleteFileYesNoContainerDisplay: "none"});
  }
  /*Files functions*/
  /*Lists functions*/
  createUsersListForPrint = (list) => {
    let terminalData;
    if (Array.isArray(list) && list.length) {
      let count = 0;
      terminalData = (
          <div>
              {
                list.map(item => {
                  return(
                    <div style={{cursor: "pointer"}} onClick={async() => {
                        await this.setState({user: item});
                        this.setState({selected: item.gender});
                        if(item.roles.includes("ADMINISTRATOR")) {
                          this.setState({checked: true});
                        }
                        this.setState({userUpdateControlPanelDisplay: "block"});
                        this.setState({DeleteUserButtonDisplay: "block"});
                        scroller.scrollTo("interactive_screen", {
                          spy: true,
                          smooth: true,
                          offset:-300,
                          duration: 500
                        });
                      }}>
                      <pre>{++count}) {JSON.stringify(item)}</pre>
                    </div>
                  );
                })
              }
          </div>
      );
    } else {
      terminalData = "No users found";
    }
    this.setState({terminalData: terminalData});
  }

  createNewsListForPrint = (list) => {
    let terminalData;
    if (Array.isArray(list) && list.length) {
      let count = 0;
      terminalData = (
          <div>
              {
                list.map(item => {
                  return(
                    <div key={item.id} style={{cursor: "pointer"}} onClick={async() => {
                        await this.setState({news: item});
                        this.setState({newsUpdateControlPanelDisplay: "block"});
                        this.setState({DeleteNewsButtonDisplay: "block"});
                        scroller.scrollTo("interactive_screen", {
                          spy: true,
                          smooth: true,
                          offset:-300,
                          duration: 500
                        });
                      }}>
                      <pre>{++count}) {JSON.stringify(item)}</pre>
                    </div>
                  );
                })
              }
          </div>
      );
    } else {
      terminalData = "No news found";
    }
    this.setState({terminalData: terminalData});
  }

  createFilesListForPrint = (list) => {
    let terminalData;
    if (Array.isArray(list) && list.length) {
      let count = 0;
      terminalData = (
          <div>
              {
                list.map(item => {
                  return(
                    <div key={item.id} style={{cursor: "pointer"}} onClick={async() => {
                        await this.setState({file: item});
                        this.setState({filesUpdateControlPanelDisplay: "block"});
                        this.setState({DeleteFileButtonDisplay: "block"});
                        scroller.scrollTo("interactive_screen", {
                          spy: true,
                          smooth: true,
                          offset:-300,
                          duration: 500
                        });
                      }}>
                      <pre>{++count}) {JSON.stringify(item)}</pre>
                    </div>
                  );
                })
              }
          </div>
      );
    } else {
      terminalData = "No files found";
    }
    this.setState({terminalData: terminalData});
  }

  createLogsListForPrint = (list) => {
    let terminalData;
    if (Array.isArray(list) && list.length) {
      let count = 0;
      terminalData = (
          <div>
              {
                list.map(item => {
                  return(
                    <div>
                      <pre>{++count}) {JSON.stringify(item)}</pre>
                    </div>
                  );
                })
              }
          </div>
      );
    } else {
      terminalData = "No logs";
    }
    this.setState({terminalData: terminalData});
  }
  /*Lists functions*/
  /*Menu functions*/
  onClickUser = () => {
    this.clearState();
    this.setState({userBtnContainerDisplay: "block"});
  }
  onClickNews = () => {
    this.clearState();
    this.setState({newsBtnContainerDisplay: "block"});
  }
  onClickFiles = () => {
    this.clearState();
    this.setState({fileBtnContainerDisplay: "block"});
  }
  onClickListOfUsers = async () => {
    this.clearState();
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getListOfUsers().then(response => {
      if(response.ok) {
        return response.json().then(data => {
          this.createUsersListForPrint(data);
        });
      } else {
        return response.text().then(error => {this.setState({terminalData: error})});
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickListOfNews = async () => {
    this.clearState();
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getListOfNews().then(response => {
      if(response.ok) {
        return response.json().then(data => {
          this.createNewsListForPrint(data);
        });
      } else {
        return response.text().then(error => {this.setState({terminalData: error})});
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickListOfFiles = async () => {
    this.clearState();
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getListOfFiles().then(response => {
      return response.json()
    }).then(data => {
      this.createFilesListForPrint(data);
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onClickGetLogs = async () => {
    this.clearState();
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getLogs().then(response => {
      return response.json()
    }).then(data => {
      this.createLogsListForPrint(data);
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
/*Menu functions*/
/*Files upload functions*/
  onClicUpdateAcounts = () => {
    this.clearState();
    this.setState({XMLCountUodateControlPanelDisplay: "block"});
  }
  onClicUpdateDataBase = () => {
    this.clearState();
    this.setState({XMLDatabaseUpdateControlPanelDisplay: "block"});
  }
  onChangeUpdateCountFile = async (event) => {
    await this.setState({
      selectedCountFile: event.target.files[0]
    })
    if(this.state.selectedCountFile !== null) {
      this.setState({fileInputColor: "#09173f"});
    }
    if(this.state.selectedCountFile === undefined || this.state.selectedCountFile === null) {
      this.setState({fileInputColor: "red"});
    }
  }
  onClickUploadCountFile = async () => {
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.updateCounts(this.state.selectedCountFile).then(response => {
      if(response.ok) {
        return response.json().then(array => {
        return array.map(item => {
          return(<pre>{item}</pre>);
          })
        }).then(result => {
          this.setState({terminalData: result});
        });
      } else {
        return response.text().then(message => {
          this.setState({terminalData: message});
        });
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onChangeUpdateDatabaseFile = async (event) => {
    await this.setState({
      selectedDatabaseFile: event.target.files[0]
    })
    if(this.state.selectedDatabaseFile !== null) {
      this.setState({fileInputColor: "#09173f"});
    }
    if(this.state.selectedDatabaseFile === undefined || this.state.selectedDatabaseFile === null) {
      this.setState({fileInputColor: "red"});
    }
  }
  onClickUploadDatabaseFile = async () => {
    this.setState({XMLDatabaseUpdateControlPanelDisplay: "none"});
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.updateDatabase(this.state.selectedDatabaseFile).then(response => {
      if(response.ok) {
        return response.json().then(data => {
          this.createUsersListForPrint(data);
        });
      } else {
        return response.text().then(message => {
          this.setState({terminalData: message});
        });
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

/*Files upload functions*/
  render() {
    return(
      <AdminPage
        user={this.state.user}
        news={this.state.news}
        file={this.state.file}
        selected={this.state.selected}
        checked={this.state.checked}

        userBtnContainerDisplay={this.state.userBtnContainerDisplay}
        newsBtnContainerDisplay={this.state.newsBtnContainerDisplay}
        fileBtnContainerDisplay={this.state.fileBtnContainerDisplay}
        userControlPanelDisplay={this.state.userControlPanelDisplay}
        userFindPanelDisplay={this.state.userFindPanelDisplay}
        newsControlPanelDisplay={this.state.newsControlPanelDisplay}
        filesControlPanelDisplay={this.state.filesControlPanelDisplay}
        userUpdateControlPanelDisplay={this.state.userUpdateControlPanelDisplay}
        DeleteUserButtonDisplay={this.state.DeleteUserButtonDisplay}
        DeleteUserYesNoContainerDisplay={this.state.DeleteUserYesNoContainerDisplay}
        newsUpdateControlPanelDisplay={this.state.newsUpdateControlPanelDisplay}
        DeleteNewsButtonDisplay={this.state.DeleteNewsButtonDisplay}
        DeleteNewsYesNoContainerDisplay={this.state.DeleteNewsYesNoContainerDisplay}
        filesUpdateControlPanelDisplay={this.state.filesUpdateControlPanelDisplay}
        DeleteFileButtonDisplay={this.state.DeleteFileButtonDisplay}
        DeleteFileYesNoContainerDisplay={this.state.DeleteFileYesNoContainerDisplay}

        borderColorUsername={this.state.borderColorUsername}
        borderColorFirstName={this.state.borderColorFirstName}
        borderColorLastName={this.state.borderColorLastName}
        borderColorCount={this.state.borderColorCount}
        borderColorTitle={this.state.borderColorTitle}
        borderColorText={this.state.borderColorText}
        borderColorName={this.state.borderColorName}
        borderColorPath={this.state.borderColorPath}

        onClickUser={this.onClickUser}
        onClickNews={this.onClickNews}
        onClickFiles={this.onClickFiles}
        onClickListOfUsers={this.onClickListOfUsers}
        onClickListOfNews={this.onClickListOfNews}
        onClickListOfFiles={this.onClickListOfFiles}
        onClickGetLogs={this.onClickGetLogs}

        onClickAddUser={this.onClickAddUser}
        onClickFindUser={this.onClickFindUser}
        onClickUpdateUser={this.onClickUpdateUser}
        onClickGetUser={this.onClickGetUser}
        onClickCreateUser={this.onClickCreateUser}
        onChangeUserUsername={this.onChangeUserUsername}
        onChangeUserFirstName={this.onChangeUserFirstName}
        onChangeUserLastName={this.onChangeUserLastName}
        onChangeUserCount={this.onChangeUserCount}
        onChangeUserGender={this.onChangeUserGender}
        onChangeUserRole={this.onChangeUserRole}
        onClickDeleteUser={this.onClickDeleteUser}
        onClickDeleteYes={this.onClickDeleteYes}
        onClickDeleteNo={this.onClickDeleteNo}

        onClickAddNews={this.onClickAddNews}
        onClickCreateNews={this.onClickCreateNews}
        onClickChangeNews={this.onClickChangeNews}
        onClickDeleteNews={this.onClickDeleteNews}
        onClickNewsDeleteYes={this.onClickNewsDeleteYes}
        onClickNewsDeleteNo={this.onClickNewsDeleteNo}
        onChangeNewsTitle={this.onChangeNewsTitle}
        onChangeNewsText={this.onChangeNewsText}

        onChangeFileName={this.onChangeFileName}
        onChangeFilePath={this.onChangeFilePath}
        onClickCreateFile={this.onClickCreateFile}
        onClickAddFile={this.onClickAddFile}
        onClickChangeFile={this.onClickChangeFile}
        onClickDeleteFile={this.onClickDeleteFile}
        onClickFileDeleteYes={this.onClickFileDeleteYes}
        onClickFileDeleteNo={this.onClickFileDeleteNo}

        onClickSingleNew={this.onClickSingleNew}

        onClicUpdateAcounts={this.onClicUpdateAcounts}
        onClicUpdateDataBase={this.onClicUpdateDataBase}
        onChangeUpdateCountFile={this.onChangeUpdateCountFile}
        XMLCountUodateControlPanelDisplay={this.state.XMLCountUodateControlPanelDisplay}
        onClickUploadCountFile={this.onClickUploadCountFile}
        fileInputColor={this.state.fileInputColor}
        XMLDatabaseUpdateControlPanelDisplay={this.state.XMLDatabaseUpdateControlPanelDisplay}
        onChangeUpdateDatabaseFile={this.onChangeUpdateDatabaseFile}
        onClickUploadDatabaseFile={this.onClickUploadDatabaseFile}

        terminalData={this.state.terminalData}
        />
    );
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(AdminPageContainer);