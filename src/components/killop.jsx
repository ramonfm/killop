const React = require('react');
const PropTypes = require('prop-types');
const KillopActions = require('../actions');
// const ToggleButton = require('./toggle-button');

// const debug = require('debug')('mongodb-compass:killop');

const { SortableTable, Tooltip } = require('hadron-react-components');

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
    debug("I'm rendering killop: ", this.props)
    const opstring = JSON.stringify(this.props.currentOps)

//     const rows = _.map(this.props.currentOps, (op) => {
//       const opid = op['opid'];
//       const desc = op['desc'];
//       return _.assign({}, op, {
//         'Operation ID': {opid},
//         'Description': {desc}
//       });
//     });

    // debug("rows: ", JSON.stringify(rows))

	// const columns = ['opid', 'desc']
	if (this.props.currentOps.length === 0) {
		return null
    }

	const columns = Object.keys(this.props.currentOps[0])

    return (
            <SortableTable
              theme="light"
              columns={columns}
              rows={this.props.currentOps}
              valueIndex={0}
            />
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
