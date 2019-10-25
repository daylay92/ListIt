import React, { Component } from 'react';
import WithClass from '../../hocs/WithClass';
import classes from './Dashboard.module.css';
import IntroText from './introText/IntoText';
import AddBucket from '../../components/ui/button/addBucket/AddBucket';
import AddCircle from '../../components/ui/button/addCircle/AddCircle';
import ListForm from './listForm/ListForm';
import { closeForm } from '../../store/actions';
import { connect } from 'react-redux';

class Dashboard extends Component {
  onClickAddHandler = e => {
    this.props.onCloseForm();
  };

  render() {
    return (
      <WithClass class={classes.dashboardWrapper}>
        <div className={classes.mainContainer}>
          <div className={classes.bucketHeader}>BUCKETLIST</div>
          <ListForm open={this.props.closeForm} />
          <IntroText firstName={this.props.firstName} />
          <AddBucket click={this.onClickAddHandler} stop={!this.props.closeForm} />
          <AddCircle showAdd={this.props.closeForm} click={this.onClickAddHandler} />
        </div>
      </WithClass>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  onCloseForm: () => {
    dispatch(closeForm());
  }
});
const mapStateToProps = state => ({
  firstName: state.auth.firstName,
  closeForm: state.bucket.closeForm
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
