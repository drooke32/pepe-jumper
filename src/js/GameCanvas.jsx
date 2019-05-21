import React from 'react';

import PureCanvas from './PureCanvas';

class GameCanvas extends React.Component {
  saveContext = ctx => {
    this._ctx = ctx;
  };
  componentDidMount() {
    this.updatePlayer();
  }

  componentDidUpdate(prevProps){
    this.updatePlayer();
  }

  updatePlayer() {
    this._ctx.fillStyle = '#2980B9';
    this._ctx.fill(this.props.player);
  }

  render() {
    return <PureCanvas contextRef={this.saveContext} />;
  }
}

export default GameCanvas;