'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var KillopActions = require('../actions');
var ToggleButton = require('./toggle-button');

// const debug = require('debug')('mongodb-compass:killop');

var KillopComponent = function (_React$Component) {
  _inherits(KillopComponent, _React$Component);

  function KillopComponent() {
    _classCallCheck(this, KillopComponent);

    return _possibleConstructorReturn(this, (KillopComponent.__proto__ || Object.getPrototypeOf(KillopComponent)).apply(this, arguments));
  }

  _createClass(KillopComponent, [{
    key: 'onClick',
    value: function onClick() {
      KillopActions.toggleStatus();
    }

    /**
     * Render Killop component.
     *
     * @returns {React.Component} The rendered component.
     */

  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'killop' },
        React.createElement(
          'h2',
          { className: 'killop-title' },
          'KillopComponent'
        ),
        React.createElement(
          'p',
          null,
          React.createElement(
            'i',
            null,
            'Kill all the ops!'
          )
        ),
        React.createElement(
          'p',
          null,
          'The current status is: ',
          React.createElement(
            'code',
            null,
            this.props.status
          )
        ),
        React.createElement(ToggleButton, { onClick: this.onClick })
      );
    }
  }]);

  return KillopComponent;
}(React.Component);

KillopComponent.propTypes = {
  status: PropTypes.oneOf(['enabled', 'disabled'])
};

KillopComponent.defaultProps = {
  status: 'enabled'
};

KillopComponent.displayName = 'KillopComponent';

module.exports = KillopComponent;