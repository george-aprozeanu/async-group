# async-group

Allows the execution of asynchronous tasks in a throttled manner.
This is useful when executing promises which could have unwanted external effects,
such as HTTP requests.

## Usage

```
// The requests will be executed atmost 3 in parallel.
$q = new AsyncGroup(3)
$q.run(() => http.get("http://example.com"))
$q.run(() => http.get("http://example.com"))
$q.run(() => http.get("http://example.com"))
$q.run(() => http.get("http://example.com"))
$q.run(() => http.get("http://example.com"))
```

## Description
`class AsyncGroup` creates a new group of async executions. The group is built with a maximum on `maxConcurrent` async executions.
```
var maxConcurrent = 10 // this is the default
$q = new AsyncGroup(maxConcurrent)
```
`AsyncGroup.run(promiseFn)` adds a promise to the async group. This promise will be started
(by calling promiseFn) when a free slot is available. `promiseFn` must return a promise.

The *return* value is a `Promise` which will complete when the original promise will complete.
```
var myPromiseFn = function() {
  return http.get("http://example.com")
}
var myDelayedPromise = $q.run(myPromiseFn)
myDelayedPromise.then(function() {
  console.log('its done!')
})
```
