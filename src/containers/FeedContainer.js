import React, { Component } from 'react';
import { array, bool, string, func } from 'prop-types';
import { connect } from 'react-redux';
import { Feed } from 'components';
import { bindActionCreators } from 'redux';
import * as feedActionCreators from 'ducks/feed';

class FeedContainer extends Component {
  static propTypes = {
    duckIds: array.isRequired,
    newDucksAvailable: bool.isRequired,
    error: string.isRequired,
    isFetching: bool.isRequired,
    setAndHandleFeedListener: func.isRequired,
    resetNewDucksAvailable: func.isRequired
  };

  componentDidMount() {
    this.props.setAndHandleFeedListener();
  }

  render() {
    return (
      <Feed
        duckIds={this.props.duckIds}
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
      />
    );
  }
}

function mapStateToProps({ feed }) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed;
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...feedActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
