class ActivityRepository extends Repository {
  constructor(activityData) {
    super();
    this.activities = activityData.map(activity => new Activity(activity));
  }
}