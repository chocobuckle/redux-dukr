import React, { Component } from 'react';
import { func } from 'prop-types';
import { ReplyForm } from 'components';

class ReplyFormContainer extends Component {
  static propTypes = {
    submit: func.isRequired
  };

  state = {
    text: ''
  };

  handleOnChange = (e) => {
    const text = e.target.value;
    this.setState({
      text
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    if (text.length === 0) return;
    this.props.submit(text);
    this.setState({
      text: ''
    });
  };

  render() {
    return (
      <ReplyForm
        handleOnChange={this.handleOnChange}
        handleSubmit={this.handleSubmit}
        text={this.state.text}
      />
    );
  }
}

export default ReplyFormContainer;
