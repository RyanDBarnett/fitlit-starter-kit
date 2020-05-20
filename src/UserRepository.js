class UserRepository {
  constructor(usersData) {
    this.users = usersData.map(userData => new User(userData));
  }

  getAverageOfProperty(property) {
    return this.users.reduce((sum, element) => sum += element[property], 0) / this.users.length;
  }

  filterByProperty(property, targetValue) {
    const filteredUsers = this.users.filter(user => user[property] === targetValue);
    return filteredUsers.length > 1 ? new UserRepository(filteredUsers) : filteredUsers[0];
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}