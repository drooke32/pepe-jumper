import React from 'react';

class PureCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas
        width={1200}
        height={600}
        ref={node => node ? this.props.contextRef(node.getContext('2d')) : null}
      />
    );
  }
}

export default PureCanvas;