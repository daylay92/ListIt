import React from 'react';
import classes from './Header.module.css';
import Logo from '../../../ui/logo/Logo';
import HamBurger from '../../../ui/hamburger/Hamburger';
import NavList from './navList/NavList';

const Header = props => (
  <header className={classes.header}>
    <nav className={classes.navbar}>
      <Logo style={{ marginLeft: '3rem' }} />
      <HamBurger click={props.click} />
      <NavList show={props.isShow} />
    </nav>
  </header>
);

export default Header;
