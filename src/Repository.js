class Repository {
  getAverageOfProperty(property) {
    const key = Object.keys(this)[0];
    return this[key].reduce((sum, element) => sum += element[property], 0) / this[key].length;
  }

  findByProperty(property, targetValue) {
    const key = Object.keys(this)[0];
    return this[key].find(element => element[property] === targetValue);
  }

  filterByProperty(property, targetValue) {
    const key = Object.keys(this)[0];
    const filteredElements = this[key].filter(element => element[property] === targetValue);
    return filteredElements.length > 1 ? new this.constructor(filteredElements) : filteredElements[0];
  }

  getDateRange(endDate, numDays) {
    const key = Object.keys(this)[0];
    const endDateIndex = this[key].findIndex(element => element.date === endDate);
    const range = this[key].slice(endDateIndex - numDays, endDateIndex);
    return range.length > 1 ? new this.constructor(range) : range[0];
  }
}