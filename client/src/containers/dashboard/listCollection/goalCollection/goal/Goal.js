import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Goal.module.css';

const Goal = props => (
  <div className={classes.goalWrapper}>
    <div className={classes.goalHeader}>
      <div className={classes.statusSummary}>
        <div className={classes.dateWrapper}>
          <span className={classes.dateLabel}>Created on:</span>
          <span className={classes.date}>{props.createdOn}</span>
        </div>
        <div className={classes.statusWrapper}>
          <span className={classes.statusLabel}>Status:</span>
          <span className={classes.status}>{props.status}</span>
        </div>
      </div>
      <div className={classes.settingWrapper} tag={props.tag} parenttag={props.parentTag}>
        <FontAwesomeIcon icon='cog' />
      </div>
    </div>
    <div className={classes.goalMain}>
      <span>{props.mainText}</span>
    </div>
    <div className={classes.goalFooter}>
      <div className={classes.dateRemaining}>
        <span className={classes.countLabel}>Remaining:</span>
        <span className={classes.count}>forever</span>
      </div>
    </div>
  </div>
);

export default Goal;
