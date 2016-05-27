import React from 'react';

import Pipe from './Pipe/Pipe.jsx';

export default class Pipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pipes: [],
    };
    this.pipes = [];
    this.index = 0;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.animationPlayState !== nextProps.animationPlayState) {
      return true;
    }
    if (this.state.pipes.length !== nextState.pipes.length) {
      return true;
    }
    if (this.state.pipes[0] && nextState.pipes[0]
      && this.state.pipes[0].refName !== nextState.pipes[0].refName) {
      return true;
    }

    return false;
  }

  getPipesCount() {
    return this.pipes.length;
  }

  getNextPipeUpper() {
    return this.refs[this.pipes[0].refName].getPipeUpper();
  }

  initialPipesCount() {
    this.pipes = [];
    this.setState({ pipes: [] });
  }

  slicePipes() {
    this.pipes.splice(0, 1);
  }

  updatePipes(newPipeProp) {
    // Filter refNames, return an array whose left > -100
    const pipes = this.state.pipes.filter(
      (pipe) => this.refs[pipe.refName].getPositionLeft() > -100);

    const obj = Object.assign(newPipeProp, { refName: `pipe${this.index++}` });
    this.setState({ pipes: pipes.concat(obj) });

    this.pipes.push(obj);
  }

  render() {
    const animationPlayState = this.props.animationPlayState;
    return (<div>
      {
        this.state.pipes.map((pipe) => (
          <Pipe
            ref={pipe.refName}
            key={pipe.refName}
            topHeight={pipe.topHeight}
            bottomHeight={pipe.bottomHeight}
            animationPlayState={animationPlayState}
          />)
        )
      }
    </div>);
  }
}

Pipes.propTypes = {
  animationPlayState: React.PropTypes.string,
};
