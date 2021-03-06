'use strict';

var jsdom = require('jsdom').jsdom;
var assert = require('node-assertthat');
var sinon = require('sinon');

global.document = jsdom('<html><head></head><body></body></html>');
global.window = document.parentWindow;
global.navigator = window.navigator;

var React = require('react');
var TestUtils = require('react/addons').addons.TestUtils;

var ActivitiesBox = require('../js/activitiesBox.jsx');

describe('activities-box', function () {

	var requests = [];

	beforeEach(function() {
		global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
		global.XMLHttpRequest.onCreate = function (req) { requests.push(req); };
	});

	afterEach(function() {
		requests = [];
		global.XMLHttpRequest.restore();
	});

	it('should render correctly with table and activity form inside', function () {
		// given

		// when
		var rendered = TestUtils.renderIntoDocument(<ActivitiesBox />);
		
		// then
		var renderedActivities = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'activities-box');
		var renderedForm = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'activity-form');
		assert.that(renderedActivities.length, is.equalTo(1));
		assert.that(renderedForm.length, is.equalTo(1));
		assert.that(requests[0].url, is.equalTo('/activities'));
		assert.that(requests[0].method.toLowerCase(), is.equalTo('get'));
	});

	it('should get statistics data and render statistics component', function() {
		// given

		// when
		var renderedActivtiesBox = TestUtils.renderIntoDocument(<ActivitiesBox />);

		// then
		assert.that(requests[1].url, is.equalTo('/activities/statistics'));

		var renderedStatistics = TestUtils.findRenderedDOMComponentWithClass(renderedActivtiesBox, 'activities-statistics');
		assert.that(renderedStatistics, is.not.null());
	});
});