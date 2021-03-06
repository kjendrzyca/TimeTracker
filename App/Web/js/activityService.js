'use strict';

var request = require('superagent');

function _handleErrors(response) {
    if(response.badRequest) {
        alert(response.text);
        return;
    }
    else if(response.serverError) {
        alert("Server error");
    }
}

var ActivityService =  {
    postActivity: function(newActivity, callbackFunction) {
        request
        .post('/activities')
        .set('Content-Type', 'application/json')
        .send({
                name: newActivity.name,
                date: newActivity.date,
                duration: parseInt(newActivity.duration),
                activityType: newActivity.activityType,
                watchedInCinema: newActivity.watchedInCinema
            })
        .end(function(response) {
            if (response.ok) {
                var newActivityId = response.text;
                callbackFunction(newActivityId);
            }
            else {
                _handleErrors(response);
            }
        });
    },

    getAllActivities: function(callbackFunction) {
        request
            .get('/activities')
            .accept('application/json')
            .end(function(response) {
                if(response.ok){
                    callbackFunction(response);
                }
                else{
                    _handleErrors(response);
                }
            });
    },

    getActivity: function(activityId, callbackFunction) {
        request
            .get('/activities/' + activityId.toString())
            .accept('application/json')
            .end(function(response) {
                if(response.ok){
                    callbackFunction(response.body);
                }
                else{
                    _handleErrors(response);
                }
            });
    },

    updateActivity: function(updatedProperties) {
        request
            .put('/activities/updateActivity/' + updatedProperties.activityId.toString())
            .set('Content-Type', 'application/json')
            .send(updatedProperties)
            .end(function(response) {
                _handleErrors(response);
        });
    },

    deleteActivity: function(activityId, callbackFunction) {
        request
            .del('/activities/' + activityId)
            .end(function(response) {
                _handleErrors(response);
                callbackFunction(activityId);
        });
    },

    getStatistics: function(callbackFunction) {
        request
            .get('/activities/statistics')
            .accept('application/json')
            .end(function(response) {
                if(response.ok){
                    callbackFunction(response);
                }
                else{
                    _handleErrors(response);
                }
            });
    }

};

module.exports = ActivityService;