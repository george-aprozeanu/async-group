"use strict";
var AsyncTask = (function () {
    function AsyncTask(promiseFn) {
        var _this = this;
        this.promiseFn = promiseFn;
        this.outerPromise = new Promise(function (resolve, reject) {
            _this.outerResolve = resolve;
            _this.outerReject = reject;
        });
    }
    AsyncTask.prototype.start = function () {
        this.promiseFn().then(this.outerResolve, this.outerReject);
    };
    return AsyncTask;
}());
var AsyncGroup = (function () {
    function AsyncGroup(maxConcurrent) {
        if (maxConcurrent === void 0) { maxConcurrent = 10; }
        this.maxConcurrent = maxConcurrent;
        this.queue = new Array();
        this.active = 0;
    }
    AsyncGroup.prototype.run = function (promiseFn) {
        var _this = this;
        var task = new AsyncTask(promiseFn);
        var pass = function (_) { return _; };
        task.outerPromise.then(pass, pass)
            .then(function (_) { _this.active--; _this.next(); });
        this.queue.push(task);
        this.next();
        return task.outerPromise;
    };
    AsyncGroup.prototype.next = function () {
        if (this.queue.length && this.active < this.maxConcurrent) {
            var task = this.queue.shift();
            this.active++;
            task.start();
        }
    };
    return AsyncGroup;
}());
exports.AsyncGroup = AsyncGroup;
