import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { Authenticate } from 'components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActionCreators from 'ducks/users';

class AuthenticateContainer extends Component {
  static propTypes = {
    fetchAndHandleAuthedUser: func.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired
  };

  handleAuth = (e) => {
    e.preventDefault();
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.props.history.replace('feed'));
  };

  render() {
    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={this.props.isFetching}
        error={this.props.error}
      />
    );
  }
}

function mapStateToProps({ users }) {
  const { isFetching, error } = users;
  return {
    isFetching,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...userActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
