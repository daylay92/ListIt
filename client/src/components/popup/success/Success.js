import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Success.module.css';
import WithClass from '../../../hocs/WithClass';

const Success = props => {
  const style = props.show
    ? {
        right: '4px',
        opacity: 1,
        ...props.style
      }
    : {};

  return (
    <WithClass clasz={classes['success-popup']} style={style}>
      <button className={classes['success-popup__btn']} onClick={props.close}>
        <FontAwesomeIcon icon='times' />
      </button>
      <div className={classes['success-popup__content']}>
        <span></span>
        <p className={classes['success-popup__text']}>{props.children}</p>
      </div>
    </WithClass>
  );
};

export default Success;
