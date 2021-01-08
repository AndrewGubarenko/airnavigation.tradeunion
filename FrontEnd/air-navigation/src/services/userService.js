export default class UserService {
  constructor(startUrl) {
    this.startUrl = startUrl + "user";
  }

  getUser(id) {
    return fetch(this.startUrl + "/" + id, {
      method: "get",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  /*security*/
  authenticate(authData) {
    return fetch(this.startUrl + "/authentication", {
      method: "post",
      body: JSON.stringify(authData),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  changePassword(passData, id) {
    return fetch(this.startUrl + "/" + id + "/password", {
      method: "put",
      body: JSON.stringify(passData),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  /*security*/
}
