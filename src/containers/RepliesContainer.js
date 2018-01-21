import React, { Component } from 'react';
import { bool, string, number, shape, objectOf, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Replies } from 'components';
import { staleReplies } from 'helpers/utils';
import * as repliesActionCreators from 'ducks/replies';

class RepliesContainer extends Component {
  static propTypes = {
    replies: objectOf(shape({
      avatar: string.isRequired,
      name: string.isRequired,
      reply: string.isRequired,
      replyId: string.isRequired,
      timestamp: number.isRequired,
      uid: string.isRequired
    }).isRequired),
    isFetching: bool.isRequired,
    error: string.isRequired,
    lastUpdated: number,
    duckId: string.isRequired,
    fetchAndHandleReplies: func.isRequired
  };

  static defaultProps = {
    lastUpdated: 0,
    replies: {}
  };

  state = {
    toProfile: false,
    redirectToUid: ''
  }

  componentDidMount() {
    const { lastUpdated, duckId, fetchAndHandleReplies } = this.props;
    if (staleReplies(lastUpdated)) {
      fetchAndHandleReplies(duckId);
    }
  }

  goToProfile = (e, uid) => {
    e.stopPropagation();
    this.setState({ toProfile: true, redirectToUid: uid });
  };

  render() {
    const { isFetching, error, lastUpdated, replies } = this.props;
    const { toProfile, redirectToUid } = this.state;
    if (toProfile) return <Redirect push to={{ pathname: `/${redirectToUid}` }} />;
    return (
      <Replies
        goToProfile={this.goToProfile}
        isFetching={isFetching}
        error={error}
        lastUpdated={lastUpdated}
        replies={replies}
      />
    );
  }
}

function mapStateToProps(state, { duckId }) {
  const duckRepliesInfo = state.replies[duckId] || {};
  const { lastUpdated, replies } = duckRepliesInfo;
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...repliesActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesContainer);
