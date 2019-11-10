import React from 'react';
import classes from './List.module.css';
import Settings from './settings/Settings';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
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
          {props.processing ? (
            <span className={classes.loader}>
              <Loader type='ThreeDots' color='#35d4a4' height={8} width={25} />
            </span>
          ) : (
            <FontAwesomeIcon
              icon='cog'
              className={
                props.showSetting
                  ? [classes['animate--rotate'], classes.setting_icon].join(' ')
                  : classes.setting_icon
              }
              onClick={props.clickedSetting}
            />
          )}
          {props.showSetting ? (
            <Settings
              clickedRename={props.clickRename}
              clickCreateGoal={props.openCreateGoals}
              clickDeleteList={props.clickDeleteList}
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
            <div className={classes.btnz}>
            <button className={classes.btnSave} disabled={!props.validRename}>
              save
            </button>
            <button className={classes.btnCancel} onClick={props.hideRename}>
              cancel
            </button>
            </div>
          </div>
        )}
      </div>
      {props.showGoals ? (
        <div className={classes.goals}>
          <Goals
            goals={props.goals}
            parentTag={props.tag}
            calDays={props.calDays}
            settingToggle={props.goalSettingToggle}
            goalSetting={props.goalSetting}
            onClickedMark={props.clickedMark}
            onClickedDelete={props.clickedDelete}
            processing={props.onProcessGoal}
          />
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
