import UserService from "./../services/userService";
import RepresentationService from "./../services/representationService";
import AdminService from "./../services/adminService";
import AesUtil from './../services/SypherService.js';
import { createStore } from 'redux';
import mainReducer from './../reducers/mainReducer';

let store;

let startUrl;

if(process.env.NODE_ENV === "production") {
	startUrl = "./";
	store = createStore(mainReducer);
}

if(process.env.NODE_ENV === "development") {
	startUrl = "http://localhost:8080/";
	store = createStore(mainReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

const userService = new UserService(startUrl);
const adminService = new AdminService(startUrl);
const representationService = new RepresentationService(startUrl);
const sypherService = new AesUtil(128, 1000);

export {representationService, userService, adminService, sypherService, store};
