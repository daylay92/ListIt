import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Error.module.css';
import WithClass from '../../../hocs/WithClass';

const Errory = props => {
  const style = props.show
    ? {
        right: '4px',
        opacity: 1,
        ...props.style
      }
    : {};

  return (
    <WithClass clasz={classes['error-popup']} style={style}>
      <button className={classes['error-popup__btn']} onClick={props.close}>
        <FontAwesomeIcon icon='times' />
      </button>
      <div className={classes['error-popup__content']}>
        <span className={classes['error-popup__icon']}>
          <FontAwesomeIcon icon='exclamation-circle' size='3x' />
        </span>
        <p className={classes['error-popup__text']}>{props.children}</p>
      </div>
    </WithClass>
  );
};

export default Errory;
