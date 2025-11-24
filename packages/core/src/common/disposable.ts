export class Disposable<T> {
  constructor(
    public readonly data: T,
    private readonly cb: (d: T) => Promise<void> | void,
  ) {}

  dispose(): Promise<void> | void {
    return this.cb(this.data)
  }

  async [Symbol.asyncDispose](): Promise<void> {
    return this.dispose()
  }
  [Symbol.dispose](): void {
    this.dispose()
  }
}
