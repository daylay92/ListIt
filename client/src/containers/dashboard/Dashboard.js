import React, { Component } from 'react';
import WithClass from '../../hocs/WithClass';
import classes from './Dashboard.module.css';
import IntroText from './introText/IntoText';
import Lists from './listCollection/Lists';
import AddBucket from '../../components/ui/button/addBucket/AddBucket';
import AddCircle from '../../components/ui/button/addCircle/AddCircle';
import Spinner from '../../components/spinner/Spinner';
import ListForm from './listForm/ListForm';
import { closeForm, closeModal } from '../../store/actions';
import { connect } from 'react-redux';
import CreateGoal from './listCollection/goalCollection/createGoal/CreateGoal';

class Dashboard extends Component {
  state = {
    toggleSettings: [],
    renameListConfigs: [],
    toggleGoals: []
  };

  onClickAddHandler = e => {
    this.props.onCloseForm();
  };
  onClickToggleHandler = (listId, arr) => {
    this.setState(state => {
      const stateArr = [...state[arr]];
      const index = stateArr.findIndex(({ id }) => id === listId);
      if (0 > index) stateArr.push({ status: true, id: listId });
      else {
        const status = {
          ...stateArr[index],
          status: !stateArr[index].status
        };
        stateArr.splice(index, 1, status);
      }
      return { [arr]: stateArr };
    });
  };

  // onToggleGoalsHandler = (parentId,goalId) => {
  //   this.setState(state => {
  //     const toggleGoals = [...state.toggleGoals];
  //     const index = toggleGoals.findIndex(({ id,listId }) => id === goalId && parentId === listId);
  //     if (0 > index) toggleGoals.push({ status: true, id: goalId, listId: parentId });
  //     else {
  //       const status = {
  //         ...toggleGoals[index],
  //         status: !toggleGoals[index].status
  //       };
  //       toggleGoals.splice(index, 1, status);
  //     }
  //     return { toggleGoals };
  //   });
  // };
  // }
  onClickRenameHandler = (value, listId) => {
    const listConfigs = [...this.state.renameListConfigs];
    const index = listConfigs.findIndex(({ id }) => id === listId);
    const newConfig = {
      value,
      id: listId,
      valid: true,
      show: true
    };
    if (0 > index) listConfigs.push(newConfig);
    else {
      const config = {
        ...listConfigs[index],
        show: true
      };
      listConfigs.splice(index, 1, config);
    }
    this.setState({ renameListConfigs: listConfigs });
  };

  onCancelRenameHandler = (value, listId) => {
    const listConfigs = [...this.state.renameListConfigs];
    const index = listConfigs.findIndex(({ id }) => id === listId);
    const config = {
      ...listConfigs[index],
      value,
      show: false,
      valid: true
    };
    listConfigs.splice(index, 1, config);
    this.setState({ renameListConfigs: listConfigs });
  };
  onChangeRenameHandler = ({ target }, listId) => {
    const listConfigs = [...this.state.renameListConfigs];
    const index = listConfigs.findIndex(({ id }) => id === listId);
    const config = {
      ...listConfigs[index],
      value: target.value,
      valid: target.value.trim().length >= 3 ? true : false
    };
    listConfigs.splice(index, 1, config);
    this.setState({ renameListConfigs: listConfigs });
  };
  fetchShowRenameInput = listId => {
    const config = this.state.renameListConfigs.find(({ id }) => id === listId);
    return config ? config.show : false;
  };
  showGoals = listId => {
    const config = this.state.toggleGoals.find(({ id }) => id === listId);
    return config ? config.status : false;
  };
  fetchRenameValue = (listId, value) => {
    const config = this.state.renameListConfigs.find(({ id }) => id === listId);
    return config ? config.value : value;
  };
  fetchRenameIsValid = listId => {
    const config = this.state.renameListConfigs.find(({ id }) => id === listId);
    return config ? config.valid : false;
  };
  fetchToggleStatus = listId => {
    const setting = this.state.toggleSettings.find(({ id }) => id === listId);
    return setting ? setting.status : false;
  };
  totalGoals = goals => goals.length;

  completedGoals = goals =>
    goals.filter(({ status }) => status.toLowerCase() === 'done').length;

  pendingGoals = goals =>
    goals.filter(({ status }) => status.toLowerCase() === 'pending').length;
  closeSettingHandler = ({ target }) => {
    const settingWrapper = document.querySelectorAll('div[listsetting]');
    if (!settingWrapper) return;
    const descendants = [];
    Array.from(settingWrapper).forEach(elem =>
      descendants.push(...Array.from(elem.querySelectorAll('*')))
    );
    const isOthers = !descendants.includes(target);
    if (isOthers) {
      const settings = [...this.state.toggleSettings];
      const toggleSettings = settings.map(setting => ({
        ...setting,
        status: false
      }));
      this.setState({ toggleSettings });
    }
  };
  onClickCreateGoalHandler = () => {
    this.props.onOpenModal();
  };
  componentDidMount() {
    window.addEventListener('click', this.closeSettingHandler);
  }
  render() {
    return (
      <WithClass clasz={classes.dashboardWrapper}>
        <Spinner show={this.props.loading} />
        <CreateGoal />
        <div className={classes.wrapper}>
          <div className={classes.mainContainer}>
            <div className={classes.bucketHeader}>BUCKETLIST</div>
            <ListForm open={this.props.closeForm} />
            <div>
              <Lists
                lists={this.props.lists}
                calGoals={this.totalGoals}
                calDone={this.completedGoals}
                calPending={this.pendingGoals}
                clickedSetting={this.onClickToggleHandler}
                showSetting={this.fetchToggleStatus}
                clickRename={this.onClickRenameHandler}
                showRenameInput={this.fetchShowRenameInput}
                hideRename={this.onCancelRenameHandler}
                validRename={this.fetchRenameIsValid}
                onRename={this.onChangeRenameHandler}
                renameValue={this.fetchRenameValue}
                showGoals={this.showGoals}
                openModal={this.onClickCreateGoalHandler}
              />
            </div>
            {this.props.lists.length ? null : (
              <IntroText firstName={this.props.firstName} />
            )}
            <AddBucket click={this.onClickAddHandler} stop={!this.props.closeForm} />
            <AddCircle showAdd={this.props.closeForm} click={this.onClickAddHandler} />
          </div>
        </div>
      </WithClass>
    );
  }
}
const fetchFirstName = state => (state.auth.user ? state.auth.user.firstName : '');
const mapDispatchToProps = dispatch => ({
  onCloseForm: () => {
    dispatch(closeForm());
  },
  onOpenModal: () => {
    dispatch(closeModal());
  }
});
const mapStateToProps = state => ({
  firstName: fetchFirstName(state),
  closeForm: state.bucket.closeForm,
  loading: state.bucket.loading,
  lists: state.bucket.bucketLists
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
