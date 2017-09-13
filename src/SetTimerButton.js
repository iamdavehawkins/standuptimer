import React from 'react';

export class SetTimerButton extends React.Component {

  render () {
    return (
      <button onClick={ this.props.handler }> { this.props.children } </button>
    );
  }
}

export default SetTimerButton;
