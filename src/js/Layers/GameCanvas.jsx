import React from 'react';

import PureCanvas from './PureCanvas';
import { PLAYER_DIMENSIONS, PLAYER_STARTING } from '../helpers/constants';

class GameCanvas extends React.Component {
  saveContext = ctx => {
    this.ctx = ctx;
  };
  componentDidMount() {
    this.updatePlayer();
  }

  componentDidUpdate(prevProps){
    if (prevProps.playerPosition !== this.props.playerPosition) {
      this.updatePlayer();
    }
  }

  updatePlayer() {
    const { playerPosition } = this.props;

    const player = new Path2D();
    player.rect(PLAYER_STARTING.horizontal, playerPosition, PLAYER_DIMENSIONS.width, PLAYER_DIMENSIONS.height);

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = '#2980B9';
    this.ctx.fill(player);
    this.ctx.restore();
  }

  render() {
    return <PureCanvas contextRef={this.saveContext} id={'game-canvas'}/>;
  }
}

export default GameCanvas;