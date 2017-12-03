import React, { Component } from 'react';
import { bool, string, object, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DuckDetails } from 'components';
import * as duckActionCreators from 'ducks/ducks';
import * as likeCountActionCreators from 'ducks/likeCount';
import * as repliesActionCreators from 'ducks/replies';

class DuckDetailsContainer extends Component {
  static propTypes = {
    addAndHandleReply: func.isRequired,
    authedUser: object.isRequired,
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

function mapStateToProps(state, props) {
  const { ducks, likeCount, users } = state;
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.routeParams.duckId,
    duckAlreadyFetched: !!ducks[props.routeParams.duckId]
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
