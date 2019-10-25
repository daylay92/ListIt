import React from 'react';
import classes from './introText.module.css';

const IntroText = props => {
  return (
    <div className={classes.introText}>
      <p className={classes.introText_hero}>
        Hello {props.firstName}, You currently do not have a bucketlist
      </p>
      <p className={classes.introText_caption}>
        Dare to dream by adding some goals today, You never know where they would lead you.
      </p>
    </div>
  );
};

export default IntroText;
