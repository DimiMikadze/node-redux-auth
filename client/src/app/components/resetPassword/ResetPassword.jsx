import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/resetPassword';
import { connect } from 'react-redux';

const renderInput = field =>
  <div className="input-group">
    <input type={field.type} placeholder={field.placeholder} {...field.input} />
  </div>

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    this.props.resetPassword(props);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          {/* Email */}
          <div className="input-group">
            <Field name="email" type="text" placeholder="type your email" component={renderInput}  />
          </div>

          {/* Server error message */}
          <div>
            { this.props.errorMessage && this.props.errorMessage.resetPassword &&
                <div className="error-container">{ this.props.errorMessage.resetPassword }</div> }
          </div>

          {/* Submit button */}
          <button type="submit" className="btn">Submit</button>
        </form>
       </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.resetPass.error };
}

ResetPassword = reduxForm({ form: 'resetpassword' })(ResetPassword);

export default connect(mapStateToProps, actions)(ResetPassword);
