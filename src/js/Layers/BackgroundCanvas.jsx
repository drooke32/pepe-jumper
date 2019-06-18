import React from 'react';

import PureCanvas from './PureCanvas';
import { SCROLL_SPEED } from '../helpers/constants';

class BackgroundCanvas extends React.Component {
  constructor(props) {
    super(props);

    const bgImage = new Image();
    bgImage.src = 'img/bg.png';
    const bricksImage = new Image();
    bricksImage.src = 'img/bricks.png';

    this.state = {
      position: 0,
      background: bgImage,
      bricks: bricksImage,
    };

    this.scrollBackground = this.scrollBackground.bind(this);
  }

  saveContext = ctx => {
    this.ctx = ctx;
  };
  componentDidMount() {
    this.animationFrame = requestAnimationFrame(this.scrollBackground);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrame);
  }

  scrollBackground() {
    let position = this.state.position - (SCROLL_SPEED * this.props.scrollMod);
    if (position <= -8192) {
      position = 0;
    }
    this.setState({position});
    this.drawBackground(position);

    this.animationFrame = requestAnimationFrame(this.scrollBackground);
  }

  drawBackground(position) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.drawImage(this.state.background, position, 0, 8192, this.ctx.canvas.height - 100);
    this.ctx.drawImage(this.state.background, position + 8192, 0, 8192, this.ctx.canvas.height - 100);
    this.ctx.drawImage(this.state.bricks, position, 500, 966, 100);
    this.ctx.drawImage(this.state.bricks, position + 966, 500, 966, 100);
    this.ctx.drawImage(this.state.bricks, position + (2 * 966), 500, 966, 100);
    this.ctx.drawImage(this.state.bricks, position + (3 * 966), 500, 966, 100);
    this.ctx.drawImage(this.state.bricks, position + (4 * 966), 500, 966, 100);
    this.ctx.drawImage(this.state.bricks, position + (5 * 966), 500, 966, 100);
    this.ctx.drawImage(this.state.bricks, position + (6 * 966), 500, 966, 100);
    this.ctx.drawImage(this.state.bricks, position + (7 * 966), 500, 966, 100);
    this.ctx.drawImage(this.state.bricks, position + (8 * 966), 500, 966, 100);
    this.ctx.drawImage(this.state.bricks, position + (9 * 966), 500, 966, 100);
  }

  render() {
    return <PureCanvas contextRef={this.saveContext} id={'bg-canvas'}/>;
  }
}

export default BackgroundCanvas;