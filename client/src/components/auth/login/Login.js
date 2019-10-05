import React, { Component } from 'react';
import classes from './Login.module.css';
import Submit from '../../ui/button/submit/Submit';
import Input from '../../ui/input/Input';
import { Link } from 'react-router-dom';
import Validator from '../../../validation/validate';

class LogIn extends Component {
  state = {
    loginForm: {
      email: this.generateInputSchema(
        {
          placeholder: 'Email',
          name: 'email',
          type: 'email',
          value: ''
        },
        {
          rules: {
            required: true,
            isEmail: true
          },
          errorMessage: 'You need to provide a valid email'
        }
      ),
      password: this.generateInputSchema(
        {
          placeholder: 'Password',
          name: 'password',
          type: 'password',
          value: ''
        },
        {
          rules: {
            required: true
          },
          errorMessage: 'Your password is required'
        }
      )
    }
  };
  generateInputSchema(inputConfig, validation) {
    return {
      inputConfig,
      startChange: false,
      valid: false,
      validation
    };
  }
  onChangeHandler = ({ target }, field) => {
    const loginSchema = { ...this.state.loginForm };
    const currFieldObj = { ...loginSchema[field], startChange: true };
    const currFieldConfig = {
      ...currFieldObj.inputConfig,
      value: target.value
    };
    const updatedLoginSchema = {
      ...loginSchema,
      [field]: {
        ...currFieldObj,
        inputConfig: currFieldConfig,
        valid: Validator.validateField(loginSchema, field, target.value)
      }
    };
    this.setState({
      loginForm: updatedLoginSchema
    });
  };
  submitFormHandler = e => {
    e.preventDefault();
    const currFormState = this.state.loginForm;
    let isNotValid = false;
    for (let field in currFormState) {
      if (!currFormState[field].valid) {
        const currField = { ...currFormState[field], startChange: true };
        const updatedFormState = { ...currFormState, [field]: currField };
        isNotValid = true;
        this.setState({
          loginForm: updatedFormState
        });
        break;
      }
    }
    if (isNotValid) return null;
  };
  mapSchemaToInput() {
    const loginSchema = { ...this.state.loginForm };
    const formFields = Object.keys(loginSchema);
    return formFields.map(fieldName => {
      const { inputConfig, valid, startChange, validation } = loginSchema[
        fieldName
      ];
      return (
        <Input
          inputConfig={inputConfig}
          changed={e => this.onChangeHandler(e, fieldName)}
          valid={valid}
          startChange={startChange}
          key={fieldName}
          errorMessage={validation.errorMessage}
        />
      );
    });
  }
  render() {
    return (
      <div className={classes['login-section']}>
        <div className={classes['form-wrapper']}>
          <h5 className={classes['form-header']}>Let's get you started</h5>
          <form
            className={classes['login-form']}
            onSubmit={this.submitFormHandler}
          >
            {this.mapSchemaToInput()}
            <Submit name='log me in' />
          </form>
          <div className={classes['login-sub-section']}>
            <span>
              <Link to='/signup'>I am new here</Link>
            </span>
            <span>
              <Link to='/'>I forgot my password</Link>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
