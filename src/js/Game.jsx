import React from 'react';

import '../css/App.css';
import GameCanvas from './Layers/GameCanvas';
import { PLAYER_STARTING, SPACEBAR_KEYCODE } from './helpers/constants';
import BackgroundCanvas from './Layers/BackgroundCanvas';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: PLAYER_STARTING.vertical,
      jumping: false,
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
    this.setState({ position: this.calculateNewPosition() });
    this.animationFrame = requestAnimationFrame(this.updatePlayer);
  }

  calculateNewPosition() {
    let newPosition = this.state.position + 10;
    if (this.state.jumping) {
      newPosition = this.state.position - 15;
    }

    if (newPosition <= 0) {
      return 0;
    }
    if (newPosition >= PLAYER_STARTING.vertical) {
      return PLAYER_STARTING.vertical;
    }
    return newPosition;
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
