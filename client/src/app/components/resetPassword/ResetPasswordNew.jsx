import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/resetPassword';
import { Link } from 'react-router';

class ResetPasswordNew extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    const { email, token } = this.props.location.query;

    this.props.verifyResetPassword({ email, token });
  }

  handleFormSubmit(props) {
    const { email, token } = this.props.location.query;

    props.email = email;
    props.token = token;

    this.props.resetPasswordNew(props);
  }

  render() {
    const { handleSubmit, fields: { newpassword, renewpassword } } = this.props;

    return (
      <div className="form-container">
        <h1>Reset Password</h1>
        {
          this.props.errorMessage && this.props.errorMessage.verifyResetPassword ?
            <div className="content">
              <h3>{ this.props.errorMessage.verifyResetPassword.message }</h3>
              {
                this.props.errorMessage.verifyResetPassword.resend &&
                  <Link className="resend" to="/reset-password">Reset Password Again</Link>
              }
            </div>
            :
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <div className="input-group">
                <input type="password" placeholder="new password" {...newpassword} />
                { password.touched && <div className="form-error">{ password.error } </div> }
              </div>
              <div className="input-grup">
                <input type="password" placeholder="repeat new password" {...renewpassword} />
                <div>
                  { renewpassword.touched && <div className="form-error">{ renewpassword.error } </div> }
                </div>
              </div>
              {
                this.props.errorMessage && this.props.errorMessage.verifyResetPassword &&
                  <div className="error-container">{ this.props.errorMessage.verifyResetPassword.message }</div>
              }
              <button type="submit" className="btn">Submit</button>
            </form>
         }
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

  if(props.password && props.password.length < 6) {
    errors.password = "minimum 6 characters";
  }

  if(props.newpassword !== props.renewpassword) {
    errors.renewpassword = "passwords doesn't match";
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.resetPass.error };
}

export default reduxForm({
  form: 'resetnewpassword',
  fields: ['newpassword', 'renewpassword'],
  validate
}, mapStateToProps, actions)(ResetPasswordNew);