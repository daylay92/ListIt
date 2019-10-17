import React from 'react';
import classes from './Submit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Submit = props => {
  const style = props.show ? { pointerEvents: 'none' } : {};
  return (
    <div className={classes['btn-container']}>
      <button type='submit' style={style}>
        <span>{props.name}</span>
        {props.show ? <FontAwesomeIcon icon='spinner' spin size='sm' /> : null}
      </button>
    </div>
  );
};
export default Submit;
