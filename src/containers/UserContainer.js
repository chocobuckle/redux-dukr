import React, { Component } from 'react';
import { string, bool, number, arrayOf, shape, func } from 'prop-types';
import { User } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { staleDucks, staleUser } from 'helpers/utils';
import * as usersActionCreators from 'ducks/users';
import * as usersDucksActionCreators from 'ducks/usersDucks';

class UserContainer extends Component {
  static propTypes = {
    duckIds: arrayOf(string).isRequired,
    match: shape({
      isExact: bool.isRequired,
      path: string.isRequired,
      url: string.isRequired,
      params: shape({
        uid: string
      }).isRequired
    }).isRequired,
    name: string.isRequired,
    noUser: bool.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired,
    lastUpdated: number.isRequired,
    fetchAndHandleUsersDucks: func.isRequired,
    fetchAndHandleUser: func.isRequired
  };

  componentDidMount() {
    const { noUser, lastUpdated, fetchAndHandleUser, fetchAndHandleUsersDucks, match } = this.props;
    const { uid } = match.params;
    if (noUser === true || staleUser(lastUpdated)) {
      fetchAndHandleUser(uid);
    }
    if (noUser === true || staleDucks(lastUpdated)) {
      fetchAndHandleUsersDucks(uid);
    }
  }

  render() {
    const { noUser, isFetching, name, error, duckIds } = this.props;
    return (
      <User
        noUser={noUser}
        isFetching={isFetching}
        name={name}
        error={error}
        duckIds={duckIds}
      />
    );
  }
}

function mapStateToProps({ users, usersDucks }, { match }) {
  const { params } = match;
  const specificUsersDucks = usersDucks[params.uid];
  const user = users[params.uid];
  const noUser = typeof user === 'undefined';
  const name = noUser ? '' : user.info.name;
  return {
    noUser,
    name,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    lastUpdated: specificUsersDucks ? specificUsersDucks.lastUpdated : 0,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : []
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
    ...usersDucksActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
