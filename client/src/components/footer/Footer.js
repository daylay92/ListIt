import React from 'react';
import classes from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className={classes.footer}>
    &copy; 2019{' '}
    <Link to='/'>
      <span>ListIt</span>
    </Link>{' '}
    <span>, by Ayodele. All Rights Reserved.</span>
  </footer>
);

export default Footer;
