import React from 'react';
import SetTimerButton from './SetTimerButton.js';

const timerStyle = {
  outlineWidth: 0
}

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // make sure number is zero padded
      initialMinutes: this.pad(props.minutes, 0, 2),
      initialSeconds: this.pad(props.seconds, 0, 2),
      minutes: this.pad(props.minutes, 0, 2),
      seconds: this.pad(props.seconds, 0, 2),
      expired: false
    };

    this.incrementSeconds = this.incrementSeconds.bind(this);
    this.incrementTenSeconds = this.incrementTenSeconds.bind(this);
    this.decrementSeconds = this.decrementSeconds.bind(this);
    this.decrementTenSeconds = this.decrementTenSeconds.bind(this);
  }

  pad(num, delta, size) {
    var s = (parseFloat(num) + delta) + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  stopAndReset() {
    clearInterval(this.state.intervalId);
    this.setState({
      // minutes: this.pad(parseFloat(this.state.initialMinutes), 2),
      // seconds: this.pad(parseFloat(this.state.initialSeconds), 2),
      expired: false
    })
  }

  incrementSeconds(e) {
    this.stopAndReset();
    if ( this.state.initialSeconds !== '59' ) {
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds, 1, 2),
        seconds: this.pad(this.state.seconds, 1, 2)
      })
    } else {
      this.setState({
        initialSeconds: '00',
        seconds: '00',
        initialMinutes: this.pad(this.state.initialMinutes, 1, 2),
        minutes: this.pad(this.state.minutes, 1, 2)
      })
    }
  }

  incrementTenSeconds(e) {
    this.stopAndReset();
    if ( this.state.initialSeconds[0] !== '5' ) {
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds, 10, 2),
        seconds: this.pad(this.state.seconds, 10, 2)
      })
    } else {
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds % 50, 0, 2),
        seconds: this.pad(this.state.seconds % 50, 0, 2),
        initialMinutes: this.pad(this.state.initialMinutes, 1, 2),
        minutes: this.pad(this.state.minutes, 1, 2)
      })
    }
  }

  decrementSeconds(e) {
    this.stopAndReset();
    if ( this.state.initialSeconds !== '00' ) {
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds, -1, 2),
        seconds: this.pad(this.state.seconds, -1, 2)
      })
    } else {
      this.setState({
        initialSeconds: '59',
        seconds: '59',
        initialMinutes: this.pad(this.state.initialMinutes, -1, 2),
        minutes: this.pad(this.state.minutes, -1, 2)
      })
    }
  }

  decrementTenSeconds(e) {
    this.stopAndReset();
    if ( this.state.initialSeconds[0] !== '0' ) {
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds, -10, 2),
        seconds: this.pad(this.state.seconds, -10, 2)
      })
    } else {
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds, 50, 2),
        seconds: this.pad(this.state.seconds, 50, 2),
        initialMinutes: this.pad(this.state.initialMinutes, -1, 2),
        minutes: this.pad(this.state.minutes, -1, 2)
      })
    }
  }

  tick() {
    // cross over a minute when not expired
    if (this.state.seconds === '00' && this.state.expired === false && this.state.minutes !== '00') {
      this.setState({
        seconds: this.pad(59, 0, 2),
        minutes: this.pad(this.state.minutes, -1, 2)
      });
    // cross over the expiration time 00:00
    } else if (this.state.seconds === '00' && this.state.minutes === '00') {
      this.setState({
        expired: true,
        seconds: this.pad('01', 0, 2),
        minutes: this.pad('00', 0, 2)
      })
    // cross over a minute when expired
    } else if (this.state.expired && this.state.seconds === '59') {
      this.setState({
        seconds: '00',
        minutes: this.pad(this.state.minutes, 1, 2)
      })
    // increment one second on the expired timer
    } else if (this.state.expired) {
      this.setState({
        seconds: this.pad(this.state.seconds, 1, 2)
      })
    // decrement one second
    } else {
      this.setState({
        seconds: this.pad(this.state.seconds, -1, 2)
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
        <SetTimerButton handler={ this.incrementSeconds.bind(this) }> + </SetTimerButton>
        <SetTimerButton handler={ this.decrementSeconds }> - </SetTimerButton>
        <SetTimerButton handler={ this.incrementTenSeconds }> +10 </SetTimerButton>
        <SetTimerButton handler={ this.decrementTenSeconds }> -10 </SetTimerButton>
      </div>
    );
  }
}

export default Timer;
