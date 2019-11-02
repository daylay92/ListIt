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
    />
  ));

export default Goals;
