import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/auth';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <input type={type} placeholder={placeholder} {...input} />
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.signinUser(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="form-container">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          {/* Email */}
          <Field name="email" component={renderField} type="text" placeholder="Email" />

          {/* Password */}
          <Field name="password" component={renderField} type="password" placeholder="Password" />

          {/* Forgot password */}
          <div className="password-forgot">
            <Link to="/reduxauth/reset-password">I forgot my password</Link>
          </div>

          {/* Server error message */}
          { this.props.errorMessage && this.props.errorMessage.signin &&
              <div className="error-container signin-error">Oops! { this.props.errorMessage.signin }</div> }

          {/* Signin button */}
          <button type="submit" className="btn">Sign in</button>

          {/* Signup button */}
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

Signin = reduxForm({ form: 'signin', validate })(Signin);

export default connect(mapStateToProps, actions)(Signin);
