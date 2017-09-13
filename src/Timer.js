import React from 'react';

const timerStyle = {
  outlineWidth: 0
}

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // make sure number is zero padded
      initialMinutes: this.pad(props.minutes, 2),
      initialSeconds: this.pad(props.seconds, 2),
      minutes: this.pad(props.minutes, 2),
      seconds: this.pad(props.seconds, 2),
      expired: false
    };
  }

  pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  tick() {
    // cross over a minute when not expired
    if (this.state.seconds === '00' && this.state.expired === false ) {
      this.setState({
        seconds: 59,
        minutes: this.pad(this.state.minutes - 1, 2)
      });
    // cross over the expiration time 00:00
    } else if (this.state.seconds === '00' && this.state.minutes === '00') {
      this.setState({
        seconds: this.pad(1, 2),
        minutes: '00',
        expired: true
      })
    // cross over a minute when expired
    } else if (this.state.expired && this.state.seconds === '59') {
      this.setState({
        seconds: '00',
        minutes: this.pad(parseFloat(this.state.minutes) + 1, 2)
      })
    // increment one second on the expired timer
    } else if (this.state.expired) {
      this.setState({
        seconds: this.pad(parseFloat(this.state.seconds) + 1, 2)
      })
    // decrement one second
    } else {
      this.setState({
        seconds: this.pad(this.state.seconds - 1, 2)
      });
    }
  }

  startTimer(e) {
    if (e.keyCode === 32) {
      // stop the previous tick
      clearInterval(this.state.intervalId);
      // un-expire and reset the timer
      this.setState({
        expired: false,
        minutes: this.state.initialMinutes,
        seconds: this.state.initialSeconds
      });
      // start the tick
      var intervalId = setInterval(this.tick.bind(this), 1000);
      // set the new intervalId
      this.setState({ intervalId: intervalId });
    }
  }

  render() {
    return (
      <div style={ timerStyle } tabIndex="0" onKeyDown={ this.startTimer.bind(this) }>
        {this.state.expired ? '-' : ''}{ this.state.minutes }:{ this.state.seconds }
      </div>
    );
  }
}

export default Timer;
