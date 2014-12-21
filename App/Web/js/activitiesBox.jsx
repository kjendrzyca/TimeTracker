'use strict';

var React = require('react');
var ActivitiesTable = require('./activitiesTable.jsx');

var ActivitiesBox = React.createClass({
    render: function () {
        return (
            <div className='activities-box' ref="ActivitiesBox">
                <ActivitiesTable data={ this.props.activitiesTableData } />
            </div>
        );
    }
});

module.exports = ActivitiesBox;