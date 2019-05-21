import React from 'react';

import '../css/App.css';
import GameCanvas from './Layers/GameCanvas';
import BackgroundCanvas from './Layers/BackgroundCanvas';
import {
  PLAYER_STARTING,
  SPACEBAR_KEYCODE,
} from './helpers/constants';
import { movePlayer } from './helpers/playerMovement';

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
    return movePlayer(this.state);
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
