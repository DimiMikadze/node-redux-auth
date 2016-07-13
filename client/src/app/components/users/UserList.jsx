import React, { Component } from 'react';
import * as actions from '../../actions/users';
import { connect } from 'react-redux';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchUsers();

    this.user = JSON.parse(localStorage.getItem('user'));
  }

  renderUsers() {
    const users = this.props.users || [];

    return users.map((user, i) => {
      return <li key={i}>{ user.firstname }</li>
    })
  }

  render() {
    return (
      <div className="content users">
        <h1>Hello { this.user.firstname }</h1>
        <p>Here are auth protected user firstnames! :)</p>
        <ul>
          { this.renderUsers() }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { users: state.user.list };
}

export default connect(mapStateToProps, actions)(Feature);