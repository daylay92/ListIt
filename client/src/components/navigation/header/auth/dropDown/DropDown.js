import React from 'react';
import NavItem from '../../navList/navItem/NavItem';
import classes from './DropDown.module.css';
import SearchBar from '../../../../ui/searchBar/SearchBar';
import Aux from '../../../../../hocs/Auxi';

const DropDown = props => {
  const navItems = props.isDashboard ? (
    <Aux>
      <li className={classes.search}>
        <SearchBar class={classes.searchBar} />
      </li>
      <NavItem path='/logout'>Logout</NavItem>
    </Aux>
  ) : (
    <Aux>
      <NavItem path='/dashboard'>Dashboard</NavItem>
      <NavItem path='/logout'>Logout</NavItem>
    </Aux>
  );
  return <ul className={classes.dropDown}>{navItems}</ul>;
};

export default DropDown;
