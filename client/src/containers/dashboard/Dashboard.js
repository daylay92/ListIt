import React, { Component } from 'react';
import WithClass from '../../hocs/WithClass';
import classes from './Dashboard.module.css';
import IntroText from './introText/IntoText';
import Lists from './listCollection/Lists';
import AddBucket from '../../components/ui/button/addBucket/AddBucket';
import AddCircle from '../../components/ui/button/addCircle/AddCircle';
import Spinner from '../../components/spinner/Spinner';
import ListForm from './listForm/ListForm';
import {
  closeForm,
  closeModal,
  onFetchList,
  showFetchError,
  showCreateError,
  toggleSuccessMessage,
  clearGoalError,
  clearGoalSuccessMsg,
  onMarkGoal,
  onDeleteGoal,
  onDeleteBucket,
  clearBucketError,
  clearBucketSuccess
} from '../../store/actions';
import { connect } from 'react-redux';
import CreateGoal from './listCollection/goalCollection/createGoal/CreateGoal';
import Errory from '../../components/popup/error/Error';
import Errors from '../../components/popup/errors/Errors';
import Success from '../../components/popup/success/Success';
import Successes from '../../components/popup/successes/Successes';
class Dashboard extends Component {
  _isMounted = false;
  state = {
    toggleSettings: [],
    renameListConfigs: [],
    toggleGoals: [],
    goalsStatus: []
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

  goalSettingToggleHandler = (parentId, goalId) => {
    this.setState(state => {
      const goalsStatus = [...state.goalsStatus];
      const index = goalsStatus.findIndex(
        ({ id, listId }) => id === goalId && parentId === listId
      );
      if (0 > index) goalsStatus.push({ status: true, id: goalId, listId: parentId });
      else {
        const status = {
          ...goalsStatus[index],
          status: !goalsStatus[index].status
        };
        goalsStatus.splice(index, 1, status);
      }
      return { goalsStatus };
    });
  };
  showGoalSetting = (parentId, goalId) => {
    const config = this.state.goalsStatus.find(
      ({ id, listId }) => id === goalId && parentId === listId
    );
    return config ? config.status : false;
  };
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
    goals.filter(({ status }) => status.toLowerCase() === 'completed').length;

  pendingGoals = goals =>
    goals.filter(({ status }) => status.toLowerCase() === 'pending').length;
  calDays = (tracking, from, to) => {
    if (!tracking) return 'forever';
    const hasBegan = new Date(from).getTime() > new Date().getTime();
    if (hasBegan) return 'forever';
    const diff = new Date(to).getTime() - new Date().getTime();
    if (0 > diff) return '0 days';
    const secondsTodays = 60 * 60 * 24;
    const days = diff / 1000 / secondsTodays;
    const roundedDay = Math.round(days);
    return roundedDay > 1 ? `${roundedDay} days` : `${roundedDay} day`;
  };
  closeSettingHandler = ({ target }) => {
    if (!this._isMounted) return;
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
  onClickCloseGoalHandler = ({ target }) => {
    if (!this._isMounted) return;
    const settingWrapper = document.querySelectorAll('div[parenttag]');
    if (!settingWrapper) return;
    const descendants = [];
    Array.from(settingWrapper).forEach(elem =>
      descendants.push(...Array.from(elem.querySelectorAll('*')))
    );
    const isOthers = !descendants.includes(target);
    if (isOthers) {
      const settings = [...this.state.goalsStatus];
      const goalsStatus = settings.map(setting => ({
        ...setting,
        status: false
      }));
      this.setState({ goalsStatus });
    }
  };
  closeErrHandler = (type = 'fetch') => {
    switch (type) {
      case 'fetch':
        this.props.onCloseFetchErr();
        break;
      case 'create':
        this.props.onCloseCreateErr();
        break;
      default:
        break;
    }
  };
  closeSuccessHandler = () => {
    this.props.onCloseSuccess();
  };
  onCloseErrHandler = (listId, goalId) => {
    this.props.onCloseGoalErr(listId, goalId);
  };
  onClickedMarkHandler = (listId, goalId) => {
    this.goalSettingToggleHandler(listId, goalId);
    this.props.onMarkGoal(this.props.token, listId, goalId);
  };
  onDeleteGoalHandler = (listId, goalId) => {
    this.goalSettingToggleHandler(listId, goalId);
    this.props.onDeleteGoal(this.props.token, listId, goalId);
  };
  onCloseSucHandler = (listId, goalId) => {
    this.props.onCloseGoalSuccess(listId, goalId);
  };
  onProcessGoals = (listId, goalId) => {
    const processingGoals = this.props.processingGoals;
    if (!processingGoals.length) return false;
    const isProcessing = processingGoals.findIndex(
      status => status.listId === listId && status.goalId === goalId
    );
    return isProcessing < 0 ? false : true;
  };
  onProcessList = listId => {
    const processingBucket = this.props.processingBucket;
    if (!processingBucket.length) return false;
    const isProcessing = processingBucket.findIndex(id => id === listId);
    return isProcessing < 0 ? false : true;
  };
  onDeleteListHandler = listId => {
    this.onClickToggleHandler(listId, 'toggleSettings');
    this.props.onDeleteBucket(this.props.token, listId);
  };
  onCloseBucketSucHandler = listId => {
    this.props.onCloseBucketSuccess(listId);
  };
  onCloseBucketErrHandler = listId => {
    this.props.onCloseBucketErr(listId);
  };
  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('click', this.closeSettingHandler);
    window.addEventListener('click', this.onClickCloseGoalHandler);
    this.props.onFetchLists(this.props.token);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <WithClass clasz={classes.dashboardWrapper}>
        <Success show={this.props.showSuccess} close={this.closeSuccessHandler}>
          {this.props.successMessage}
        </Success>
        <Errory show={this.props.showFetchError} close={this.closeErrHandler}>
          {this.props.fetchError}
        </Errory>
        <Errory
          show={this.props.showCreateError}
          close={() => this.closeErrHandler('create')}
        >
          {this.props.createError}
        </Errory>
        <Errors
          onCloseErrHandler={this.onCloseErrHandler}
          errors={this.props.goalErrors}
          bErrors={this.props.bucketProcessErrors}
          onCloseBucketErrHandler={this.onCloseBucketErrHandler}
        />
        <Successes
          results={this.props.goalProcessSuccess}
          bResults={this.props.bucketProcessSuccess}
          onCloseSucHandler={this.onCloseSucHandler}
          onCloseBucketSucHandler={this.onCloseBucketSucHandler}
        />
        <Spinner show={this.props.fetching} />
        <CreateGoal />
        <div className={classes.wrapper}>
          <div className={classes.mainContainer}>
            <div className={classes.bucketHeader}>BUCKETLIST</div>
            <ListForm open={this.props.closeForm} />
            {this.props.lists.length ? (
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
                  calDays={this.calDays}
                  goalSettingToggle={this.goalSettingToggleHandler}
                  goalSetting={this.showGoalSetting}
                  clickedMark={this.onClickedMarkHandler}
                  clickedDelGoal={this.onDeleteGoalHandler}
                  onProcessGoal={this.onProcessGoals}
                  onProcessList={this.onProcessList}
                  onDeleteList={this.onDeleteListHandler}
                />
              </div>
            ) : (
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
  },
  onFetchLists: token => {
    dispatch(onFetchList(token));
  },
  onCloseFetchErr: () => {
    dispatch(showFetchError());
  },
  onCloseCreateErr: () => {
    dispatch(showCreateError());
  },
  onCloseSuccess: () => {
    dispatch(toggleSuccessMessage());
  },
  onCloseGoalErr: (listId, goalId) => {
    dispatch(clearGoalError(listId, goalId));
  },
  onCloseGoalSuccess: (listId, goalId) => {
    dispatch(clearGoalSuccessMsg(listId, goalId));
  },
  onMarkGoal: (token, listId, goalId) => {
    dispatch(onMarkGoal(token, listId, goalId));
  },
  onDeleteGoal: (token, listId, goalId) => {
    dispatch(onDeleteGoal(token, listId, goalId));
  },
  onDeleteBucket: (token, listId) => {
    dispatch(onDeleteBucket(token, listId));
  },
  onCloseBucketErr: listId => {
    dispatch(clearBucketError(listId));
  },
  onCloseBucketSuccess: listId => {
    dispatch(clearBucketSuccess(listId));
  }
});
const mapStateToProps = state => ({
  firstName: fetchFirstName(state),
  closeForm: state.bucket.toggleForm,
  fetching: state.bucket.fetching,
  lists: state.bucket.bucketLists,
  token: state.auth.token,
  fetchError: state.bucket.fetchError,
  createError: state.bucket.createError,
  showFetchError: state.bucket.showFetchError,
  showCreateError: state.bucket.showCreateError,
  showSuccess: state.bucket.showSuccess,
  successMessage: state.bucket.successMessage,
  goalErrors: state.bucket.goalProcessErrors,
  processingGoals: state.bucket.markingGoals,
  processingBucket: state.bucket.processingBucket,
  goalProcessSuccess: state.bucket.goalProcessSuccess,
  bucketProcessSuccess: state.bucket.bucketProcessSuccess,
  bucketProcessErrors: state.bucket.bucketProcessErrors
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
