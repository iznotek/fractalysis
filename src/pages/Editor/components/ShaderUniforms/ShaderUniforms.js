import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Shaders } from 'gl-react';
import parse from '../../../../utils/query-parser';
import { getUniformDefaultValues } from '../../utils/uniforms';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class ShaderUniforms extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  renderLoading() {
    return <h1>Loading...</h1>;
  }

  render() {
    const query = parse(this.props.location.search.substring(1));
    const { shader, shaderId, download, ...rest } = query;
    // If shaderID is not present yet, shader might still be compiling
    // or if page was refreshed, ID is there but it anyway might not be compiled yet
    const shaderExists = Shaders.getShortName({ id: shaderId }) !== '???';
    if (!shaderId || !shaderExists) {
      return this.renderLoading();
    }

    // Use the values from the URL or pull the defaults from storage
    let uniformValues = Object.assign({}, rest);
    if (Object.keys(uniformValues).length === 0) {
      uniformValues = getUniformDefaultValues(shader);
    }
    // If there are no uniform values, we're still loading
    if (Object.keys(uniformValues).length === 0) {
      return this.renderLoading();
    }
    // Append some constants to the uniforms
    uniformValues = Object.assign({}, uniformValues, {
      size: [WIDTH, HEIGHT],
      outputSize: [WIDTH, HEIGHT]
    });

    // Pass the props to children and render
    const { children } = this.props;
    const childProps = {
      width: WIDTH,
      height: HEIGHT,
      shaderId,
      uniforms: uniformValues
    };
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, childProps)
    );
    return <div>{childrenWithProps}</div>;
  }
}

export default withRouter(ShaderUniforms);