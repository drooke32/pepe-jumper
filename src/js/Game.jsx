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
      time: 0,
      start: Date.now(),
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
    const { position, velocity, thrust } = movePlayer(this.state);
    const time = Math.floor((Date.now() - this.state.start) / 1000); //Magic number :D
    this.setState({ position, velocity, thrust, time });
    this.animationFrame = requestAnimationFrame(this.updatePlayer);
  }

  getPlayerPosition() {
    return this.state.position;
  };

  render() {
    return (
      <React.Fragment>
        <BackgroundCanvas scrollMod={1}/>
        <GameCanvas playerPosition={this.getPlayerPosition()} />
      </React.Fragment>
    );
  };
}

export default Game;
