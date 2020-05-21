class HydrationRepository {
  constructor(hydrationData) {
    this.hydrations = hydrationData.map(hydration => new Hydration(hydration));
  }

  getAverageOfProperty(property) {
    return this.hydrations.reduce((sum, element) => sum += element[property], 0) / this.hydrations.length;
  }

  filterByProperty(property, targetValue) {
    return new HydrationRepository(this.hydrations.filter(hydration => {
        // console.log('value: ', hydration[property]);
        // console.log('targetValue', targetValue);
        return hydration[property] === targetValue
      }));
  }

  getDateRange(endDate, numDays) {
    const endDateIndex = this.hydrations.findIndex(hydration => hydration.date === endDate);
    console.log(endDateIndex)
    const range = this.hydrations.slice(endDateIndex - numDays, endDateIndex);
    return range.length > 1 ? new HydrationRepository(range) : range[0];
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationRepository;
}