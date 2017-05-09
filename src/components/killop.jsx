const React = require('react');
const PropTypes = require('prop-types');
const KillopActions = require('../actions');
const ToggleButton = require('./toggle-button');

// const debug = require('debug')('mongodb-compass:killop');

class KillopComponent extends React.Component {

  onClick() {
    KillopActions.toggleStatus();
  }

  /**
   * Render Killop component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="killop">
        <h2 className="killop-title">KillopComponent</h2>
        <p><i>Kill all the ops!</i></p>
        <p>The current status is: <code>{this.props.status}</code></p>
        <ToggleButton onClick={this.onClick} />
      </div>
    );
  }
}

KillopComponent.propTypes = {
  status: PropTypes.oneOf(['enabled', 'disabled'])
};

KillopComponent.defaultProps = {
  status: 'enabled'
};

KillopComponent.displayName = 'KillopComponent';

module.exports = KillopComponent;
