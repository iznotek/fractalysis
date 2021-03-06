import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import ShaderComposer from './components/ShaderComposer/ShaderComposer';
import RandomizeUniforms from './components/RandomizeUniforms/RandomizeUniforms';
import DownloadButton from './components/DownloadButton/DownloadButton';
import SaveButton from './components/SaveButton/SaveButton.tsx';

class EditorNavbar extends Component {
  render() {
    const dividerStyle = {
      borderLeft: '1px solid #DDD',
      borderRight: '1px solid #DDD',
      borderRadius: 0
    };
    return (
      <Menu secondary>
        <Menu.Item>
          <ShaderComposer />
        </Menu.Item>
        <Menu.Item disabled>
          <Icon name="zoom" />
          Zoom
        </Menu.Item>
        <Menu.Item disabled>
          <Icon name="refresh" />
          Rotate
        </Menu.Item>
        <Menu.Item disabled>
          <Icon name="expand" />
          Scale
        </Menu.Item>
        <Menu.Item style={dividerStyle}>
          <RandomizeUniforms />
        </Menu.Item>
        <Menu.Item>
          <SaveButton />
          <DownloadButton />
        </Menu.Item>
      </Menu>
    );
  }
}

export default EditorNavbar;
