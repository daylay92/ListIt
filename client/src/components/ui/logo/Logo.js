import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.css';

const Logo = props => (
  <div className={classes.logo} style={props.style}>
    <Link to='/'>ListIt</Link>
  </div>
);

export default Logo;
