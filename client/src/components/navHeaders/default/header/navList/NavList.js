import React from 'react';
import NavItem from './navItem/NavItem';
import classes from './NavList.module.css';

const NavList = props => {
  const allClasses = props.show? classes['navbar__list'] : `${classes['navbar__list']} ${
    classes['navbar__list--display-none']
  }`;
  return (
    <ul className={allClasses}>
      <NavItem path='/signup'>signup</NavItem>
      <NavItem path='/login'>login</NavItem>
    </ul>
  );
};

export default NavList;
