import React, { Component } from 'react';
import { bool, string, shape, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DuckDetails } from 'components';
import * as duckActionCreators from 'ducks/ducks';
import * as likeCountActionCreators from 'ducks/likeCount';
import * as repliesActionCreators from 'ducks/replies';

class DuckDetailsContainer extends Component {
  static propTypes = {
    authedUser: shape({
      avatar: string.isRequired,
      name: string.isRequired,
      uid: string.isRequired
    }).isRequired,
    addAndHandleReply: func.isRequired,
    duckAlreadyFetched: bool.isRequired,
    duckId: string.isRequired,
    error: string.isRequired,
    fetchAndHandleDuck: func.isRequired,
    initLikeFetch: func.isRequired,
    isFetching: bool.isRequired,
    removeFetching: func.isRequired
  };

  componentDidMount() {
    const {
      duckAlreadyFetched,
      duckId,
      fetchAndHandleDuck,
      initLikeFetch,
      removeFetching
    } = this.props;
    initLikeFetch(duckId);
    if (duckAlreadyFetched === false) {
      fetchAndHandleDuck(duckId);
    } else {
      removeFetching();
    }
  }

  render() {
    const { addAndHandleReply, authedUser, duckId, error, isFetching } = this.props;
    return (
      <DuckDetails
        authedUser={authedUser}
        duckId={duckId}
        error={error}
        isFetching={isFetching}
        addAndHandleReply={addAndHandleReply}
      />
    );
  }
}

function mapStateToProps({ ducks, likeCount, users }, { match }) {
  const { params } = match;
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: params.duckId,
    duckAlreadyFetched: !!ducks[params.duckId]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DuckDetailsContainer);
