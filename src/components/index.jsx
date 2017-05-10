const React = require('react');
const { StoreConnector } = require('hadron-react-components');
const KillopComponent = require('./killop');
const Store = require('../stores');
const Actions = require('../actions');

// const debug = require('debug')('mongodb-compass:killop:index');

class ConnectedKillopComponent extends React.Component {
  /**
   * Connect KillopComponent to store and render.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    // debug("I'm on render!", this.props)
    // "this.props" has the store properties that get passed down to the components
    return (
      <StoreConnector store={Store}>
        <KillopComponent actions={Actions} {...this.props} />
      </StoreConnector>
    );
  }
}

ConnectedKillopComponent.displayName = 'ConnectedKillopComponent';

module.exports = ConnectedKillopComponent;
