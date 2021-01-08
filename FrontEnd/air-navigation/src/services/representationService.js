export default class RepresentationService {
  constructor(startUrl) {
    this.startUrl = startUrl;
  }

  get() {
    return fetch(this.startUrl + "main", {
      method: "get",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  restorePassword(email) {
    return fetch(this.startUrl + "/password", {
      method: "put",
      body: email,
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }
}
