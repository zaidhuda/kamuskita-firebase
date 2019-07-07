/* eslint-disable react/jsx-filename-extension */
import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';

import Header from './components/Header';
import UserSignUp from './pages/UserSignUp';
import UserSignIn from './pages/UserSignIn';
import UserRecover from './pages/UserRecover';
import User from './pages/User';
import UserEdit from './pages/UserEdit';
import DefinitionAdd from './pages/DefinitionAdd';
import Definition from './pages/Definition';
import DefinitionList from './pages/DefinitionList';
import DefinitionBrowse from './pages/DefinitionBrowse';
import DefinitionRandom from './pages/DefinitionRandom';
import Privacy from './pages/Privacy';

class App extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Header />
        <Switch>
          <Route exact path="/sign_up" component={UserSignUp} />
          <Route exact path="/sign_in" component={UserSignIn} />
          <Route exact path="/recover" component={UserRecover} />
          <Route exact path={['/u/edit', '/password']} component={UserEdit} />
          <Route path="/u/:user" component={User} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/add" component={DefinitionAdd} />
          <Route exact path="/browse" component={DefinitionBrowse} />
          <Route exact path="/random" component={DefinitionRandom} />
          <Route path="/w/:word/d/:id" component={Definition} />
          <Route path={['/w/:word', '/:word', '/']} component={DefinitionList} />
        </Switch>
      </Router>
    );
  }
}

export default App;
