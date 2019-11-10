import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import classes from './Goal.module.css';
import Settings from './settings/Settings';

const Goal = props => (
  <div
    className={
      props.status === 'completed'
        ? [classes.goalWrapper, classes.completed].join(' ')
        : classes.goalWrapper
    }
  >
    <div className={classes.goalHeader}>
      <div className={classes.statusSummary}>
        <div className={classes.dateWrapper}>
          <span className={classes.dateLabel}>Created on:</span>
          <span className={classes.date}>{`${new Date(
            props.createdOn
          ).getFullYear()}-${new Date(props.createdOn).getMonth() + 1}-${
            new Date(props.createdOn).getDate() < 10
              ? '0' + new Date(props.createdOn).getDate().toString()
              : new Date(props.createdOn).getDate()
          }
          `}</span>
        </div>
        <div className={classes.statusWrapper}>
          <span className={classes.statusLabel}>Status:</span>
          <span className={classes.status}>{props.status}</span>
        </div>
      </div>
      <div className={classes.settingWrapper} tag={props.tag} parenttag={props.parentTag}>
        {props.processing ? (
          <span className={classes.loader}>
            <Loader type='ThreeDots' color='#35d4a4' height={6} width={25} />
          </span>
        ) : (
          <FontAwesomeIcon
            icon='cog'
            className={
              props.showSetting
                ? [classes['animate--rotate'], classes.setting_icon].join(' ')
                : classes.setting_icon
            }
            onClick={props.goalSettingToggle}
          />
        )}
        {props.showSetting ? (
          <Settings status={props.status} clickedMark={props.clickedMark} clickedDelete={props.clickedDelete} />
        ) : null}
      </div>
    </div>
    <div className={classes.goalMain}>
      <span>{props.mainText}</span>
    </div>
    <div className={classes.goalFooter}>
      <div className={classes.dateRemaining}>
        <span className={classes.countLabel}>Remaining:</span>
        <span className={classes.count}>{props.calDays}</span>
      </div>
    </div>
  </div>
);

export default Goal;
