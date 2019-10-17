import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.css';

const NavItem = props => (
  <li className={classes['navbar__list-item']}>
    <NavLink to={props.path} activeClassName={classes['activeLink']} exact>
      {props.children}
    </NavLink>
  </li>
);

export default NavItem;
