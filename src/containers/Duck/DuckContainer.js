import React, { Component } from 'react';
import { shape, string, number, bool, object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
    hideReplyBtn: bool.isRequired
  };

  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true
  };

  static contextTypes = {
    router: object.isRequired
  };

  goToProfile = (e) => {
    e.stopPropagation();
    this.context.router.push(`/${this.props.duck.uid}`);
  };

  handleClick = (e) => {
    e.preventDefault();
    this.context.router.push(`/duckDetail/${this.props.duck.duckId}`);
  };

  render() {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state, props) {
  const { ducks, likeCount, usersLikes } = state;
  const { duckId, hideLikeCount, hideReplyBtn } = props;
  return {
    duck: ducks[duckId],
    hideLikeCount,
    hideReplyBtn,
    isLiked: usersLikes[duckId] === true,
    numberOfLikes: likeCount[duckId]
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...usersLikesActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DuckContainer);
