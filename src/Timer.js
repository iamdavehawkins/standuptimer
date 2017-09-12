import React from 'react';

const timerStyle = {
  outlineWidth: 0
}

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // make sure number is zero padded
      minutes: this.pad(props.minutes, 2),
      seconds: this.pad(props.seconds, 2)
    };
  }

  pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  tick() {
    if (this.state.seconds === '00') {
      this.setState({seconds: 59, minutes: this.pad(this.state.minutes - 1, 2) });
    } else {
      this.setState({seconds: this.pad(this.state.seconds - 1, 2) });
    }
  }

  startTimer(e) {
    if (e.keyCode === 32) {
      console.log('you pressed space keycode');
      setInterval(this.tick.bind(this), 1000);
    }
  }

  render() {
    return (
      <div style={ timerStyle } tabIndex="0" onKeyDown={ this.startTimer.bind(this) }>
        { this.state.minutes }:{ this.state.seconds }
      </div>
    );
  }
}

export default Timer;
