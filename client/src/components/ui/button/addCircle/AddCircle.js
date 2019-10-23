import React from 'react';
import classes from './AddCircle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddCircle = props => {
  const icon = props.showAdd ? (
    <FontAwesomeIcon icon='minus' />
  ) : (
    <FontAwesomeIcon icon='plus' />
  );
  return (
    <span className={classes.addCircle} onClick={props.click}>
      <span className={classes.ghostCircle}></span>
      {icon}
    </span>
  );
};

export default AddCircle;
