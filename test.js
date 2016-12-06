"use strict";
var asg = require("./index");
var http = require("http");
function NodePromise(nodeFn) {
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            args.push(function (err, data) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
            try {
                nodeFn.apply(_this, args);
            }
            catch (e) {
                console.error(e);
                reject(e);
            }
        });
    };
}
function NodeStreamPromise(nodeFn) {
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var buffer = new Buffer(0);
            args.push(function (stream) {
                stream.on('data', function (data) {
                    var nbuffer = new Buffer(buffer.length + data.length);
                    buffer.copy(nbuffer);
                    data.copy(nbuffer, buffer.length);
                    buffer = nbuffer;
                });
                stream.on('error', function (error) {
                    console.error(error);
                    reject(error);
                });
                stream.on('end', function () {
                    setTimeout(function () { return resolve(buffer); }, 1000);
                });
            });
            try {
                nodeFn.apply(_this, args);
            }
            catch (e) {
                console.error(e);
                reject(e);
            }
        });
    };
}
function log(msg) {
    return new Promise(function (resolve, reject) {
        console.log(msg);
        resolve(msg);
    });
}
var $q = new asg.AsyncGroup(3);
log("request")
    .then(function () { return $q.run(function () { return NodeStreamPromise(http.get)({ hostname: 'example.com' }); }); })
    .then(function (data) { return console.log(data.toString('utf-8').length); });
log("request")
    .then(function () { return $q.run(function () { return NodeStreamPromise(http.get)({ hostname: 'example.com' }); }); })
    .then(function (data) { return console.log(data.toString('utf-8').length); });
log("request")
    .then(function () { return $q.run(function () { return NodeStreamPromise(http.get)({ hostname: 'example.com' }); }); })
    .then(function (data) { return console.log(data.toString('utf-8').length); });
log("request")
    .then(function () { return $q.run(function () { return NodeStreamPromise(http.get)({ hostname: 'example.com' }); }); })
    .then(function (data) { return console.log(data.toString('utf-8').length); });
log("request")
    .then(function () { return $q.run(function () { return NodeStreamPromise(http.get)({ hostname: 'example.com' }); }); })
    .then(function (data) { return console.log(data.toString('utf-8').length); });
log("request")
    .then(function () { return $q.run(function () { return NodeStreamPromise(http.get)({ hostname: 'example.com' }); }); })
    .then(function (data) { return console.log(data.toString('utf-8').length); });
log("request")
    .then(function () { return $q.run(function () { return NodeStreamPromise(http.get)({ hostname: 'example.com' }); }); })
    .then(function (data) { return console.log(data.toString('utf-8').length); });
log("request")
    .then(function () { return $q.run(function () { return NodeStreamPromise(http.get)({ hostname: 'example.com' }); }); })
    .then(function (data) { return console.log(data.toString('utf-8').length); });
log("request")
    .then(function () { return $q.run(function () { return NodeStreamPromise(http.get)({ hostname: 'example.com' }); }); })
    .then(function (data) { return console.log(data.toString('utf-8').length); });
//# sourceMappingURL=test.js.map