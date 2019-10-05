import React from 'react';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';

const Landing = props => (
  <div className={classes['hero-section']}>
    <div className={classes['hero-section__overlay']}></div>
    <div className={classes['hero-section__description']}>
      <h3 className={classes['hero-section__description-header']}>
        The best place to create and manage your bucket lists.
      </h3>
      <p> ListIt helps you to keep track of your goals.</p>
      <span><Link to='/signup'>Get Started</Link></span>
    </div>
  </div>
);

export default Landing;
