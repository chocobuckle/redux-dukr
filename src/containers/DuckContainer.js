import React, { Component } from 'react';
import { shape, string, number, bool } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Duck } from 'components';
import * as usersLikesActionCreators from 'ducks/usersLikes';

class DuckContainer extends Component {
  static propTypes = {
    duck: shape({
      avatar: string.isRequired,
      duckId: string.isRequired,
      name: string.isRequired,
      text: string.isRequired,
      timestamp: number.isRequired,
      uid: string.isRequired
    }).isRequired,
    match: shape({
      isExact: bool.isRequired,
      params: shape({
        duckId: string
      }),
      path: string.isRequired,
      url: string.isRequired
    }).isRequired,
    hideReplyBtn: bool,
    hideLikeCount: bool,
    toProfile: bool,
    toDuckDetail: bool
  };

  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true,
    toProfile: false,
    toDuckDetail: false
  };

  state = {
    toProfile: false,
    toDuckDetail: false
  }

  goToProfile = (e) => {
    e.stopPropagation();
    if (this.props.match.path !== '/:uid') {
      this.setState({ toProfile: true });
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ toDuckDetail: true });
  };

  render() {
    const { toProfile, toDuckDetail } = this.state;
    const { duck, hideReplyBtn } = this.props;
    if (toProfile) return <Redirect push to={{ pathname: `/${duck.uid}` }} />;
    if (toDuckDetail) return <Redirect push to={{ pathname: `/duckDetail/${duck.duckId}` }} />;
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={hideReplyBtn === true ? null : this.handleClick}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(
  { ducks, likeCount, usersLikes },
  { duckId, hideLikeCount, hideReplyBtn }
) {
  return {
    hideLikeCount,
    hideReplyBtn,
    duck: ducks[duckId],
    isLiked: usersLikes[duckId] === true,
    numberOfLikes: likeCount[duckId]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...usersLikesActionCreators
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DuckContainer));
