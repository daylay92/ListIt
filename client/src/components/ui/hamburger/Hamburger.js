import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Hamburger.module.css';

const HamBurger = props => (
  <div className={classes.toggleBtn} onClick={props.click} style={props.style}>
    <FontAwesomeIcon icon='bars' pulse={false} />
  </div>
);

export default HamBurger;
