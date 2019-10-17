import React from 'react';
import classes from './AuthList.module.css';
import profileImg from '../../../../assets/img/profile.png';
import DropDown from './dropDown/DropDown';
import ProfileTab from './profileTab/ProfileTab';
import SearchBar from '../../../ui/searchBar/SearchBar';
import Aux from '../../../../hocs/Auxi';

const AuthList = props => {
  const dropDown = props.show ? (
    <div className={classes.authList}>
      <DropDown isDashboard={props.isDashboard} />
    </div>
  ) : null;
  const searchBar = props.isDashboard ? <SearchBar class={classes.searchBar} /> : null;
  return (
    <Aux>
      <div className={classes['authList--display-none']}>{searchBar}</div>
      <div
        className={[
          classes.authList,
          'profileDiv',
          classes['authList--display-none']
        ].join(' ')}
      >
        <span className={classes.profile}>
          <img src={profileImg} alt='' onClick={props.click} />
        </span>

        <ProfileTab
          open={props.open}
          isDashboard={props.isDashboard}
          name={props.name}
          email={props.email}
        />
      </div>
      {dropDown}
    </Aux>
  );
};

export default AuthList;
