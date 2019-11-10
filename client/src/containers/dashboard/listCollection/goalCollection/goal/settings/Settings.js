import React from 'react';
import classes from './Settings.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Settings = props => (
  <div className={classes.settings}>
    <ul className={classes.settings__list}>
      <li className={classes.list_item} onClick={props.clickedMark}>
        <span className={classes.item__icon}>
          <FontAwesomeIcon icon='cogs' />
        </span>
        <span>
          {props.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
        </span>
      </li>
      <li className={classes.list_item} onClick={props.clickedDelete}>
        <span className={classes.item__icon}>
          <FontAwesomeIcon icon='trash-alt' />
        </span>
        <span>Delete</span>
      </li>
    </ul>
  </div>
);

export default Settings;
