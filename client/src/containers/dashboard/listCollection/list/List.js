import React from 'react';
import classes from './List.module.css';
import Settings from './settings/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Goals from '../goalCollection/Goals';

const List = props => {
  return (
    <div className={classes.list} tag={props.tag}>
      <div className={classes.list__header}>
        <div className={classes.dateWrapper}>
          <span className={classes.dateLabel}>created on:</span>
          <span className={classes.date}>
            {`${new Date(props.createdOn).getFullYear()}-${new Date(
              props.createdOn
            ).getMonth() + 1}-${
              new Date(props.createdOn).getDate() < 10
                ? '0' + new Date(props.createdOn).getDate().toString()
                : new Date(props.createdOn).getDate()
            }
            `}
          </span>
        </div>
        <div className={classes.settingWrapper} listsetting='true'>
          <FontAwesomeIcon
            icon='cog'
            className={
              props.showSetting
                ? [classes['animate--rotate'], classes.setting_icon].join(' ')
                : classes.setting_icon
            }
            onClick={props.clickedSetting}
          />
          {props.showSetting ? (
            <Settings
              clickedRename={props.clickRename}
              clickCreateGoal={props.openCreateGoals}
            />
          ) : null}
        </div>
      </div>
      <div className={classes.list__main}>
        {!props.showRename ? (
          <span className={classes.listName}>{props.name}</span>
        ) : (
          <div className={classes.renameInput}>
            <div
              className={
                props.validRename
                  ? classes.renamingInputWrapper
                  : [classes.renamingInputWrapper, classes.invalid].join(' ')
              }
            >
              <input value={props.renameValue} onChange={props.onRename} />
              {props.validRename ? null : (
                <span>It must be atleast 3 characters long</span>
              )}
            </div>
            <button className={classes.btnSave} disabled={!props.validRename}>
              save
            </button>
            <button className={classes.btnCancel} onClick={props.hideRename}>
              cancel
            </button>
          </div>
        )}
      </div>
      {props.showGoals ? (
        <div className={classes.goals}>
          <Goals goals={props.goals} parentTag={props.tag} calDays={props.calDays} />
        </div>
      ) : null}
      <div className={classes.list__footer}>
        <div className={classes.list__summary}>
          <span className={classes.summary__label}>Goals</span>
          <span className={classes.summary__value}>{props.totalGoals}</span>
        </div>
        <div className={classes.list__summary}>
          <span className={classes.summary__label}>Done</span>
          <span className={classes.summary__value}>{props.done}</span>
        </div>
        <div className={classes.list__summary}>
          <span className={classes.summary__label}>undone</span>
          <span className={classes.summary__value}>{props.pending}</span>
        </div>
        <div className={classes.list__dropBtn} onClick={props.toggleGoals}>
          <FontAwesomeIcon
            icon='chevron-down'
            className={props.showGoals ? classes.turnUp : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
