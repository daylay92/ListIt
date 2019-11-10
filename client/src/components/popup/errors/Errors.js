import React from 'react';
import classes from './Errors.module.css';
import Errorr from '../error/Error';

const Errors = props => {
  const bucketErr =
    props.bErrors && props.bErrors.length
      ? props.bErrors.map(({ listId, message }, index) => (
          <Errorr
            key={listId + index}
            show={true}
            close={() => props.onCloseBucketErrHandler(listId)}
            style={{
              position: 'relative'
            }}
          >
            {message}
          </Errorr>
        ))
      : [];
  const goalErr =
    props.errors && props.errors.length
      ? props.errors.map(({ listId, goalId, message }, index) => (
          <Errorr
            key={goalId + listId + index}
            show={true}
            close={() => props.onCloseErrHandler(listId, goalId)}
            style={{
              position: 'relative'
            }}
          >
            {message}
          </Errorr>
        ))
      : [];
  const errors = [...bucketErr, ...goalErr];
  return <div className={classes.ErrDiv}>{errors.length ? errors : null}</div>;
};

export default Errors;
