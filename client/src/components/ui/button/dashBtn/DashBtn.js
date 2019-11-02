import React from 'react';
import classes from './DashBtn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashBtn = props => {
  const cssClass = props.extra ? [classes.dashBtn, props.extra] : [classes.dashBtn];
  return (
    <button {...props.config} className={cssClass.join(' ')} onClick={props.click}>
      <span>{props.name}</span>
      {props.show ? <FontAwesomeIcon icon='spinner' spin size='sm' /> : null}
    </button>
  );
};

export default DashBtn;
