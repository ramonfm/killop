const KillopComponent = require('./lib/components');
const KillopActions = require('./lib/actions');
const KillopStore = require('./lib/stores');

/**
 * A sample role for the component.
 */
const ROLE = {
  name: 'Killop',
  component: KillopComponent
};

/**
 * Activate all the components in the Killop package.
 */
function activate() {
  // Register the KillopComponent as a role in Compass
  //
  // Available roles are:
  //   - Instance.Tab
  //   - Database.Tab
  //   - Collection.Tab
  //   - CollectionHUD.Item
  //   - Header.Item

  global.hadronApp.appRegistry.registerRole('', ROLE);
  global.hadronApp.appRegistry.registerAction('Killop.Actions', KillopActions);
  global.hadronApp.appRegistry.registerStore('Killop.Store', KillopStore);
}

/**
 * Deactivate all the components in the Killop package.
 */
function deactivate() {
  global.hadronApp.appRegistry.deregisterRole('', ROLE);
  global.hadronApp.appRegistry.deregisterAction('Killop.Actions');
  global.hadronApp.appRegistry.deregisterStore('Killop.Store');
}

module.exports = KillopComponent;
module.exports.activate = activate;
module.exports.deactivate = deactivate;
