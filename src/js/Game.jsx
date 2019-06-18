import React from 'react';

import '../css/App.css';
import GameCanvas from './Layers/GameCanvas';
import BackgroundCanvas from './Layers/BackgroundCanvas';
import {
  HORIZONTAL_BOUNDARIES, OBSTACLE_DIMENSIONS,
  PLAYER_STARTING, SCROLL_SPEED,
  SPACEBAR_KEYCODE, MAX_SCROLL_MODIFIER,
} from './helpers/constants';
import { movePlayer } from './helpers/playerMovement';
import { generate } from './helpers/obstacleGenerator';

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
      obstacles: [],
      scrollSpeedModifier: 1,
    };

    this.addObstacle = this.addObstacle.bind(this);
    this.fallBruh = this.fallBruh.bind(this);
    this.fasterBoi = this.fasterBoi.bind(this);
    this.jumpBruh = this.jumpBruh.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.jumpBruh);
    document.addEventListener("keyup", this.fallBruh);
    window.setInterval(this.addObstacle, 2500);
    window.setInterval(this.fasterBoi, 30000);
    this.animationFrame = requestAnimationFrame(this.updateGame);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.jumpBruh);
    document.removeEventListener("keyup", this.fallBruh);
    window.clearInterval(this.addObstacle);
    window.setInterval(this.fasterBoi, 30000);
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

  fasterBoi() {
    let scrollSpeedModifier = this.state.scrollSpeedModifier;
    if (scrollSpeedModifier < MAX_SCROLL_MODIFIER) {
      this.setState({ scrollSpeedModifier: this.state.scrollSpeedModifier + 1 });
    }
  }

  addObstacle() {
    const { obstacles } = this.state;
    obstacles.push({
      vertical: generate(),
      horizontal: HORIZONTAL_BOUNDARIES.right,
    });
    this.setState({obstacles});
  };

  updateGame() {
    const time = Math.floor((Date.now() - this.state.start) / 1000); //Magic number :D
    this.setState({ time });
    this.updatePlayer();
    this.updateObstacles();
    this.animationFrame = requestAnimationFrame(this.updateGame);
  }

  updateObstacles() {
    const { obstacles } = this.state;
    const updatedObstacles = [];
    obstacles.forEach((element) => {
      element.horizontal = element.horizontal - SCROLL_SPEED * this.state.scrollSpeedModifier;
      if (element.horizontal > -(OBSTACLE_DIMENSIONS.width)) {
        updatedObstacles.push(element);
      }
    });
    this.setState({ obstacles: updatedObstacles });
  }

  updatePlayer() {
    const { position, velocity, thrust } = movePlayer(this.state);
    this.setState({ position, velocity, thrust});
  }

  getPlayerPosition() {
    return this.state.position;
  };

  render() {
    return (
      <React.Fragment>
        <BackgroundCanvas scrollMod={this.state.scrollSpeedModifier}/>
        <GameCanvas playerPosition={this.getPlayerPosition()} obstacles={this.state.obstacles}/>
      </React.Fragment>
    );
  };
}

export default Game;
