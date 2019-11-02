import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import WithClass from '../WithClass';
import classes from './Layout.module.css';
import Header from '../../components/navigation/header/Header';
import Footer from '../../components/footer/Footer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showNavResponsive: false,
    open: false
  };
  toggleBtnClickHandler = () => {
    this.setState(({ showNavResponsive }) => ({
      showNavResponsive: !showNavResponsive
    }));
  };
  profileNavClickHandler = () => {
    this.setState(({ open }) => ({
      open: !open
    }));
  };
  updateSizing() {
    if (window.innerWidth > 600)
      this.setState({ showNavResponsive: false, open: false });
  }
  windowClickHandler = ({ target }) => {
    const profileNav = document.querySelector('.profileDiv');
    if (!profileNav) return;
    const navEls = profileNav.querySelectorAll('*');
    const isOthers = target !== profileNav && !Array.from(navEls).includes(target);
    if (isOthers) this.setState({ open: false });
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateSizing.bind(this));
    window.addEventListener('click', this.windowClickHandler);
  }

  componentDidUpdate() {
    if (this.state.open && this.props.loadingDash) {
      this.setState({ open: false });
    }
  }
  render() {
    const { location } = this.props.history;
    return (
      <WithClass clasz={classes['default-grid']}>
        <Header
          click={this.toggleBtnClickHandler}
          isShow={this.state.showNavResponsive}
          isAuth={this.props.isAuthenticated}
          open={this.state.open}
          profileClick={this.profileNavClickHandler}
          isDashboard={location.pathname === '/dashboard'}
          name={this.props.fullname}
          email={this.props.email}
        />
        <main className='main'>{this.props.children}</main>
        <Footer />
      </WithClass>
    );
  }
}
const checkUser = state =>
  state.auth.user ? state.auth.user.firstName + ' ' + state.auth.user.lastName : '';
const checkUserEmail = state => (state.auth.user ? state.auth.user.email : '');

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  fullname: checkUser(state),
  email: checkUserEmail(state),
  loadingDash: state.bucket.fetching
});
export default withRouter(connect(mapStateToProps)(Layout));
