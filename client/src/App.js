import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faSpinner,
  faSearch,
  faExclamationCircle,
  faTimes,
  faPlus,
  faMinus,
  faToggleOff,
  faToggleOn,
  faCalendar,
  faCalendarAlt,
  faCog,
  faChevronDown,
  faTrashAlt,
  faCogs,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hocs/layout/Layout';
import Landing from './components/home/Home';
import SignUp from './containers/auth/signup/SignUp';
import LogIn from './containers/auth/login/Login';
import Logout from './containers/auth/logout/Logout';
import Dashboard from './containers/dashboard/Dashboard';
import { connect } from 'react-redux';
import { syncAuthState } from './store/actions';

library.add(
  faBars,
  faSpinner,
  faSearch,
  faExclamationCircle,
  faTimes,
  faPlus,
  faMinus,
  faToggleOff,
  faToggleOn,
  faCalendar,
  faCalendarAlt,
  faCog,
  faChevronDown,
  faTrashAlt,
  faCogs,
  faTimesCircle
);

class App extends Component {
  componentDidMount() {
    this.props.syncState();
  }
  guardRoutes() {
    return this.props.isAuth ? (
      <Switch>
        <Redirect from='/signup' to='/dashboard' />
        <Redirect from='/login' to='/dashboard' />
        <Route path='/logout' exact component={Logout} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/' exact component={Landing} />
      </Switch>
    ) : (
      <Switch>
        <Route path='/signup' exact component={SignUp} />
        <Route path='/login' exact component={LogIn} />
        <Route path='/' exact component={Landing} />
        <Route component={Landing} />
      </Switch>
    );
  }
  render() {
    return (
      <Router>
        <Layout>{this.guardRoutes()}</Layout>
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.token
});
const mapDispatchToProps = dispatch => ({
  syncState: () => {
    dispatch(syncAuthState());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
