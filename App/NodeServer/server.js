'use strict';

var http = require('http');
var fs = require('fs');
var Router = require('./router');
var router = new Router();

var Statistics = require('./statistics');

var activityData = [
    {
        Id: 1,
        Name: 'Jurassic Park',
        Date: '2014-01-01',
        Duration: 120,
        ActivityType: 'Movie',
        WatchedInCinema: false
    },
    {
        Id: 2,
        Name: 'Jurassic Park II',
        Date: '2014-01-02',
        Duration: 130,
        ActivityType: 'Movie',
        WatchedInCinema: true
    }];

router.httpGet('/', function(request, response) {
    var indexPage = fs.readFileSync('../Web/index.html');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(indexPage);
});

router.httpGet('/activities', function(request, response) {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(activityData));
});

router.httpGet('/activities/{id}', function(request, response, params) {
    var activity = activityData.filter(function(element) {
        return element.Id.toString() === params.id;
    })[0];

    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(activity));
});

router.httpDelete('/activities/{id}', function(request, response, params) {
    var activity = activityData.filter(function(element) {
        return element.Id.toString() === params.id;
    })[0];

    var indexOfActivity = activityData.indexOf(activity);
    activityData.splice(indexOfActivity, 1);

    response.writeHead(200, {"Content-Type": "application/json"});
    response.end();
});

router.httpGet('/activities/statistics', function(request, response) {
    var statistics = new Statistics(activityData);

    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(statistics));
});

router.httpGet('/bundle.js', function(request, response) {
    var bundleJs = fs.readFileSync('../Web/bundle.js');
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    response.end(bundleJs);
});

router.httpGet('/vendor/bootstrap.css', function(request, response){
    var bootstrap = fs.readFileSync('../Web/node_modules/bootstrap/dist/css/bootstrap.css');
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.end(bootstrap);
});

router.httpGet('/vendor/bootstrap.css.map', function(request, response){
    var bootstrapMap = fs.readFileSync('../Web/node_modules/bootstrap/dist/css/bootstrap.css.map');
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.end(bootstrapMap);
});

http.createServer(function(request, response) {
    router.route(request, response);
}).listen(8888);

console.log('Starting localhost:8888');