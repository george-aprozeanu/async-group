export declare class AsyncGroup {
    private maxConcurrent;
    private queue;
    private active;
    constructor(maxConcurrent?: number);
    run<T>(promiseFn: () => PromiseLike<T>): Promise<T>;
    private next();
}
