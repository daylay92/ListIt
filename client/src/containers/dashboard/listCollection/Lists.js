import React from 'react';
import List from './list/List';

const Lists = props =>
  props.lists.map(list => (
    <List
      tag={list._id}
      name={list.name}
      key={list._id}
      createdOn={list.createdAt}
      totalGoals={props.calGoals(list.goals)}
      goals={list.goals}
      done={props.calDone(list.goals)}
      pending={props.calPending(list.goals)}
      clickedSetting={() => props.clickedSetting(list._id, 'toggleSettings')}
      showSetting={props.showSetting(list._id)}
      clickRename={() => props.clickRename(list.name, list._id)}
      showRename={props.showRenameInput(list._id)}
      hideRename={() => props.hideRename(list.name, list._id)}
      validRename={props.validRename(list._id)}
      onRename={e => props.onRename(e, list._id)}
      renameValue={props.renameValue(list._id, list.name)}
      showGoals={props.showGoals(list._id)}
      toggleGoals={()=>props.clickedSetting(list._id, 'toggleGoals')}
      openCreateGoals={props.openModal}
      calDays={props.calDays}
    />
  ));

export default Lists;
