import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Icon, Menu, Message, List } from 'semantic-ui-react';
import PageSelector from './PageSelector';
import routes from '../../routes';
import './Navbar.css';

class Navbar extends Component {
  state = {
    visible: true
  };
  render() {
    return (
      <nav className="navbar">
        <Menu>
          <Menu.Item>
            <PageSelector />
          </Menu.Item>
          <Menu.Item>
            {
              routes.map((route, index) => (
                <Route key={index} exact={route.exact} path={route.path} component={route.navbar} />
              ))
            }
          </Menu.Item>
          <Menu.Item>
            <List>
              <List.Item>
                <small>Early development version</small><br />
                <small>2018-07-06</small>
              </List.Item>
              <List.Item>
                <span>
                  <Icon name="github" />
                  <a href="https://github.com/Hellenic/fractalysis">Github</a>
                </span>
              </List.Item>
            </List>
          </Menu.Item>
        </Menu>
        { this.state.visible && (
            <Message
              onDismiss={() => this.setState({ visible: false })}
              style={{ zIndex: 50 }}
              color="blue"
              header="Welcome to Fractalysis!"
              content={`
                Fractalysis is a fractal flame editor, which allows you to create fancy generated images.
                This is still early version and being developed, but you can still already play around with it.
                Read more on Github.
              `}
            />
          )
        }
      </nav>
    );
  }
}

export default Navbar;
