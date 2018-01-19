import React, { Component } from 'react';
import { bool, func, object, oneOfType, string, element } from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Navigation, Spinner } from 'components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as usersLikesActionCreators from 'ducks/usersLikes';
import * as userActionCreators from 'ducks/users';
import { formatUserInfo } from 'helpers/utils';
import { firebaseAuth } from 'config/constants';

class MainContainer extends Component {
  static propTypes = {
    location: oneOfType([
      object.isRequired,
      string.isRequired
    ]).isRequired,
    children: element.isRequired,
    authUser: func.isRequired,
    fetchingUserSuccess: func.isRequired,
    isAuthed: bool.isRequired,
    isFetching: bool.isRequired,
    removeFetchingUser: func.isRequired,
    setUsersLikes: func.isRequired
  };

  componentDidMount() {
    const {
      authUser,
      fetchingUserSuccess,
      setUsersLikes,
      location,
      removeFetchingUser
    } = this.props;
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid);
        authUser(user.uid);
        fetchingUserSuccess(user.uid, userInfo, Date.now());
        setUsersLikes();
        if (location.pathname === '/') {
          return <Redirect to='feed' />;
        }
      } else {
        removeFetchingUser();
      }
    });
  }

  render() {
    const { isFetching, isAuthed, children } = this.props;
    return (
      <OuterWrapper>
        <Navigation isAuthed={isAuthed} />
        {
          isFetching
            ? <Spinner />
            : <InnerWrapper>{children}</InnerWrapper>
        }
      </OuterWrapper>
    );
  }
}

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const InnerWrapper = styled.div`
  margin: 0px auto;
  max-width: 900px;
  width: 100%;
`;

function mapStateToProps({ users }) {
  const { isAuthed, isFetching } = users;
  return {
    isAuthed,
    isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...usersLikesActionCreators,
    ...userActionCreators
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer));
