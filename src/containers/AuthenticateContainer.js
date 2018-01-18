import React, { Component } from 'react';
import { bool, func, string } from 'prop-types';
import { Authenticate } from 'components';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as usersActionCreators from 'ducks/users';

class AuthenticateContainer extends Component {
  static propTypes = {
    fetchAndHandleAuthedUser: func.isRequired,
    isFetching: bool.isRequired,
    isAuthed: bool.isRequired,
    error: string.isRequired
  };

  handleAuth = (e) => {
    e.preventDefault();
    this.props.fetchAndHandleAuthedUser();
  };

  render() {
    const { isFetching, isAuthed, error } = this.props;
    if (isAuthed) {
      return <Redirect to='feed' />;
    }
    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={isFetching}
        error={error}
      />
    );
  }
}

function mapStateToProps({ users }) {
  const { isFetching, isAuthed, error } = users;
  return {
    isFetching,
    isAuthed,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...usersActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
