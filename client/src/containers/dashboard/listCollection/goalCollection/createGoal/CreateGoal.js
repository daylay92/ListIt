import React, { Component } from 'react';
import classes from './CreateGoal.module.css';
import Validator from '../../../../../validation/validate';
import FormItem from '../../../formItem/FormItem';
import { closeModal } from '../../../../../store/actions';
import { connect } from 'react-redux';
import DashBtn from '../../../../../components/ui/button/dashBtn/DashBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CreateGoal extends Component {
  state = {
    textConfig: {
      value: '',
      disabled: false
    },
    calendar: {
      show: false,
      from: new Date(),
      to: null
    },
    validation: {
      text: {
        state: true,
        message: 'It should be a word of 3 letters at a minimum'
      },
      from: {
        state: true,
        message: 'It should be a valid date not earlier than today'
      },
      to: {
        state: true,
        message: 'It should be later than when this pursuit begins'
      }
    },
    changed: false,
    rules: {
      itemText: [Validator.required, Validator.minLength],
      from: [Validator.isDate, Validator.dateFromNow],
      to: [Validator.isDate, Validator.compareFromTo]
    },
    formCompleted: false
  };
  isFromStillValid(value, match) {
    if (value) return Validator.compareFromTo({ value, match });
    return false;
  }
  onCalendarChangeHandler = (date, type = 'from') => {
    let calendar, validation, formCompleted;
    if (type === 'from') {
      calendar = {
        ...this.state.calendar,
        from: date
      };
      const isNotValid = this.state.rules.from.some(fn => !fn({ value: date }));
      validation = {
        ...this.state.validation,
        from: { ...this.state.validation.from, state: !isNotValid },
        to: {
          ...this.state.validation.to,
          state: this.isFromStillValid(this.state.calendar.to, date)
        }
      };
    } else {
      calendar = {
        ...this.state.calendar,
        to: date
      };
      const isNotValid = this.state.rules.to.some(
        fn => !fn({ value: date, match: this.state.calendar.from })
      );
      validation = {
        ...this.state.validation,
        to: { ...this.state.validation.to, state: !isNotValid }
      };
    }

    formCompleted =
      this.state.changed &&
      validation.text.state &&
      validation.to.state &&
      validation.from.state;
    this.setState({ calendar, validation, formCompleted });
  };

  clickToggleCalendar = () => {
    this.setState(state => {
      let calendar, validation;
      let formCompleted = state.formCompleted;
      if (state.calendar.show) {
        calendar = {
          show: false,
          from: new Date(),
          to: null
        };
        validation = {
          ...state.validation,
          from: {
            ...state.validation.from,
            state: true
          },
          to: {
            ...state.validation.to,
            state: true
          }
        };
      } else {
        calendar = {
          ...state.calendar,
          show: true
        };
        validation = {
          ...state.validation,
          to: {
            ...state.validation.to,
            state: false
          }
        };
        formCompleted = false;
      }
      return { calendar, validation, formCompleted };
    });
  };
  onCloseItemHandler = () => {
    const config = {
      textConfig: {
        value: '',
        disabled: false
      },
      calendar: {
        show: false,
        from: new Date(),
        to: null
      },
      validation: {
        text: {
          state: true,
          message: 'It should be a word of 3 letters at a minimum'
        },
        from: {
          state: true,
          message: 'It should be a valid date not earlier than today'
        },
        to: {
          state: true,
          message: 'It should be later than when this pursuit begins'
        }
      },
      changed: false,
      formCompleted: false
    };
    this.setState({ ...config });
    this.props.onCloseModal();
  };
  onChangeListItemHandler = ({ target }) => {
    const properties = {
      value: target.value,
      minLength: 3
    };
    let formCompleted, validation;
    const isNotValid = this.state.rules.itemText.some(fn => !fn(properties));
    if (isNotValid) {
      formCompleted = false;
      validation = {
        ...this.state.validation,
        text: {
          ...this.state.validation.text,
          state: false
        }
      };
    } else {
      validation = {
        ...this.state.validation,
        text: {
          ...this.state.validation.text,
          state: true
        }
      };
      formCompleted = validation.from.state && validation.to.state;
    }

    const config = {
      textConfig: {
        ...this.state.textConfig,
        value: target.value
      },
      validation,
      changed: true
    };
    this.setState({ ...config, formCompleted });
  };
  render() {
    return this.props.show ? (
      <div className={classes.goalModal}>
        <div className={classes.mainContent}>
          <div className={classes.contentHeader}>Let's Add One More Goal</div>
          <FormItem
            isModal={true}
            textConfig={this.state.textConfig}
            textValidState={this.state.validation.text.state}
            textErrMsg={this.state.validation.text.message}
            changed={this.onChangeListItemHandler}
            clicked={this.clickToggleCalendar}
            showCalendar={this.state.calendar.show}
            fromVal={this.state.calendar.from}
            fromValidState={this.state.validation.from.state}
            fromErrMsg={this.state.validation.from.message}
            toVal={this.state.calendar.to}
            toValidState={this.state.validation.to.state}
            toErrMsg={this.state.validation.to.message}
            fromChanged={this.onCalendarChangeHandler}
            toChanged={date => this.onCalendarChangeHandler(date, 'to')}
          />
          <span className={classes.closeButton}>
            <FontAwesomeIcon icon='times-circle' size='2x' onClick={this.onCloseItemHandler} />
          </span>
          <div className={classes.btnWrapper}>
            <DashBtn config={{ disabled: !this.state.formCompleted }} name='Add' />
          </div>
        </div>
      </div>
    ) : null;
  }
}
const mapDispatchProps = dispatch => ({
  onCloseModal: () => {
    dispatch(closeModal());
  }
});
const mapStateToProps = state => ({
  show: state.bucket.toggleModal
});
export default connect(
  mapStateToProps,
  mapDispatchProps
)(CreateGoal);
