import React from 'react';

import PureCanvas from './PureCanvas';
import { OBSTACLE_DIMENSIONS, PLAYER_DIMENSIONS, PLAYER_STARTING } from '../helpers/constants';

class GameCanvas extends React.Component {
  saveContext = ctx => {
    this.ctx = ctx;
  };
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate(prevProps){
    this.updateCanvas();
  }

  updateCanvas() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.updatePlayer();
    this.updateObstacles();
    this.ctx.restore();
  }

  updateObstacles() {
    const { obstacles } = this.props;
    obstacles.forEach((obstaclePosition) => {
      const obstacle = new Path2D();
      obstacle.rect(obstaclePosition.horizontal, obstaclePosition.vertical, OBSTACLE_DIMENSIONS.width, OBSTACLE_DIMENSIONS.height);
      this.ctx.fillStyle = '#cc0000';
      this.ctx.fill(obstacle);
    });
  }

  updatePlayer() {
    const { playerPosition } = this.props;

    const player = new Path2D();
    player.rect(PLAYER_STARTING.horizontal, playerPosition, PLAYER_DIMENSIONS.width, PLAYER_DIMENSIONS.height);
    this.ctx.fillStyle = '#2980B9';
    this.ctx.fill(player);
  }

  render() {
    return <PureCanvas contextRef={this.saveContext} id={'game-canvas'}/>;
  }
}

export default GameCanvas;