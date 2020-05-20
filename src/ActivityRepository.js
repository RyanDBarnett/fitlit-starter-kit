class ActivityRepository {
  constructor(activityData) {
    this.activities = activityData.map(activity => new Activity(activity));
  }

  getAverageOfProperty(property) {
    return this.activities.reduce((sum, element) => sum += element[property], 0) / this.activities.length;
  }

  filterByProperty(property, targetValue) {
    return new ActivityRepository(this.activities.filter(activity => activity[property] === targetValue));
  }

  getDateRange(endDate, numDays) {
    const endDateIndex = this.activities.findIndex(activity => activity.date === endDate);
    const range = this.activities.slice(endDateIndex - numDays, endDateIndex);
    return range.length > 1 ? new ActivityRepository(range) : range[0];
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}