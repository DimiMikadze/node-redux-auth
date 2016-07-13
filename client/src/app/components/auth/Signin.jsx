import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth';
import { Link } from 'react-router';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.signinUser(props);
  }

  render() {
    const { handleSubmit, fields: { email, password } } = this.props;

    return (
      <div className="form-container">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className={`input-group ${email.touched && email.error ? 'has-error' : ''}`}>
            <input type="text" placeholder="email" {...email} />
            { email.touched && <div className="form-error">{ email.error }</div> }
          </div>
          <div className="input-group">
            <input type="password" placeholder="password" {...password} />
            { password.touched && <div className="form-error">{ password.error }</div> }
          </div>
          <div className="password-forgot">
            <Link to="/reduxauth/reset-password">I forgot my password</Link>
          </div>
          {
            this.props.errorMessage && this.props.errorMessage.signin &&
              <div className="error-container signin-error">Oops! { this.props.errorMessage.signin }</div>
          }
          <button type="submit" className="btn">Sign in</button>
          <div className="form-bottom">
            <p>Don't have an account?</p>
            <Link to="/reduxauth/signup">Click here to sign up</Link>
          </div>
        </form>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {};

  if(!formProps.email) {
    errors.email = 'Email is required'
  }

  if(!formProps.password) {
    errors.password = 'Password is required'
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password'],
  validate
}, mapStateToProps, actions)(Signin);