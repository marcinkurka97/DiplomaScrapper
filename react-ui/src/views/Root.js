import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainAppView from './MainAppView/MainAppView';
import LoginView from './LoginView/LoginView';
import MainTemplate from '../templates/MainTemplate';
import store from '../store';

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path="/" component={MainAppView} />
            <Route exact path="/login" render={() => <LoginView />} />
            <Route exact path="/register" render={() => <LoginView register />} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  );
}
