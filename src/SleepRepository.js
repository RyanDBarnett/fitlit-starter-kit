class SleepRepository extends Repository {
  constructor(sleepData) {
    super();
    this.sleeps = sleepData.map(sleep => new Sleep(sleep));
  }
}