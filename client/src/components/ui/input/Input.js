import React from 'react';
import classes from './Input.module.css';

const Input = props => {
  const isValid = !props.valid && props.startChange;
  const displayErrorSpan = isValid ? <span>{props.errorMessage}</span> : null;
  const defClass = [classes['input-wrapper']];
  if (props.startChange) {
    if (!props.valid) defClass.push(classes['invalid']);
    else defClass.push(classes['valid']);
  }
  return (
    <div className={defClass.join(' ')}>
      <input {...props.inputConfig} onChange={props.changed} disabled={props.disabled} />
      {displayErrorSpan}
    </div>
  );
};

export default Input;
