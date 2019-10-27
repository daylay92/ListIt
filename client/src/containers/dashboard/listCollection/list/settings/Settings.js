import React from 'react';
import classes from './Settings.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Settings = props => (
  <div className={classes.settings}>
    <ul className={classes.settings__list}>
      <li className={classes.list_item} onClick={props.clickedRename}>
        <span className={classes.item__icon}>
          <FontAwesomeIcon icon='cogs' />
        </span>
        <span>Re-name</span>
      </li>
      <li className={classes.list_item} onClick={props.clickCreateGoal}>
        <span className={classes.item__icon}>
          <FontAwesomeIcon icon='plus' />
        </span>
        <span>Add goal</span>
      </li>
      <li className={classes.list_item}>
        <span className={classes.item__icon}>
          <FontAwesomeIcon icon='trash-alt' />
        </span>
        <span>Delete</span>
      </li>
    </ul>
  </div>
);

export default Settings;
