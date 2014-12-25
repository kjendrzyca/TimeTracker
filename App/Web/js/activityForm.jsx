'use strict';

var React = require('react');

var ActivityForm = React.createClass(
    {
        getInitialState: function () {
            return {
                Name: '',
                Date: '',
                Duration: 0,
                ActivityType: '',
                WatchedInCinema: false
            };
        },

        handleBasicInputChange: function (event) {
            var newStateValue = {};
            newStateValue[event.target.name] = event.target.value;

            this.setState(newStateValue, console.log(this.state));
        },

        handleCheckBoxInputChange: function () {
            this.setState({ WatchedInCinema: !this.state.WatchedInCinema }, console.log(this.state));
        },

        render: function () {
            return (
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3">
                        <form className="activity-form" role="form">
                            <div className="form-group">
                                <label htmlFor="activity-name">Name:</label>
                                <input type="text" name="Name" className="form-control" id="activity-name" onChange={ this.handleBasicInputChange } />
                            </div>
                            <div className="form-group">
                                <label htmlFor="activity-date">Date:</label>
                                <input type="date" name="Date" className="form-control" id="activity-date" onChange={ this.handleBasicInputChange }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="activity-duration">Duration:</label>
                                <input type="number" name="Duration" max-length="3" className="form-control" id="activity-duration" onChange={ this.handleBasicInputChange }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="activity-type">Activity type:</label>
                                <select name="ActivityType" className="form-control" id="activity-type" onChange={ this.handleBasicInputChange }>
                                    <option value="Movie">Movie</option>
                                    <option value="Movie">Series</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>
                                    Watched in cinema ? <input type="checkbox" name="WatchedInCinema" checked={ this.state.WatchedInCinema } onChange={ this.handleCheckBoxInputChange }/>
                                </label>
                            </div>
                            <input type="button" value="Add new" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            );
        }
    });

module.exports = ActivityForm;