import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { logoutAndUnauth } from 'ducks/users';
import { Logout } from 'components';

class LogoutContainer extends Component {
  static propTypes = {
    dispatch: func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(logoutAndUnauth());
  }

  render() {
    return <Logout />;
  }
}

export default connect()(LogoutContainer);
