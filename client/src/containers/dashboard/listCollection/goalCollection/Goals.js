import React from 'react';
import Goal from './goal/Goal';

const Goals = props =>
  props.goals.map(goal => (
    <Goal
      tag={goal._id}
      key={goal._id}
      parentTag={props.parentTag}
      mainText={goal.text}
      status={goal.status}
      createdOn={goal.createdAt}
      calDays={props.calDays(goal.tracking, goal.from, goal.to)}
      goalSettingToggle={() => props.settingToggle(props.parentTag, goal._id)}
      showSetting={props.goalSetting(props.parentTag, goal._id)}
      clickedMark={() => props.onClickedMark(props.parentTag, goal._id)}
      clickedDelete={() => props.onClickedDelete(props.parentTag, goal._id)}
      processing={ props.processing(props.parentTag, goal._id)}
    />
  ));

export default Goals;
