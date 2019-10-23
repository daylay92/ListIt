import React from 'react';
import classes from './AddBucket.module.css';

const AddBucket = props => (
  <div className={classes.btnWrapper}>
    <span
      className={classes.addBtn}
      onClick={props.click}
      style={props.stop ? {} : { pointerEvents: 'none', background: '#329c7d' }}
    >
      Add
    </span>
  </div>
);

export default AddBucket;
