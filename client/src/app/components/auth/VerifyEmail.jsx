import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = { resend: false };
  }

  componentWillMount() {
    const { email, token } =  this.props.location.query;

    this.user = {};
    this.user.email = email;
    this.user.token = token;

    this.props.verifyEmail({ email, token });
  }

  resendEmail(props) {
    this.setState({ resend: true });
    this.props.resendVerification(props);
  }

  render() {
    return (
      <div className="content">
        {
          this.props.errorMessage && this.props.errorMessage.verifyEmail &&
            <div>
              <h1>Failure</h1>

              <p>{ this.props.errorMessage.verifyEmail.message }</p>
            </div>
        }
        {
          this.props.errorMessage && this.props.errorMessage.verifyEmail && this.props.errorMessage.verifyEmail.resend && !this.state.resend &&
            <p className="resend" onClick={this.resendEmail.bind(this, this.user)}>
              Resend verification code
            </p>
          }
        {
          this.state.resend &&
            <p className="resended">
              Email verification code has been resended
            </p>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(VerifyEmail);