class HydrationRepository extends Repository {
  constructor(hydrationData) {
    super();
    this.hydrations = hydrationData.map(hydration => new Hydration(hydration));
  }
}