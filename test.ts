import * as asg from "./index";
import * as http from "http";



function NodePromise(nodeFn: Function) {
  return function (...args: any[]) {
    return new Promise<any>((resolve:(a:any) => any, reject:(e:Error) => any) => {
      args.push(function (err:Error, data:any) {
        if (err) { console.error(err); reject(err) } else { resolve(data) }
      })
      try { nodeFn.apply(this, args) } catch (e) { console.error(e); reject(e) }
    })
  }
}

function NodeStreamPromise(nodeFn: Function) {
  return function (...args: any[]) {
    return new Promise<any>((resolve:(a:any) => any, reject:(e:Error) => any) => {
      let buffer = new Buffer(0);
      args.push(function (stream: any) {
        stream.on('data', (data: Buffer) => {
          let nbuffer = new Buffer(buffer.length + data.length);
          buffer.copy(nbuffer);
          data.copy(nbuffer, buffer.length);
          buffer = nbuffer;
        })
        stream.on('error', (error:Error) => {
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

function log(msg:any): Promise<any> {
  return new Promise((resolve:(a:any) => any, reject: (e:Error) => any) => {
    console.log(msg);
    resolve(msg);
  })
}

let $q = new asg.AsyncGroup(3);

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
