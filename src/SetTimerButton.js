import React from 'react';

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  borderRadius: '50%',
  border: 'none',
  height: '5vw',
  width: '5vw',
  fontSize: '5vw',
  padding: '0px',
  outlineWidth: 0,
  backgroundColor: 'rgb(60, 7, 117)',
  color: '#FFF',
  borderWidth: '1px',
  borderColor: '#FFF'
}

const textStyle = {
  display: 'relative',
  transform: 'TranslateY(-1vw)'
}

export class SetTimerButton extends React.Component {

  render () {
    return (
      <button style={ buttonStyle } onClick={ this.props.handler }>
        <text style={ textStyle }>{ this.props.children }</text>
      </button>
    );
  }
}

export default SetTimerButton;
