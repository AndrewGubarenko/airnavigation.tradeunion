export default class AdminService {
  constructor(startUrl) {
    this.startUrl = startUrl + "admin";
  }

/*user*/
  createUser(user) {
    return fetch(this.startUrl + "/user", {
      method: "post",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  updateUser(user) {
    return fetch(this.startUrl + "/user/" + user.id, {
      method: "put",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  findUser(searchRequest) {
    return fetch(this.startUrl + "/user/filter", {
      method: "post",
      body: JSON.stringify(searchRequest),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  deleteUser(id) {
    return fetch(this.startUrl + "/user/" + id, {
      method: "delete",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }
/*user*/
/*news*/
  createNews(singleNew) {
    return fetch(this.startUrl + "/news", {
      method: "post",
      body: JSON.stringify(singleNew),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  updateNews(singleNew) {
    return fetch(this.startUrl + "/news/" + singleNew.id, {
      method: "put",
      body: JSON.stringify(singleNew),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  deleteNews(id){
    return fetch(this.startUrl + "/news/" + id, {
      method: "delete",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }
  /*news*/
  /*files*/
  createFile(file) {
    return fetch(this.startUrl + "/file", {
      method: "post",
      body: JSON.stringify(file),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  updateFile(file) {
    return fetch(this.startUrl + "/file/" + file.id, {
      method: "put",
      body: JSON.stringify(file),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  deleteFile(id){
    return fetch(this.startUrl + "/file/" + id, {
      method: "delete",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }
  /*files*/
  /*Lists*/
  getListOfUsers(){
    return fetch(this.startUrl + "/users_list", {
      method: "get",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  getListOfNews(){
    return fetch(this.startUrl + "/news_list", {
      method: "get",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  getListOfFiles(){
    return fetch(this.startUrl + "/files_list", {
      method: "get",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }
  /*Lists*/
  /*Update counts by file*/
  updateCounts(selectedCountFile) {
    return fetch(this.startUrl + "/finance_data", {
      method: "put",
      body: selectedCountFile
    });
  }

  updateDatabase(selectedDatabaseFile) {
    return fetch(this.startUrl + "/data_base", {
      method: "put",
      body: selectedDatabaseFile
    });
  }
  /*Update counts by file*/
  /*Logs*/
  getLogs() {
    return fetch(this.startUrl + "/logs", {
      method: "get"
    });
  }
  /*Logs*/
}
