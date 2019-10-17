import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './SearchBar.module.css';

const SearchBar = props => (
  <div className={[classes.formWrapper, '' || props.class].join(' ')}>
    <input placeholder='Search for bucket lists by name' type='text' />
    <span className={classes.iconWrapper}>
      <FontAwesomeIcon icon='search' />
    </span>
  </div>
);
export default SearchBar;
