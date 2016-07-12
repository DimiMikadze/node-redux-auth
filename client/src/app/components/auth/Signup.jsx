import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth';
import { Link } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  render() {
    const { handleSubmit, fields: { firstname, lastname, email, password, repassword } } = this.props;

    return (
      <div className="form-container">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className={`input-group ${firstname.touched && firstname.error ? 'has-error' : ''}`}>
            <input type="text" placeholder="First name" {...firstname} />
            { firstname.touched && <div className="form-error">{firstname.error}</div> }
          </div>
          <div className={`input-group ${lastname.touched && lastname.error ? 'has-error' : ''}`}>
            <input type="text" placeholder="Last name" {...lastname} />
            { lastname.touched && <div className="form-error">{lastname.error}</div> }
          </div>
          <div className={`input-group ${email.touched && email.error ? 'has-error' : ''}`}>
            <input type="text" placeholder="email" {...email} />
            { email.touched && <div className="form-error">{email.error}</div> }
          </div>
          <div className={`input-group ${password.touched && password.error ? 'has-error' : ''}`}>
            <input type="password" placeholder="password" {...password} />
            { password.touched && <div className="form-error">{password.error}</div> }
          </div>
          <div className={`input-group ${repassword.touched && repassword.error ? 'has-error' : ''}`}>
            <input type="password" placeholder="repeat password" {...repassword} />
            { repassword.touched && <div className="form-error">{repassword.error}</div> }
          </div>
          <div>
            {
              this.props.errorMessage && this.props.errorMessage.signup &&
                <div className="error-container">Oops! { this.props.errorMessage.signup }</div>
            }
          </div>
          <button type="submit" className="btn">Sign up</button>
          <div className="form-bottom">
            <p>Already signed up?</p>
            <Link to="/signin">Click here to sign in</Link>
          </div>
        </form>
      </div>
    )
  }
}

function validate(props) {
  const errors = {};

  Object.keys(props).map(prop => {
    if(!props[prop]) {
      errors[prop] = `please enter a ${prop}`;
    }
  });

  if(props.firstname && props.firstname.length < 3) {
    errors.firstname = "minimum of 4 characters";
  }

  if(props.firstname && props.firstname.length > 20) {
    errors.firstname = "maximum of 20 characters";
  }

  if(props.lastname && props.lastname.length < 3) {
    errors.lastname = "minimum of 4 characters";
  }

  if(props.lastname && props.lastname.length > 20) {
    errors.lastname = "maximum of 20 characters";
  }

  if(props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = "please provide valid email";
  }

  if(props.password && props.password.length < 6) {
    errors.password = "minimum 6 characters";
  }

  if(props.password !== props.repassword) {
    errors.repassword = "passwords doesn't match";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['firstname', 'lastname', 'email', 'password', 'repassword'],
  validate
}, mapStateToProps, actions)(Signup);
