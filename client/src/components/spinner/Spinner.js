import React from 'react';
import classes from './Spinner.module.css';

const Spinner = props => (
    props.show ? 
    (
        <div className={classes.spinnerWrapper}>
            <span className={classes.spinner}></span>
        </div>
    ): null
    );

export default Spinner;