'use strict';

var Reflux = require('reflux');
var KillopActions = require('../actions');
var StateMixin = require('reflux-state-mixin');
var debug = require('debug')('mongodb-compass:stores:killop');

var _require = require('hadron-react-components'),
    SortableTable = _require.SortableTable,
    Tooltip = _require.Tooltip;

/**
 * Killop store.
 */


var KillopStore = Reflux.createStore({
  /**
   * adds a state to the store, similar to React.Component's state
   * @see https://github.com/yonatanmn/Super-Simple-Flux#reflux-state-mixin
   *
   * If you call `this.setState({...})` this will cause the store to trigger
   * and push down its state as props to connected components.
   */
  mixins: [StateMixin.store],

  /**
   * listen to all actions defined in ../actions/index.jsx
   */
  listenables: KillopActions,

  /**
   * Initialize everything that is not part of the store's state.
   */
  init: function init() {
    // FIXME: timer would go here (setTimeout() / setInterval())
  },


  /**
   * This method is called when all plugins are activated. You can register
   * listeners to other plugins' stores here, e.g.
   *
   * appRegistry.getStore('OtherPlugin.Store').listen(this.otherStoreChanged.bind(this));
   *
   * If this plugin does not depend on other stores, you can delete the method.
   *
   * @param {Object} appRegistry   app registry containing all stores and components
   */
  onActivated: function onActivated(appRegistry) {},


  /**
   * This method is called when the data service is finished connecting. You
   * receive either an error or the connected data service object, and if the
   * connection was successful you can now make calls to the database, e.g.
   *
   * dataService.command('admin', {connectionStatus: 1}, this.handleStatus.bind(this));
   *
   * If this plugin does not need to talk to the database, you can delete this
   * method.
   *
   * @param {Object} error         the error object if connection was unsuccessful
   * @param {Object} dataService   the dataService object if connection was successful
   *
   */
  onConnected: function onConnected(error, dataService) {
    if (error) {
      return;
    }
    // before running the command, set status to "fetching"
    // this.setState({ status: 'fetching' });
    dataService.command('admin', { currentOp: 1 }, this.handleCurrentOp.bind(this));
  },
  onRefreshClicked: function onRefreshClicked(error, dataService) {
    if (error) {
      return;
    }
    // before running the command, set status to "fetching"
    // this.setState({ status: 'fetching' });
    dataService.command('admin', { currentOp: 1 }, this.handleCurrentOp.bind(this));
  },
  handleCurrentOp: function handleCurrentOp(err, res) {
    // This is where I get the output of currentOp (in res)!!
    debug('some text!', err, res);

    // FIXME: this will need a timer
    this.setState({ currentOps: [{ opid: 123, desc: 'Dummy op' }] });
  },


  /**
   * Initialize the Killop store state. The returned object must
   * contain all keys that you might want to modify with this.setState().
   *
   * @return {Object} initial store state.
   */
  getInitialState: function getInitialState() {
    return {
      // Status of operations (e.g.: fetching, ...)
      status: 'initial',

      // Initial state of my data
      currentOps: []
    };
  },


  /**
   * log changes to the store as debug messages.
   * @param  {Object} prevState   previous state.
   */
  storeDidUpdate: function storeDidUpdate(prevState) {
    debug('Killop store changed from', prevState, 'to', this.state);
  }
});

module.exports = KillopStore;