import React from 'react';
import classes from './Submit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Submit = props => (
  <div className={classes['btn-container']}>
    <button type='submit'>
      <span>{props.name}</span>
      {props.show ? <FontAwesomeIcon icon='spinner' spin size='sm' /> : null}
    </button>
  </div>
);

export default Submit;
