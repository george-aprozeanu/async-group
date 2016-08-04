class AsyncTask<T> {
  outerPromise: Promise<T>;
  outerResolve: (t: T | PromiseLike<T>) => void;
  outerReject: (e: any) => void;
  constructor(private promiseFn: () => PromiseLike<T>) {
    this.outerPromise = new Promise<T>((resolve, reject) => {
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
    let pass = _ => _;
    task.outerPromise.then(pass, pass)
      .then(_ => { this.active--; this.next(); });
    this.queue.push(task);
    this.next();
    return task.outerPromise;
  }
  next() {
    if (this.queue.length && this.active < this.maxConcurrent) {
      let task = this.queue.shift();
      this.active++;
      task.start;
    }
  }
}