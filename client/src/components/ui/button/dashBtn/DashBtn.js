import React from 'react';
import classes from './DashBtn.module.css';

const DashBtn = props => {
  const cssClass = props.extra ? [classes.dashBtn, props.extra] : [classes.dashBtn];
  return (
    <button {...props.config} className={cssClass.join(' ')} onClick={props.click}>
      {props.name}
    </button>
  );
};

export default DashBtn;
