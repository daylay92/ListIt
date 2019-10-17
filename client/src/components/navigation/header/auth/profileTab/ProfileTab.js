import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ProfileTab.module.css';
import WithClass from '../../../../../hocs/WithClass';

const ProfileTab = props => {
  const list = props.isDashboard ? (
    <ul>
      <li>
        <Link to='/logout'>Logout</Link>
      </li>
    </ul>
  ) : (
    <ul>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link to='/logout'>Logout</Link>
      </li>
    </ul>
  );
  return props.open ? (
    <WithClass clasz={[classes.profileList].join(' ')}>
      <div className={classes['profile-info']}>
        <p>{props.name}</p>
        <span>{props.email}</span>
      </div>
      {list}
    </WithClass>
  ) : null;
};

export default ProfileTab;
