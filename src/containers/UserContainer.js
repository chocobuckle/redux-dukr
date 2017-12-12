import React, { Component } from 'react';
import { string, bool, number, array, shape, func } from 'prop-types';
import { User } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { staleDucks, staleUser } from 'helpers/utils';
import * as usersActionCreators from 'ducks/users';
import * as usersDucksActionCreators from 'ducks/usersDucks';

class UserContainer extends Component {
  static propTypes = {
    name: string.isRequired,
    noUser: bool.isRequired,
    isFetching: bool.isRequired,
    error: string.isRequired,
    lastUpdated: number.isRequired,
    duckIds: array.isRequired,
    routeParams: shape({uid: string.isRequired}),
    fetchAndHandleUsersDucks: func.isRequired,
    fetchAndHandleUser: func.isRequired
  };

  componentDidMount() {
    const uid = this.props.routeParams.uid;
    if (this.props.noUser === true || staleUser(this.props.lastUpdated)) {
      this.props.fetchAndHandleUser(uid);
    }

    if (this.props.noUser === true || staleDucks(this.props.lastUpdated)) {
      this.props.fetchAndHandleUsersDucks(uid);
    }
  }

  render() {
    return (
      <User
        noUser={this.props.noUser}
        isFetching={this.props.isFetching}
        name={this.props.name}
        error={this.props.error}
        duckIds={this.props.duckIds}
      />
    );
  }
}

function mapStateToProps({users, usersDucks}, props) {
  const specificUsersDucks = usersDucks[props.routeParams.uid];
  const user = users[props.routeParams.uid];
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
