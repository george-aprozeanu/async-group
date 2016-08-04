# async-group

## Description

Allows the execution of asynchronous tasks in a throttled manner.
This is useful when executing promises which could have unwanted external effects,
such as HTTP requests.

## Usage

```
// The requests will be executed atmost 3 in parallel.
$q = new AsyncGroup(3)
$q.run(() => http.get("http://example.com")
$q.run(() => http.get("http://example.com")
$q.run(() => http.get("http://example.com")
$q.run(() => http.get("http://example.com")
$q.run(() => http.get("http://example.com")
```
