import React from 'react';
import classes from './FormItem.module.css';
import Calendar from './calendar/Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormItem = props => {
  const toggleOff = props.showCalendar
    ? [classes.toggleOff, classes['toggle--opacity-zero']]
    : [classes.toggleOff];
  const toggleOn = props.showCalendar
    ? [classes.toggleOn]
    : [classes.toggleOn, classes['toggle--opacity-zero']];
  const calendar = props.showCalendar ? (
    <div className={classes.calendarContainer}>
      <Calendar
        name='From'
        varText='starting...'
        val={props.fromVal}
        changed={props.fromChanged}
        errMsg={props.fromErrMsg}
        isValid={props.fromValidState}
      />
      <Calendar
        name='To'
        varText='till...'
        val={props.toVal}
        changed={props.toChanged}
        errMsg={props.toErrMsg}
        isValid={props.toValidState}
      />
    </div>
  ) : null;

  return (
    <div className={classes.formItem}>
      <span className={classes.closeItem} onClick={props.closeItem}>
        <FontAwesomeIcon icon='times' />
      </span>
      <div className={classes.itemTextWrapper}>
        <textarea
          rows='2'
          placeholder='what would you like to achieve?'
          {...props.textConfig}
          onChange={props.changed}
          className={
            props.textValidState
              ? classes.itemText
              : [classes.itemText, classes.inValid].join(' ')
          }
        />
        {props.textValidState ? null : (
          <span className={classes.errSpan}>{props.textErrMsg}</span>
        )}
      </div>
      <div className={classes.trackWrapper}>
        <span className={classes.trackText}>Do you want us to keep track this goal?</span>
        <span className={classes.toggle} onClick={props.clicked}>
          <FontAwesomeIcon icon='toggle-off' size='2x' className={toggleOff.join(' ')} />
          <FontAwesomeIcon icon='toggle-on' size='2x' className={toggleOn.join(' ')} />
        </span>
        {calendar}
      </div>
    </div>
  );
};

export default FormItem;
