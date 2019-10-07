import React, { Component } from 'react';
import classes from './SignUp.module.css';
import Input from '../../ui/input/Input';
import Validator from '../../../validation/validate';
import Submit from '../../ui/button/submit/Submit';

class SignUp extends Component {
  state = {
    signupForm: {
      firstName: this.generateInputSchema(
        {
          placeholder: 'First Name',
          name: 'firstName',
          type: 'text',
          value: ''
        },
        {
          rules: {
            required: true,
            maxLength: 15,
            minLength: 2,
            isAlphabetOnly: true
          },
          errorMessage: 'It must be an alphabet of atleast 2 characters long'
        }
      ),
      lastName: this.generateInputSchema(
        {
          placeholder: 'Last Name',
          name: 'lastName',
          type: 'text',
          value: ''
        },
        {
          rules: {
            required: true,
            maxLength: 15,
            minLength: 2,
            isAlphabetOnly: true
          },
          errorMessage: 'It must be an alphabet of atleast 2 characters long'
        }
      ),
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
          errorMessage: 'It must be a valid email'
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
            required: true,
            minLength: 6
          },
          errorMessage: 'Your password should be atleast 6 characters'
        }
      ),
      confirmPassword: this.generateInputSchema(
        {
          placeholder: 'Confirm Password',
          name: 'confirmPassword',
          type: 'password',
          value: ''
        },
        {
          rules: {
            required: true,
            isMatch: 'password'
          },
          errorMessage: 'It should match the password value'
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
    const signUpSchema = { ...this.state.signupForm };
    const currFieldObj = { ...signUpSchema[field], startChange: true };
    const currFieldConfig = {
      ...currFieldObj.inputConfig,
      value: target.value
    };
    const updatedSignUpSchema = {
      ...signUpSchema,
      [field]: {
        ...currFieldObj,
        inputConfig: currFieldConfig,
        valid: Validator.validateField(signUpSchema, field, target.value)
      }
    };
    this.setState({
      signupForm: updatedSignUpSchema
    });
  };
  mapSchemaToInput() {
    const signUpSchema = { ...this.state.signupForm };
    const formFields = Object.keys(signUpSchema);
    return formFields.map(fieldName => {
      const { inputConfig, valid, startChange, validation } = signUpSchema[
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
  submitFormHandler = e => {
    e.preventDefault();
    const currFormState = this.state.signupForm;
    let isNotValid = false;
    for (let field in currFormState) {
      if (!currFormState[field].valid) {
        const currField = { ...currFormState[field], startChange: true };
        const updatedFormState = { ...currFormState, [field]: currField };
        isNotValid = true;
        this.setState({
          signupForm: updatedFormState
        });
        break;
      }
    }
    if (isNotValid) return null;
  };
  render() {
    return (
      <div className={classes['signup-section']}>
        <div className={classes['form-wrapper']}>
          <h5 className={classes['form-header']}>Sign Up With Us</h5>
          <form
            className={classes['sign-up-form']}
            onSubmit={this.submitFormHandler}
          >
            {this.mapSchemaToInput()}
            <Submit name='sign me up' />
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
