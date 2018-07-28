import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Icon } from 'semantic-ui-react';
import { stringify } from 'qs';
import presets from '../../presets.json';

class Scenes extends Component {
  render() {
    return (
      <Container>
        <h1>Preset scenes</h1>
        <Card.Group>
          {presets.map((p, index) => {
            const params = stringify(
              Object.assign({}, { shader: p.shader, ...p.uniforms })
            );
            return (
              <Link key={index} to={`/?${params}`}>
                <Card>
                  <Icon
                    name="image"
                    size="massive"
                    style={{ margin: '0 auto' }}
                  />
                  <Card.Content>
                    <Card.Header>{p.name}</Card.Header>
                    <Card.Description>Example preset</Card.Description>
                  </Card.Content>
                </Card>
              </Link>
            );
          })}
        </Card.Group>
      </Container>
    );
  }
}

export default Scenes;
