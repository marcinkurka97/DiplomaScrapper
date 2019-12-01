import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainAppView from './MainAppView';
import LoginView from './LoginView';
import MainTemplate from '../templates/MainTemplate';
import store from '../store';

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainTemplate>
          <Switch>
            <Route exact path="/" component={MainAppView} />
            <Route exact path="/login" component={LoginView} />
          </Switch>
        </MainTemplate>
      </BrowserRouter>
    </Provider>
  );
}
