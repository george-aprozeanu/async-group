import * as asg from "./index";
import * as http from "http";

let $q = new asg.AsyncGroup(3);

function NodePromise(nodeFn: Function) {
  return function (...args: any[]) {
    return new Promise<any>((resolve, reject) => {
      args.push(function (err, data) {
        if (err) { console.error(err); reject(err) } else { resolve(data) }
      })
      try { nodeFn.apply(this, args) } catch (e) { console.error(e); reject(e) }
    })
  }
}

function NodeStreamPromise(nodeFn: Function) {
  return function (...args: any[]) {
    return new Promise<any>((resolve, reject) => {
      let buffer = new Buffer(0);
      args.push(function (stream: any) {
        stream.on('data', (data: Buffer) => {
          let nbuffer = new Buffer(buffer.length + data.length);
          buffer.copy(nbuffer);
          data.copy(nbuffer, buffer.length);
          buffer = nbuffer;
        })
        stream.on('error', error => {
          console.error(error);
          reject(error);
        })
        stream.on('end', () => {
          setTimeout(() => resolve(buffer), 1000);
        })
      })
      try { nodeFn.apply(this, args) } catch (e) { console.error(e); reject(e) }
    })
  }
}

function log(msg): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log(msg);
    resolve();
  })
}

log("request")
  .then(() => $q.run(() => NodeStreamPromise(http.get)({ hostname: 'example.com' })))
  .then(data => console.log(data.toString('utf-8').length));
log("request")
  .then(() => $q.run(() => NodeStreamPromise(http.get)({ hostname: 'example.com' })))
  .then(data => console.log(data.toString('utf-8').length));
log("request")
  .then(() => $q.run(() => NodeStreamPromise(http.get)({ hostname: 'example.com' })))
  .then(data => console.log(data.toString('utf-8').length));
log("request")
  .then(() => $q.run(() => NodeStreamPromise(http.get)({ hostname: 'example.com' })))
  .then(data => console.log(data.toString('utf-8').length));
log("request")
  .then(() => $q.run(() => NodeStreamPromise(http.get)({ hostname: 'example.com' })))
  .then(data => console.log(data.toString('utf-8').length));
log("request")
  .then(() => $q.run(() => NodeStreamPromise(http.get)({ hostname: 'example.com' })))
  .then(data => console.log(data.toString('utf-8').length));
log("request")
  .then(() => $q.run(() => NodeStreamPromise(http.get)({ hostname: 'example.com' })))
  .then(data => console.log(data.toString('utf-8').length));
log("request")
  .then(() => $q.run(() => NodeStreamPromise(http.get)({ hostname: 'example.com' })))
  .then(data => console.log(data.toString('utf-8').length));
log("request")
  .then(() => $q.run(() => NodeStreamPromise(http.get)({ hostname: 'example.com' })))
  .then(data => console.log(data.toString('utf-8').length));
