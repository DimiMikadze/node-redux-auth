import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
      <header>
        <Link to={this.props.authenticated ? '/reduxauth/users' : '/reduxauth'} className="logo">Redux Auth</Link>
          <nav>
            {
              this.props.authenticated ?
                <ul>
                  <li>
                    <Link to="/reduxauth/users">Users</Link>
                  </li>
                  <li>
                    <Link to="/reduxauth/signout">Signout</Link>
                  </li>
                </ul>
                :
                <ul>
                  <li>
                    <Link to="/reduxauth/signin">Sign in</Link>
                  </li>
                  <li>
                    <Link to="/reduxauth/signup">Sign up</Link>
                  </li>
                </ul>
            }
          </nav>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);