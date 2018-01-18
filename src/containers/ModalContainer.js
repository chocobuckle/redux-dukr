import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'components';
import * as modalActionCreators from 'ducks/modal';
import * as ducksActionCreators from 'ducks/ducks';

function mapStateToProps({ users, modal }) {
  const { authedId } = users;
  const { duckText, isOpen } = modal;
  const duckTextLength = duckText.length;
  return {
    duckText,
    isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140,
    user: users[authedId] ? users[authedId].info : {}
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...modalActionCreators,
    ...ducksActionCreators
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
