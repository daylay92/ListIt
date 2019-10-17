import React, { Component } from 'react';
import classes from './Login.module.css';
import Submit from '../../../components/ui/button/submit/Submit';
import Input from '../../../components/ui/input/Input';
import { Link } from 'react-router-dom';
import Validator from '../../../validation/validate';
import { connect } from 'react-redux';
import Errory from '../../../components/popup/error/Error';
import { hideError, onAuth } from '../../../store/actions';
import Aux from '../../../hocs/Auxi';

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
  closeErrHandler = () => {
    this.props.closeError();
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
    const { email, password } = this.state.loginForm;

    const data = {
      email: email.inputConfig.value,
      password: password.inputConfig.value
    };
    this.props.onLogin(data, 'login');
  };
  mapSchemaToInput() {
    const loginSchema = { ...this.state.loginForm };
    const formFields = Object.keys(loginSchema);
    return formFields.map(fieldName => {
      const { inputConfig, valid, startChange, validation } = loginSchema[fieldName];
      return (
        <Input
          inputConfig={inputConfig}
          changed={e => this.onChangeHandler(e, fieldName)}
          valid={valid}
          startChange={startChange}
          key={fieldName}
          errorMessage={validation.errorMessage}
          disabled={this.props.loading}
        />
      );
    });
  }
  componentDidMount() {
    if (this.props.isAuth) this.props.history.replace('/dashboard');
  }
  componentDidUpdate() {
    if (this.props.isAuth) this.props.history.replace('/dashboard');
  }
  render() {
    return (
      <Aux>
        <div className={classes['login-section']}>
          <Errory show={this.props.showErr} close={this.closeErrHandler}>
            {this.props.errMessage}
          </Errory>
          <div className={classes['form-wrapper']}>
            <h5 className={classes['form-header']}>Let's get you started</h5>
            <form className={classes['login-form']} onSubmit={this.submitFormHandler}>
              {this.mapSchemaToInput()}
              <Submit name='log me in' show={this.props.loading} />
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
      </Aux>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.auth.loading,
  errMessage: state.auth.error,
  showErr: state.auth.showError,
  isAuth: state.auth.token !== null
});
const mapDispatchToProps = dispatch => ({
  onLogin: (data, task) => {
    dispatch(onAuth(data, task));
  },
  closeError: () => {
    dispatch(hideError());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
