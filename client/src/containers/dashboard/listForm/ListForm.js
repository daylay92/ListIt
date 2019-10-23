import React, { Component } from 'react';
import { connect } from 'react-redux';
import Validator from '../../../validation/validate';
import classes from './ListForm.module.css';
import Input from '../../../components/ui/input/Input';
import DashBtn from '../../../components/ui/button/dashBtn/DashBtn';
import FormItem from '../formItem/FormItem';
import { closeForm } from '../../../store/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ListForm extends Component {
  state = {
    listForm: {
      name: {
        config: {
          value: '',
          placeholder: 'what would you like to name this buckelist?',
          type: 'text'
        },
        validation: {
          errMsg: 'It should be an word of 3 letters at a minimum',
          valid: true
        },
        startChange: false
      },
      goals: {
        collection: [],
        total: 0
      }
    },
    formCompleted: false,
    rules: {
      itemText: [Validator.required, Validator.minLength],
      from: [Validator.isDate, Validator.dateFromNow],
      to: [Validator.isDate, Validator.compareFromTo]
    }
  };
  validateName(state) {
    let isValid = false;
    const { validation, startChange } = state.listForm.name;
    if (!startChange) return isValid;
    if (validation.valid) isValid = true;
    return isValid;
  }
  validateOthers(state, index) {
    const { collection } = state.listForm.goals;
    let isNotValid = false;
    isNotValid = collection.some((goal, goalIndex) => {
      const { validation: validate, changed } = goal;
      if (!changed) return true;
      if (index === goalIndex) return !validate.to.state || !validate.from.state;
      return !validate.text.state || !validate.to.state || !validate.from.state;
    });
    return !isNotValid;
  }
  validateCollection(state) {
    const { collection } = state.listForm.goals;
    if (!collection.length) return false;
    let isNotValid = false;
    isNotValid = collection.some(item => {
      const { validation: validate, changed } = item;
      if (!changed) return true;
      return !validate.text.state || !validate.to.state || !validate.from.state;
    });
    return !isNotValid;
  }
  addListClickHandler = e => {
    e.preventDefault();
    this.createListItemCollection();
  };
  onCloseFormHandler = () => {
    const formState = { ...this.state.listForm };
    const listForm = {
      name: {
        config: {
          ...formState.name.config,
          value: ''
        },
        validation: {
          ...formState.name.validation,
          valid: true
        },
        startChange: false
      },
      goals: {
        collection: [],
        total: 0
      }
    };
    this.setState({ listForm, formCompleted: false });
    this.props.onCloseForm();
  };
  onNameChangeHandler = ({ target }) => {
    const newName = { ...this.state.listForm.name };
    const properties = {
      value: target.value,
      minLength: 3
    };
    let formCompleted, validation;
    const isNotValid = this.state.rules.itemText.some(fn => !fn(properties));
    if (isNotValid) {
      formCompleted = false;
      validation = {
        ...newName.validation,
        valid: false
      };
    } else {
      validation = {
        ...newName.validation,
        valid: true
      };
      formCompleted = this.validateCollection(this.state);
    }
    const name = {
      ...newName,
      startChange: true,
      config: { ...newName.config, value: target.value },
      validation
    };
    const newListForm = { ...this.state.listForm, name };
    this.setState({
      listForm: newListForm,
      formCompleted
    });
  };
  onChangeListItemHandler = ({ target }, index) => {
    const collection = [...this.state.listForm.goals.collection];
    const item = { ...collection[index] };
    const properties = {
      value: target.value,
      minLength: 3
    };
    let formCompleted, validation;
    const isNotValid = this.state.rules.itemText.some(fn => !fn(properties));
    if (isNotValid) {
      formCompleted = false;
      validation = {
        ...item.validation,
        text: {
          ...item.validation.text,
          state: false
        }
      };
    } else {
      validation = {
        ...item.validation,
        text: {
          ...item.validation.text,
          state: true
        }
      };
      formCompleted =
        this.validateName(this.state) && this.validateOthers(this.state, index);
    }

    const config = {
      ...item,
      textConfig: {
        ...item.textConfig,
        value: target.value
      },
      validation,
      changed: true
    };
    collection.splice(index, 1, config);
    const goals = { ...this.state.listForm.goals, collection };
    this.setState({ listForm: { ...this.state.listForm, goals }, formCompleted });
  };
  isFromStillValid(value, match) {
    if (value) return Validator.compareFromTo({ value, match });
    return false;
  }
  calendarValidateOthers(validation, index, state) {
    const validate =
      validation.text.state && validation.from.state && validation.to.state;
    if (!validate) return false;
    const { collection } = state.listForm.goals;
    let isNotValid = false;
    isNotValid = collection.some((goal, goalIndex) => {
      const { validation: validate, changed } = goal;
      if (!changed) return true;
      if (index === goalIndex) return false;
      return !validate.text.state || !validate.to.state || !validate.from.state;
    });
    return !isNotValid;
  }
  onCalendarChangeHandler = (date, index, type = 'from') => {
    const collection = [...this.state.listForm.goals.collection];
    const item = { ...collection[index] };
    let calendar, validation, formCompleted;
    if (type === 'from') {
      calendar = {
        ...item.calendar,
        from: date
      };
      const isNotValid = this.state.rules.from.some(fn => !fn({ value: date }));
      validation = {
        ...item.validation,
        from: { ...item.validation.from, state: !isNotValid },
        to: {
          ...item.validation.to,
          state: this.isFromStillValid(item.calendar.to, date)
        }
      };
    } else {
      calendar = {
        ...item.calendar,
        to: date
      };
      const isNotValid = this.state.rules.to.some(
        fn => !fn({ value: date, match: item.calendar.from })
      );
      validation = {
        ...item.validation,
        to: { ...item.validation.to, state: !isNotValid }
      };
    }
    const config = {
      ...item,
      calendar,
      validation
    };
    formCompleted =
      this.validateName(this.state) &&
      this.calendarValidateOthers(validation, index, this.state);
    collection.splice(index, 1, config);
    const goals = { ...this.state.listForm.goals, collection };
    this.setState({ listForm: { ...this.state.listForm, goals }, formCompleted });
  };
  onCloseItemHandler = index => {
    const collection = [...this.state.listForm.goals.collection];
    collection.splice(index, 1);
    const dummyState = { listForm: { goals: { collection } } };
    const formCompleted =
      this.validateName(this.state) && this.validateCollection(dummyState);
    const goals = { ...this.state.listForm.goals, collection };
    this.setState({ listForm: { ...this.state.listForm, goals }, formCompleted });
  };

  createFormListItems() {
    const collection = [...this.state.listForm.goals.collection];
    if (!collection.length) return null;
    return collection.map((config, index) => (
      <FormItem
        key={index}
        textConfig={config.textConfig}
        textValidState={config.validation.text.state}
        textErrMsg={config.validation.text.message}
        changed={e => this.onChangeListItemHandler(e, index)}
        clicked={() => this.clickToggleCalendar(index)}
        showCalendar={config.calendar.show}
        fromVal={config.calendar.from}
        fromValidState={config.validation.from.state}
        fromErrMsg={config.validation.from.message}
        toVal={config.calendar.to}
        toValidState={config.validation.to.state}
        toErrMsg={config.validation.to.message}
        closeItem={() => this.onCloseItemHandler(index)}
        fromChanged={date => this.onCalendarChangeHandler(date, index)}
        toChanged={date => this.onCalendarChangeHandler(date, index, 'to')}
      />
    ));
  }
  clickToggleCalendar = index => {
    this.setState(state => {
      const collection = [...state.listForm.goals.collection];
      const item = { ...collection[index] };
      let calendar, validation;
      let formCompleted = state.formCompleted;
      if (item.calendar.show) {
        calendar = {
          show: false,
          from: new Date(),
          to: null
        };
        validation = {
          ...item.validation,
          from: {
            ...item.validation.from,
            state: true
          },
          to: {
            ...item.validation.to,
            state: true
          }
        };
      } else {
        calendar = {
          ...item.calendar,
          show: !item.calendar.show
        };
        validation = {
          ...item.validation,
          to: {
            ...item.validation.to,
            state: false
          }
        };
        formCompleted = false;
      }
      const config = {
        ...item,
        textConfig: {
          ...item.textConfig
        },
        calendar,
        validation
      };
      collection.splice(index, 1, config);
      const goals = { ...state.listForm.goals, collection };
      return { listForm: { ...state.listForm, goals }, formCompleted };
    });
  };
  createListItemCollection() {
    const goals = { ...this.state.listForm.goals };
    const collection = [...this.state.listForm.goals.collection];
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
      changed: false
    };
    collection.push(config);
    const listForm = {
      ...this.state.listForm,
      goals: { ...goals, collection, total: collection.length }
    };
    this.setState({ listForm, formCompleted: false });
  }

  render() {
    return this.props.open ? (
      <div className={classes.formContainer}>
        <span className={classes.closeForm} onClick={this.onCloseFormHandler}>
          <FontAwesomeIcon icon='times' />
        </span>
        <form>
          <Input
            extraClass={
              this.state.listForm.name.startChange &&
              this.state.listForm.name.validation.valid
                ? [classes.listName, classes.validName].join(' ')
                : classes.listName
            }
            inputConfig={this.state.listForm.name.config}
            changed={this.onNameChangeHandler}
            errorMessage={this.state.listForm.name.validation.errMsg}
            startChange={this.state.listForm.name.startChange}
            valid={this.state.listForm.name.validation.valid}
          />
          {this.createFormListItems()}
          <div className={classes.btnWrapper}>
            <DashBtn
              config={{ type: 'submit', disabled: !this.state.formCompleted }}
              name='Save List'
            />
            <DashBtn
              name='Add Item'
              extra={classes.addItem}
              click={this.addListClickHandler}
            />
          </div>
        </form>
      </div>
    ) : null;
  }
}

const mapDispatchToProps = dispatch => ({
  onCloseForm: () => {
    dispatch(closeForm());
  }
});
export default connect(
  null,
  mapDispatchToProps
)(ListForm);
