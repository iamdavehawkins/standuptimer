import React from 'react';
import SetTimerButton from './SetTimerButton.js';
import { CSSTransitionGroup } from 'react-transition-group'
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSeconds: 60,
      seconds: 60,
      expired: false,
      status: 2,
      pulse: false,
      countUpTimer: 1,
      running: false
    };

  }

  stopAndReset() {
    clearInterval(this.state.intervalId);
    this.setState({
      expired: false,
      status: 2
    })
  }

  startCoffeeBreak = (e) => {
    this.stopAndReset();
    this.setState({
      seconds: 600,
      status: 3
    })
    this.startTick();
  }

  alterSeconds(delta) {
    this.stopAndReset();
    this.setState({
      initialSeconds: this.state.seconds + delta,
      seconds: this.state.seconds + delta
    });
  }

  tick() {
    // decrement countdown timer
    this.setState({
      seconds: this.state.seconds - 1
    });

    if ( this.state.seconds < 0 ) {
      this.setState({
        expired: true
      })
    } else if ( this.state.seconds > 0 ) {
      this.setState({
        expired: false
      })
    }

    // set status (background color) based on tick
    if ( this.state.seconds < 0 && Math.abs(this.state.seconds) % 2 ) {
      this.setState({
        status: -1
      })
    } else if ( (this.state.seconds) <= 5 || (this.state.seconds < 0) ) {
      this.setState({
        status: 0
      })
    } else if ( this.state.seconds <= 15 && this.state.status === 2) {
      this.setState({
        status: 1
      })
    }

    // increment overall timer
    this.setState({countUpTimer: this.state.countUpTimer + 1});
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
        seconds: this.state.initialSeconds,
        pulse: true,
        running: true
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
              { moment.duration(this.state.seconds, "seconds").format("mm:ss", {trim: false}) }
            </div>
            <div id="timeAdjusterButtons"
              className={this.state.expired === true ? 'shiftedButtons' : null}
              >
              <div id="minuteButtons">
                <div className="adjusterPair">
                  <SetTimerButton onClick={() => this.alterSeconds(-60)}> - </SetTimerButton>
                  <SetTimerButton handler={() => this.alterSeconds(60)}> + </SetTimerButton>
                </div>
              </div>
              <div id="secondButtons">
                <div className="adjusterPair">
                  <SetTimerButton handler={() => this.alterSeconds(-10)}> - </SetTimerButton>
                  <SetTimerButton handler={() => this.alterSeconds(10)}> + </SetTimerButton>
                </div>
                <div className="adjusterPair">
                  <SetTimerButton handler={() => this.alterSeconds(-1)}> - </SetTimerButton>
                  <SetTimerButton handler={() => this.alterSeconds(1)}> + </SetTimerButton>
                </div>
              </div>
            </div>
            <div id="countUpTimer">
              { this.state.running ? "Total time: " + moment.duration(this.state.countUpTimer, "seconds").format() : "Press SPACE to begin"}
            </div>
            <div id="miscButtons">
              <SetTimerButton handler={ this.startCoffeeBreak }> <span role="img">&#x2615;</span> </SetTimerButton>
            </div>
          </div>
    );
  }
}

export default Timer;
