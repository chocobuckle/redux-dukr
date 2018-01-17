import React, { Component } from 'react';
import { string, object, number, func, oneOfType } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { store } from 'index';
import { checkIfAuthed } from './auth';

export default (BaseComponent) => {
  class RouteProtection extends Component {
    static propTypes = {
      location: oneOfType([
        string.isRequired,
        object.isRequired
      ]),
      history: oneOfType([
        number.isRequired,
        string.isRequired,
        func.isRequired,
        object.isRequired
      ]).isRequired
    };

    componentWillMount() {
      this.checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }

    checkAuthentication = (props) => {
      const { history } = props;
      const nextPathName = history.location.pathname;
      const isAuthed = checkIfAuthed(store);
      if (nextPathName === '/' || nextPathName === '/auth') {
        if (isAuthed === true) {
          history.replace({ pathname: '/feed' });
        }
      } else if (isAuthed !== true) {
        history.replace({ pathname: '/auth' });
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return withRouter(RouteProtection);
};
