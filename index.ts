class AsyncTask<T> {
  outerPromise: Promise<T>;
  outerResolve: (t: T | PromiseLike<T>) => void;
  outerReject: (e: any) => void;
  constructor(private promiseFn: () => PromiseLike<T>) {
    this.outerResolve = (a) => undefined;
    this.outerReject = (e) => undefined;
    this.outerPromise = new Promise<T>((resolve:(a:any) => any, reject:(e:Error) => any) => {
      this.outerResolve = resolve;
      this.outerReject = reject;
    });
  }
  start() {
    this.promiseFn().then(this.outerResolve, this.outerReject);
  }
}

export class AsyncGroup {
  private queue = new Array<AsyncTask<any>>();
  private active = 0;
  constructor(private maxConcurrent: number = 10) {
  }
  run<T>(promiseFn: () => PromiseLike<T>) {
    let task = new AsyncTask(promiseFn);
    let pass = (_:any) => _;
    task.outerPromise.then(pass, pass)
      .then(_ => { this.active--; this.next(); });
    this.queue.push(task);
    this.next();
    return task.outerPromise;
  }
  private next() {
    if (this.active < this.maxConcurrent) {
      let task = this.queue.shift();
      if (task) {
          this.active++;
          task.start();
      }
    }
  }
}