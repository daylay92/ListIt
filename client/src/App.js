import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faSpinner,
  faSearch,
  faExclamationCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hocs/layout/Layout';
import Landing from './components/home/Home';
import SignUp from './containers/auth/signup/SignUp';
import LogIn from './containers/auth/login/Login';
import Logout from './containers/auth/logout/Logout'
import Dashboard from './containers/dashboard/Dashboard';
import { connect } from 'react-redux';
import { syncAuthState } from './store/actions';

library.add(faBars, faSpinner, faSearch, faExclamationCircle, faTimes);

class App extends Component {
  componentDidMount() {
    this.props.syncState();
  }
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path='/signup' exact component={SignUp} />
            <Route path='/login' exact component={LogIn} />
            <Route path='/logout' exact component={Logout} />
            <Route path='/dashboard' exact component={Dashboard} />
            <Route path='/' exact component={Landing} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  syncState: () => {
    dispatch(syncAuthState());
  }
});
export default connect(
  null,
  mapDispatchToProps
)(App);
