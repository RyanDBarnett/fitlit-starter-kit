class SleepRepository {
  constructor(sleepData) {
    this.sleeps = sleepData.map(sleep => new Sleep(sleep));
  }

  getAverageOfProperty(property) {
    return this.sleeps.reduce((sum, element) => sum += element[property], 0) / this.sleeps.length;
  }

  filterByProperty(property, targetValue) {
    return new SleepRepository(this.sleeps.filter(sleep => sleep[property] === targetValue));
  }

  getDateRange(endDate, numDays) {
    const endDateIndex = this.sleeps.findIndex(sleep => sleep.date === endDate);
    const range = this.sleeps.slice(endDateIndex - numDays, endDateIndex);
    return range.length > 1 ? new SleepRepository(range) : range[0];
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepRepository;
}