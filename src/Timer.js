import React from 'react';
import SetTimerButton from './SetTimerButton.js';
import { CSSTransitionGroup } from 'react-transition-group'

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // make sure number is zero padded
      initialMinutes: this.pad(props.minutes, 0, 2),
      initialSeconds: this.pad(props.seconds, 0, 2),
      minutes: this.pad(props.minutes, 0, 2),
      seconds: this.pad(props.seconds, 0, 2),
      expired: false,
      status: 2,
      pulse: false
    };

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
      expired: false,
      status: 2
    })
  }

  startCoffeeBreak = (e) => {
    this.stopAndReset();
    this.setState({
      minutes: '10',
      seconds: '00',
      status: 3
    })
    this.startTick();
  }

  incrementMinutes = (e) => {
    this.stopAndReset();
    this.setState({
      initialMinutes: this.pad(this.state.initialMinutes, 1, 2),
      minutes: this.pad(this.state.initialMinutes, 1, 2)
    })
  }

  decrementMinutes = (e) => {
    this.stopAndReset();
    if ( this.state.initialMinutes !== '00' ) {
      this.setState({
        initialMinutes: this.pad(this.state.initialMinutes, -1, 2),
        minutes: this.pad(this.state.initialMinutes, -1, 2)
      })
    }
  }

  incrementSeconds = (e) => {
    this.stopAndReset();
    if ( this.state.initialSeconds !== '59' ) {
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds, 1, 2),
        seconds: this.pad(this.state.initialSeconds, 1, 2),
        minutes: this.state.initialMinutes
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

  incrementTenSeconds = (e) => {
    this.stopAndReset();
    if ( this.state.initialSeconds[0] !== '5' ) {
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds, 10, 2),
        seconds: this.pad(this.state.initialSeconds, 10, 2),
        minutes: this.state.initialMinutes
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

  decrementSeconds = (e) => {
    this.stopAndReset();
    if ( this.state.initialSeconds === '00' && this.state.initialMinutes === '00' ) {
      return
    } else if ( this.state.initialSeconds !== '00' ) {
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds, -1, 2),
        seconds: this.pad(this.state.initialSeconds, -1, 2),
        minutes: this.state.initialMinutes
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

  decrementTenSeconds = (e) => {
    this.stopAndReset();
    if ( this.state.initialSeconds[0] === '0' && this.state.initialMinutes === '00' ) {
      return
    } else if ( this.state.initialSeconds[0] !== '0' ) {
      // decrement ten seconds
      this.setState({
        initialSeconds: this.pad(this.state.initialSeconds, -10, 2),
        seconds: this.pad(this.state.initialSeconds, -10, 2),
        minutes: this.state.initialMinutes
      })
    } else {
      // decrement ten seconds over a minute boundary
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

    // set status based on tick
    if ( this.state.expired && parseFloat(this.state.seconds) % 2 ) {
      this.setState({
        status: -1
      })
    } else if ( (parseFloat(this.state.seconds) <= 5 && this.state.minutes === '00') ||
                (this.state.expired) ) {
      this.setState({
        status: 0
      })
    } else if ( parseFloat(this.state.seconds) <= 15 && this.state.minutes === '00' && this.state.status === 2) {
      this.setState({
        status: 1
      })
    }
  }

  startTick(e) {
    // start the tick
    var intervalId = setInterval(this.tick.bind(this), 1000);
    // set the new intervalId
    this.setState({ intervalId: intervalId });
  }

  startTimer(e) {
    e.preventDefault();
    if (e.keyCode === 32) {
      // stop the previous tick
      clearInterval(this.state.intervalId);
      // un-expire, reset the timer, and place flash
      this.setState({
        expired: false,
        status: 2,
        minutes: this.state.initialMinutes,
        seconds: this.state.initialSeconds,
        pulse: true
      });

      // quick delay before removing white flash
      window.setTimeout(() => {
        this.setState({
          pulse: false
        });
      }, 100);
      this.startTick();
    }
  }

  getStyle() {
    return Object.assign({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      outlineWidth: 0,
      height: '100%'
    })
  }

  render() {
    return (
        <div
          className={(() => {
            switch (this.state.status) {
              case 2:  return "greenClass";
              case 1:  return "yellowClass";
              case 3:  return "brownClass";
              case -1: return "invertedRedClass";
              default: return "redClass";
            }
          })()}
          style={ this.getStyle() }
          tabIndex="0"
          onKeyDown={ this.startTimer.bind(this) }
          >
            <CSSTransitionGroup
              id="pulseBox"
              transitionName="pulse"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              { this.state.pulse === true ? (
                <div id="pulse"></div>
              ) : (
                <div></div>
              )}
            </CSSTransitionGroup>
            <div 
              id="timerValues"
            >
              {this.state.expired ? '-' : ''}{ this.state.minutes }:{ this.state.seconds }
            </div>
            <div id="timeAdjusterButtons"
              className={this.state.expired === true ? 'shiftedButtons' : null}
              >
              <div id="minuteButtons">
                <div className="adjusterPair">
                  <SetTimerButton handler={ this.decrementMinutes }> - </SetTimerButton>
                  <SetTimerButton handler={ this.incrementMinutes }> + </SetTimerButton>
                </div>
              </div>
              <div id="secondButtons">
                <div className="adjusterPair">
                  <SetTimerButton handler={ this.decrementTenSeconds }> - </SetTimerButton>
                  <SetTimerButton handler={ this.incrementTenSeconds }> + </SetTimerButton>
                </div>
                <div className="adjusterPair">
                  <SetTimerButton handler={ this.decrementSeconds }> - </SetTimerButton>
                  <SetTimerButton handler={ this.incrementSeconds }> + </SetTimerButton>
                </div>
              </div>
            </div>
            <div id="miscButtons">
              <SetTimerButton handler={ this.startCoffeeBreak }> &#x2615; </SetTimerButton>
            </div>
          </div>
    );
  }
}

export default Timer;
