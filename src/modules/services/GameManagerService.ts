export class GameManagerService {
  public test: string = "hello world";
  constructor() {}
  public getTest(): string {
    return this.test;
  }
  public setTest(test: string): void {
    this.test = test;
  }
}
