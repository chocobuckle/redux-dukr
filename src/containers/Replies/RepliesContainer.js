import React, { Component } from 'react';
import { bool, string, number, object, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Replies } from 'components';
import { staleReplies } from 'helpers/utils';
import * as repliesActionCreators from 'ducks/replies';

class RepliesContainer extends Component {
  static propTypes = {
    isFetching: bool.isRequired,
    error: string.isRequired,
    lastUpdated: number.isRequired,
    replies: object,
    duckId: string.isRequired,
    fetchAndHandleReplies: func.isRequired
  };

  static defaultProps = {
    lastUpdated: 0,
    replies: {}
  };

  componentDidMount() {
    if (staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId);
    }
  }

  render() {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies}
      />
    );
  }
}

function mapStateToProps(state, props) {
  const duckRepliesInfo = state.replies[props.duckId] || {};
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
