import React from 'react';

import '../css/App.css';
import GameCanvas from './Layers/GameCanvas';
import BackgroundCanvas from './Layers/BackgroundCanvas';
import {
  MAX_FALL_SPEED,
  MAX_THRUST, MAX_VELOCITY,
  PLAYER_STARTING,
  SPACEBAR_KEYCODE,
  VELOCITY,
} from './helpers/constants';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: PLAYER_STARTING.vertical,
      jumping: false,
      velocity: 0,
      thrust: 0,
    };

    this.jumpBruh = this.jumpBruh.bind(this);
    this.fallBruh = this.fallBruh.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.jumpBruh);
    document.addEventListener("keyup", this.fallBruh);
    this.animationFrame = requestAnimationFrame(this.updatePlayer);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.jumpBruh);
    document.removeEventListener("keyup", this.fallBruh);
    cancelAnimationFrame(this.animationFrame);
  }

  jumpBruh = (keyEvent) => {
    if (keyEvent.keyCode === SPACEBAR_KEYCODE) {
      this.setState({
        jumping: true,
      });
    }
  };

  fallBruh = (keyEvent) => {
    if (keyEvent.keyCode === SPACEBAR_KEYCODE) {
      this.setState({
        jumping: false,
      });
    }
  };

  updatePlayer() {
    this.setState(this.calculateNewPosition());
    this.animationFrame = requestAnimationFrame(this.updatePlayer);
  }

  calculateNewPosition() {
    let thrust = this.state.thrust;
    let velocity = this.state.velocity;
    let position = this.state.position;

    if (this.state.jumping) {
      thrust = (this.state.thrust + 0.25) > MAX_THRUST ? MAX_THRUST : this.state.thrust + 0.25;
      velocity = this.state.velocity - (VELOCITY + thrust);
      if (velocity < -(MAX_VELOCITY)) {
        velocity = -MAX_VELOCITY
      }
      position = this.state.position + (velocity);
    } else {
      thrust = 0;
      velocity = this.state.velocity + VELOCITY;
      if (velocity > MAX_FALL_SPEED) {
        velocity = MAX_FALL_SPEED;
      }
      position = this.state.position + velocity;
    }

    if (position <= 0) {
      return {position: 0, velocity: 0, thrust};
    }

    if (position >= PLAYER_STARTING.vertical) {
      return { position: PLAYER_STARTING.vertical, velocity: 0, thrust };
    }

    return { position, velocity, thrust };
  }

  getPlayerPosition() {
    return this.state.position;
  };

  render() {
    return (
      <React.Fragment>
        <BackgroundCanvas />
        <GameCanvas playerPosition={this.getPlayerPosition()} />
      </React.Fragment>
    );
  };
}

export default Game;
