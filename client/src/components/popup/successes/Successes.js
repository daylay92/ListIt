import React from 'react';
import classes from './Successes.module.css';
import Success from '../success/Success';

const Successes = props => {
  const bucketSuccess =
    props.bResults && props.bResults.length
      ? props.bResults.map(({ listId, message }, index) => (
          <Success
            key={listId + index}
            show={true}
            close={() => props.onCloseBucketSucHandler(listId)}
            style={{
              position: 'relative'
            }}
          >
            {message}
          </Success>
        ))
      : [];
  const goalSuccess =
    props.results && props.results.length
      ? props.results.map(({ listId, goalId, message }, index) => (
          <Success
            key={goalId + listId + index}
            show={true}
            close={() => props.onCloseSucHandler(listId, goalId)}
            style={{
              position: 'relative'
            }}
          >
            {message}
          </Success>
        ))
      : [];
  const successMsg = [...bucketSuccess, ...goalSuccess];

  return <div className={classes.sucDiv}>{successMsg.length ? successMsg : null}</div>;
};

export default Successes;
