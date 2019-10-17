import React from 'react';
import classes from './Header.module.css';
import Logo from '../../ui/logo/Logo';
import HamBurger from '../../ui/hamburger/Hamburger';
import NavList from './navList/NavList';
import AuthList from './auth/AuthList';

const Header = props => {
  const currNav = props.isAuth ? (
    <AuthList
      show={props.isShow}
      click={props.profileClick}
      open={props.open}
      isDashboard={props.isDashboard}
      name={props.name}
      email={props.email}
    />
  ) : (
    <NavList show={props.isShow} />
  );
  return (
    <header className={classes.header}>
      <nav className={classes.navbar}>
        <Logo style={{ marginLeft: '3rem' }} />
        <HamBurger click={props.click} />
        {currNav}
      </nav>
    </header>
  );
};
export default Header;
