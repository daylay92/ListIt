import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Calendar.module.css';

const Calendar = props => (
  <div className={classes.calendarWrapper}>
    <span className={classes.label}>{props.name}</span>
    <span className={classes.calendarInput}>
      <FontAwesomeIcon icon='calendar-alt' />
      <DatePicker
        className={
          props.isValid
            ? classes.dateInput
            : [classes.dateInput, classes.inValid].join(' ')
        }
        placeholderText={props.varText}
        selected={props.val}
        onChange={props.changed}
      />
      {props.isValid ? null : <span className={classes.errSpan}>{props.errMsg}</span>}
    </span>
  </div>
);

export default Calendar;
