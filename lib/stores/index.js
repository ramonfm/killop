'use strict';

var Reflux = require('reflux');
var KillopActions = require('../actions');
var StateMixin = require('reflux-state-mixin');
var debug = require('debug')('mongodb-compass:stores:killop');
var moment = require('moment');

// const _ = require('lodash')

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
  killOp: function killOp(opid) {
    global.hadronApp.dataService.command('admin', { killOp: 1, op: opid }, this.handleKillOp.bind(this));
  },
  refreshOps: function refreshOps() {
    var err = null;
    this.onRefreshClicked(err, global.hadronApp.dataService);
  },
  handleKillOp: function handleKillOp(err, res) {
    this.onRefreshClicked(err, global.hadronApp.dataService);
  },
  handleCurrentOp: function handleCurrentOp(err, res) {
    // This is where I get the output of currentOp (in res)!!
    debug('myhandler input:', res);

    // FIXME: this will need a timer

    var output = [];
    var res_len = res.inprog.length;
    for (var i = 0; i < res_len; i++) {

      if (Object.keys(res.inprog[i].query).length === 0) {
        // If the query is empty this is a system operation
        var query = res.inprog[i].desc;
        var system = true;
      } else {
        var query = JSON.stringify(res.inprog[i].query);
        var system = false;
      }
      debug('myhandler output', query);

      // get the time running if it has it
      var timeOutput = "";
      if (res.inprog[i].microsecs_running != null) {
        var d = moment.duration(res.inprog[i].microsecs_running / 1000);
        timeOutput = Math.floor(d.asHours()) + moment.utc(res.inprog[i].microsecs_running / 1000).format(":mm:ss");
      }

      output.push({
        system: system,
        opid: res.inprog[i].opid,
        time: timeOutput,
        info: query
      });
      debug('myhandler output:', output);
    }
    debug('myhandler output final:', output);
    this.setState({ currentOps: output });
  },


  /*
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