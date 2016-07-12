import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/resetPassword';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.resetPassword(props);
  }

  render() {
    const { handleSubmit, fields: { email } } = this.props;

    return (
      <div className="form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="input-group">
            <input type="text" placeholder="type your email" {...email} />
          </div>
          <div>
            { this.props.errorMessage && this.props.errorMessage.resetPassword &&
              <div className="error-container">{ this.props.errorMessage.resetPassword }</div>
            }
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
       </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.resetPass.error };
}

export default reduxForm({
  form: 'resetpassword',
  fields: ['email']
}, mapStateToProps, actions)(ResetPassword);