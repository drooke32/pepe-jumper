import React from 'react';

import '../css/App.css';
import GameCanvas from './GameCanvas';
import { PlayerDimensions, PlayerStarting } from './helpers/constants';

function Game() {
  const getPlayer = () => {
    const player = new Path2D();
    player.rect(
      PlayerStarting.horizontal,
      PlayerStarting.vertical,
      PlayerDimensions.width,
      PlayerDimensions.height
    );
    return player;
  };

  return (
    <GameCanvas player={getPlayer()}/>
  );
}

export default Game;
