import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import MainPageContainer from './containers/main-page-container';
import HeaderContainer from './containers/header-container';
import Footer from './components/footer';
import ChangePasswordContainer from './containers/changePasswordContainer';
import RestorePasswordContainer from './containers/RestorePasswordContainer';
import SingleNewContainer from './containers/SingleNewContainer';
import AdminPageContainer from './containers/admin-page-container';
import SpinnerContainer from './containers/spinner-container';
import GoUpButtonContainer from './containers/GoUpButtonContainer';
import './App.css';
import {Provider} from 'react-redux';
import {store, persistor} from './reducers/store';
import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<h1 style={{display: "flex", justifyContent: "center"}}>Loading...</h1>} persistor={persistor}>
          <BrowserRouter>
            <Route path="/" component={HeaderContainer} />
            <Route path="/" component={SpinnerContainer} />
            <Route path="/" component={GoUpButtonContainer} />
            <Route path="/main" component={MainPageContainer} />
            <Route path="/change_password" component={ChangePasswordContainer} />
            <Route path="/restore_password" component={RestorePasswordContainer} />
            <Route path="/news/:id" component={SingleNewContainer} />
            <Route path="/administrator" component={AdminPageContainer} />
            <Route path="/" component={Footer} />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
