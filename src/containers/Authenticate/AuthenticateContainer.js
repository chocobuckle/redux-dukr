import React, { PropTypes } from 'react';
import { Authenticate } from 'components';
import auth from 'helpers/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActionCreators from 'redux/modules/users';

const AuthenticateContainer = React.createClass({
  propTypes: {
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleAuth(e) {
    e.preventDefault();
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.context.router.replace('feed'));
  },
  render() {
    return (
      <Authenticate
        onAuth={this.handleAuth}
        isFetching={this.props.isFetching}
        error={this.props.error}
      />
    );
  }
});

function mapStateToProps(state) {
  return {
    isFetching: state.users.isFetching,
    error: state.users.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);