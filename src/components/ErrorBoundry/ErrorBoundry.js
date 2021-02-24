import React, { Component } from 'react'
import ErrorIndicator from '../ErrorIndicator'

class ErrorBoundry extends Component {

  constructor() {
    super();

    this.state = {
      hasError: false
    }
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {

      return (
        <div>
          <ErrorIndicator />
        </div>
      )
    };

    return this.props.children;
  }
}

export default ErrorBoundry